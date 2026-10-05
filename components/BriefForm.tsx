"use client";

import { FormEvent, useMemo, useState } from "react";

const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const submitUrl = projectUrl ? `${projectUrl}/functions/v1/submit-brief` : "";

const steps = ["Negocio", "Reto", "Objetivo", "Contacto"];
const networks = ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube", "Otra"];

type FormDataState = {
  businessName: string; industry: string; productFocus: string; challenge: string; service: string;
  goal: string; budget: string; networks: string[]; name: string; email: string; phone: string;
  city: string; website: string; companyWebsite: string;
};

const initial: FormDataState = {
  businessName: "", industry: "", productFocus: "", challenge: "", service: "no-se", goal: "", budget: "",
  networks: [], name: "", email: "", phone: "", city: "", website: "", companyWebsite: "",
};

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return <label className="form-field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

export default function BriefForm() {
  const [form, setForm] = useState(initial);
  const [step, setStep] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const progress = useMemo(() => `${((step + 1) / steps.length) * 100}%`, [step]);

  function update<K extends keyof FormDataState>(key: K, value: FormDataState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  function toggleNetwork(value: string) {
    const key = value.toLowerCase();
    update("networks", form.networks.includes(key) ? form.networks.filter((x) => x !== key) : [...form.networks, key]);
  }
  function canContinue() {
    if (step === 0) return form.businessName.trim().length > 1 && form.industry.trim().length > 1;
    if (step === 1) return form.challenge.trim().length > 5;
    if (step === 2) return form.goal.trim().length > 5;
    return form.name.trim().length > 1 && Boolean(form.email.trim() || form.phone.trim());
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (step < steps.length - 1) {
      if (canContinue()) { setStep((s) => s + 1); setMessage(""); }
      else setMessage("Completa lo esencial de este paso para continuar.");
      return;
    }
    if (!canContinue()) { setMessage("Déjanos tu nombre y al menos un correo o teléfono."); return; }
    if (!submitUrl) { setState("error"); setMessage("La conexión del brief todavía no está configurada."); return; }
    setState("sending"); setMessage("");
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = { utm_source: params.get("utm_source") || "", utm_medium: params.get("utm_medium") || "", utm_campaign: params.get("utm_campaign") || "", utm_content: params.get("utm_content") || "", utm_term: params.get("utm_term") || "", referrer: document.referrer || "", page: window.location.href };
      const response = await fetch(submitUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, utm }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "No pudimos enviar el brief.");
      setState("success");
      setMessage("Recibimos tu información. El equipo de AIVAN la revisará antes de contactarte.");
      setForm(initial);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "No pudimos enviar el brief.");
    }
  }

  if (state === "success") {
    return (
      <div className="brief-success" role="status">
        <span className="success-mark">✓</span><p className="micro-label">BRIEF RECIBIDO</p>
        <h3>Ya tenemos el contexto.<br />Ahora toca pensar bien.</h3><p>{message}</p>
        <button type="button" className="button button-dark" onClick={() => { setState("idle"); setStep(0); setMessage(""); }}>Enviar otro brief</button>
      </div>
    );
  }

  return (
    <form className="brief-form" onSubmit={submit} noValidate>
      <div className="brief-progress" aria-label={`Paso ${step + 1} de ${steps.length}`}>
        <div className="brief-progress-top"><span>0{step + 1} / 0{steps.length}</span><strong>{steps[step]}</strong></div>
        <div className="brief-progress-bar"><span style={{ width: progress }} /></div>
      </div>

      <div className="brief-stage" key={step}>
        {step === 0 && <>
          <div className="brief-question"><p className="micro-label">EMPECEMOS POR LO REAL</p><h3>¿Qué negocio estamos intentando hacer crecer?</h3></div>
          <div className="form-grid two">
            <Field label="Nombre del negocio"><input value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Ej. Café del Puerto" autoComplete="organization" /></Field>
            <Field label="¿A qué se dedica?"><input value={form.industry} onChange={(e) => update("industry", e.target.value)} placeholder="Restaurante, hotel, turismo…" /></Field>
            <Field label="¿Qué quieres impulsar ahora?"><input value={form.productFocus} onChange={(e) => update("productFocus", e.target.value)} placeholder="Un servicio, producto, nueva etapa…" /></Field>
            <Field label="Web o red principal" hint="Opcional"><input value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="instagram.com/tu-negocio" inputMode="url" /></Field>
          </div>
        </>}

        {step === 1 && <>
          <div className="brief-question"><p className="micro-label">SIN ADIVINAR</p><h3>¿Qué está frenando a tu marca hoy?</h3></div>
          <Field label="Cuéntanos el reto principal"><textarea value={form.challenge} onChange={(e) => update("challenge", e.target.value)} placeholder="No sé qué publicar, mi marca no representa el negocio, necesito una estrategia…" rows={5} /></Field>
          <div className="form-grid two compact-grid">
            <Field label="Área que crees necesitar"><select value={form.service} onChange={(e) => update("service", e.target.value)}><option value="no-se">No estoy seguro todavía</option><option value="aibrand">AIBRAND — Branding & diseño</option><option value="aimark">AIMARK — Marketing creativo</option><option value="aiprod">AIPROD — Producción audiovisual</option><option value="aipacks">AIPACKS — Acompañamiento integral</option></select></Field>
            <Field label="Presupuesto / rango" hint="Opcional"><input value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="Ej. $300–$600 / por definir" /></Field>
          </div>
        </>}

        {step === 2 && <>
          <div className="brief-question"><p className="micro-label">LA META IMPORTA</p><h3>Si esto funciona, ¿qué debería cambiar?</h3></div>
          <Field label="¿Qué te gustaría lograr?"><textarea value={form.goal} onChange={(e) => update("goal", e.target.value)} placeholder="Quiero verme más profesional, vender mejor, ordenar mi comunicación, lanzar una nueva marca…" rows={5} /></Field>
          <div className="network-field"><span>Redes que usa tu negocio</span><div>{networks.map((network) => { const key = network.toLowerCase(); const active = form.networks.includes(key); return <button className={active ? "active" : ""} type="button" key={network} onClick={() => toggleNetwork(network)}>{network}{active ? " ✓" : ""}</button>; })}</div></div>
        </>}

        {step === 3 && <>
          <div className="brief-question"><p className="micro-label">ÚLTIMO PASO</p><h3>¿Con quién hablamos cuando terminemos de revisar?</h3></div>
          <div className="form-grid two">
            <Field label="Tu nombre"><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Nombre y apellido" autoComplete="name" /></Field>
            <Field label="Ciudad"><input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Puerto Ayora, Quito…" autoComplete="address-level2" /></Field>
            <Field label="Correo"><input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="tu@negocio.com" type="email" autoComplete="email" /></Field>
            <Field label="WhatsApp / teléfono"><input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+593 …" inputMode="tel" autoComplete="tel" /></Field>
          </div>
          <label className="hp-field" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.companyWebsite} onChange={(e) => update("companyWebsite", e.target.value)} /></label>
          <p className="privacy-note">Al enviar autorizas a AIVAN a usar estos datos únicamente para revisar tu solicitud y contactarte sobre este proyecto.</p>
        </>}
      </div>

      {message && <p className={`form-feedback${state === "error" ? " error" : ""}`} role="status">{message}</p>}
      <div className="brief-controls">
        <button type="button" className="button button-quiet" disabled={step === 0 || state === "sending"} onClick={() => { setStep((s) => Math.max(0, s - 1)); setMessage(""); }}>← Atrás</button>
        <button type="submit" className="button button-dark" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : step === steps.length - 1 ? "Enviar a AIVAN ↗" : "Continuar →"}</button>
      </div>
    </form>
  );
}
