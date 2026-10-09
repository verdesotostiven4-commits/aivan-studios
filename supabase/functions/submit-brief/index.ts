import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const defaultOrigins = new Set(["https://aivan-studios.vercel.app", "http://localhost:3000"]);

function isAllowedOrigin(origin: string | null) {
  if (!origin) return true;
  if (defaultOrigins.has(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app") && hostname.startsWith("aivan-studios");
  } catch {
    return false;
  }
}

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin");
  const allowOrigin = origin && isAllowedOrigin(origin) ? origin : "https://aivan-studios.vercel.app";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function cleanEmail(value: unknown) {
  const email = clean(value, 160).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}
function cleanPhone(value: unknown) {
  const raw = clean(value, 40);
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "";
  return raw.startsWith("+") ? `+${digits}` : digits;
}
function cleanNetworks(value: unknown) {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(["instagram","facebook","tiktok","linkedin","youtube","otra"]);
  return [...new Set(value.map((item) => clean(item, 30).toLowerCase()).filter((item) => allowed.has(item)))].slice(0, 6);
}
function cleanUtm(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const source = value as Record<string, unknown>;
  const keys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","referrer","page"];
  const out: Record<string,string> = {};
  for (const key of keys) {
    const field = clean(source[key], 220);
    if (field) out[key] = field;
  }
  return out;
}
function json(req: Request, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

Deno.serve(async (req: Request) => {
  if (!isAllowedOrigin(req.headers.get("origin"))) return json(req, { ok:false, message:"Origen no permitido." }, 403);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { ok:false, message:"Método no permitido." }, 405);

  const declaredLength = Number(req.headers.get("content-length") || 0);
  if (declaredLength > 25_000) return json(req, { ok:false, message:"Solicitud demasiado grande." }, 413);

  try {
    const body = await req.json();
    if (clean(body.companyWebsite, 120)) return json(req, { ok:true }, 200);
    if (body.privacyAccepted !== true) return json(req, { ok:false, message:"Confirma que leíste el aviso de privacidad." }, 400);

    const allowedServices = new Set(["aibrand","aimark","aiprod","aipacks","no-se"]);
    const service = clean(body.service, 20).toLowerCase();
    const data = {
      business_name: clean(body.businessName,120),
      industry: clean(body.industry,120) || null,
      product_focus: clean(body.productFocus,220) || null,
      goal: clean(body.goal,900) || null,
      challenge: clean(body.challenge,900) || null,
      service: allowedServices.has(service) ? service : "no-se",
      budget: clean(body.budget,80) || null,
      networks: cleanNetworks(body.networks),
      contact_name: clean(body.name,120),
      email: cleanEmail(body.email) || null,
      phone: cleanPhone(body.phone) || null,
      city: clean(body.city,120) || null,
      website: clean(body.website,220) || null,
      source: "website",
      status: "nuevo",
      privacy_consent_at: new Date().toISOString(),
      privacy_notice_version: "2026-10-09",
      utm: cleanUtm(body.utm),
    };

    if (data.business_name.length < 2 || !data.industry || data.industry.length < 2 || !data.challenge || data.challenge.length < 6 || !data.goal || data.goal.length < 6 || data.contact_name.length < 2 || (!data.email && !data.phone)) {
      return json(req, { ok:false, message:"Completa los datos esenciales del brief y deja un correo o teléfono válido." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth:{ persistSession:false, autoRefreshToken:false } },
    );

    const cutoff = new Date(Date.now() - 90_000).toISOString();
    if (data.email) {
      const { data: duplicate } = await supabase.from("leads").select("id").eq("email", data.email).gte("created_at", cutoff).limit(1);
      if (duplicate?.length) return json(req, { ok:true, duplicate:true }, 200);
    }
    if (data.phone) {
      const { data: duplicate } = await supabase.from("leads").select("id").eq("phone", data.phone).gte("created_at", cutoff).limit(1);
      if (duplicate?.length) return json(req, { ok:true, duplicate:true }, 200);
    }

    const { data: inserted, error } = await supabase.from("leads").insert(data).select("id").single();
    if (error) throw error;
    return json(req, { ok:true, id:inserted.id }, 201);
  } catch (error) {
    console.error("submit-brief error", error);
    return json(req, { ok:false, message:"No pudimos recibir tu información en este momento. Intenta nuevamente." }, 500);
  }
});
