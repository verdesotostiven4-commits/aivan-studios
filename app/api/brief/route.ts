import { NextRequest, NextResponse } from "next/server";

// The project's public Supabase endpoint is not a secret. Its Edge Function
// securely validates/sanitizes and stores the brief using server-side keys.
// This server route makes submission independent of browser-exposed env vars.
const DEFAULT_SUPABASE_URL = "https://nfwteklhqnkzlqnnhtem.supabase.co";
const ENDPOINT = `${(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(/\/$/, "")}/functions/v1/submit-brief`;
const LIMIT_BYTES = 25_000;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function reply(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  // Reject cross-site POSTs without blocking same-origin requests on the
  // primary domain or Vercel previews.
  if (origin) {
    let sameOrigin = false;
    try { sameOrigin = new URL(origin).host === request.nextUrl.host; } catch { /* invalid Origin */ }
    if (!sameOrigin) return reply("Solicitud no autorizada.", 403);
  }
  const length = Number(request.headers.get("content-length") || 0);
  if (length > LIMIT_BYTES) return reply("Solicitud demasiado grande.", 413);

  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > LIMIT_BYTES) return reply("Solicitud demasiado grande.", 413);
    const payload: unknown = JSON.parse(raw);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return reply("Revisa los datos del brief.", 400);
    // A separate, affirmative acknowledgement is required for new briefs.
    if ((payload as Record<string, unknown>).privacyAccepted !== true) {
      return reply("Confirma que leíste el aviso de privacidad para enviar tu solicitud.", 400);
    }

    const upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: raw,
      cache: "no-store",
      signal: AbortSignal.timeout(14_000),
    });

    const result: unknown = await upstream.json().catch(() => ({}));
    const data = result && typeof result === "object" ? result as Record<string, unknown> : {};
    if (!upstream.ok || data.ok !== true) {
      const message = typeof data.message === "string" ? data.message.slice(0, 220) : "No pudimos recibir el brief. Inténtalo nuevamente.";
      return reply(message, upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502);
    }
    return NextResponse.json({ ok: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof SyntaxError) return reply("Revisa los datos del brief.", 400);
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      return reply("El envío está tardando demasiado. Intenta otra vez en unos segundos.", 504);
    }
    console.error("AIVAN Brief: upstream connection failed", error instanceof Error ? error.name : "UnknownError");
    return reply("No pudimos conectar con el equipo de AIVAN. Intenta nuevamente.", 502);
  }
}
