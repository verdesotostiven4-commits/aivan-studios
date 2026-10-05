import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" };

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function cleanEmail(value: unknown) {
  const email = clean(value, 160).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}
function cleanNetworks(value: unknown) {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(["instagram","facebook","tiktok","linkedin","youtube","otra"]);
  return value.map((x) => clean(x, 30).toLowerCase()).filter((x) => allowed.has(x)).slice(0, 6);
}
function cleanUtm(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const source = value as Record<string, unknown>;
  const keys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","referrer","page"];
  const out: Record<string,string> = {};
  for (const key of keys) {
    const v = clean(source[key], 220);
    if (v) out[key] = v;
  }
  return out;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok:false, message:"Método no permitido." }), { status:405, headers:jsonHeaders });
  }

  try {
    const body = await req.json();
    if (clean(body.companyWebsite, 120)) {
      return new Response(JSON.stringify({ ok:true }), { status:200, headers:jsonHeaders });
    }

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
      phone: clean(body.phone,40) || null,
      city: clean(body.city,120) || null,
      website: clean(body.website,220) || null,
      source: "website",
      status: "nuevo",
      utm: cleanUtm(body.utm),
    };

    if (!data.business_name || !data.contact_name || (!data.email && !data.phone)) {
      return new Response(JSON.stringify({
        ok:false,
        message:"Completa el nombre del negocio, tu nombre y al menos correo o teléfono."
      }), { status:400, headers:jsonHeaders });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth:{ persistSession:false, autoRefreshToken:false } },
    );

    const cutoff = new Date(Date.now() - 90_000).toISOString();
    if (data.email) {
      const { data:duplicate } = await supabase.from("leads").select("id").eq("email",data.email).gte("created_at",cutoff).limit(1);
      if (duplicate?.length) return new Response(JSON.stringify({ok:true,duplicate:true}),{status:200,headers:jsonHeaders});
    }
    if (data.phone) {
      const { data:duplicate } = await supabase.from("leads").select("id").eq("phone",data.phone).gte("created_at",cutoff).limit(1);
      if (duplicate?.length) return new Response(JSON.stringify({ok:true,duplicate:true}),{status:200,headers:jsonHeaders});
    }

    const { data:inserted,error } = await supabase.from("leads").insert(data).select("id").single();
    if (error) throw error;

    return new Response(JSON.stringify({ok:true,id:inserted.id}),{status:201,headers:jsonHeaders});
  } catch (error) {
    console.error("submit-brief error",error);
    return new Response(JSON.stringify({
      ok:false,
      message:"No pudimos recibir tu información en este momento. Intenta nuevamente."
    }),{status:500,headers:jsonHeaders});
  }
});
