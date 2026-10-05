"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import Wordmark from "./Wordmark";

type Lead = {
  id: string; business_name: string; industry: string | null; product_focus: string | null; goal: string | null;
  challenge: string | null; service: string; budget: string | null; networks: string[]; contact_name: string;
  email: string | null; phone: string | null; city: string | null; website: string | null; status: string;
  last_contacted_at: string | null; created_at: string; updated_at: string;
};
type Note = { id: string; lead_id: string; body: string; author_email: string | null; created_at: string };

const statuses = ["nuevo", "revision", "contactado", "reunion", "propuesta", "cliente", "cerrado", "descartado"];
const statusLabels: Record<string,string> = { nuevo:"Nuevo", revision:"En revisión", contactado:"Contactado", reunion:"Reunión", propuesta:"Propuesta", cliente:"Cliente", cerrado:"Cerrado", descartado:"Descartado" };
const serviceLabels: Record<string,string> = { aibrand:"AIBRAND", aimark:"AIMARK", aiprod:"AIPROD", aipacks:"AIPACKS", "no-se":"Por definir" };

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-EC", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

export default function PanelClient() {
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteDraft, setNoteDraft] = useState("");
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [panelMessage, setPanelMessage] = useState("");
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | "unsupported">("unsupported");

  const selected = leads.find((lead) => lead.id === selectedId) || null;

  const loadLeads = useCallback(async () => {
    if (!supabase || !session?.user.email) return;
    const { data: adminRow } = await supabase.from("admin_users").select("email").eq("email", session.user.email.toLowerCase()).maybeSingle();
    if (!adminRow) { setAllowed(false); setLeads([]); setPanelMessage(""); setLoading(false); return; }
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200);
    if (error) { setPanelMessage("No pudimos cargar los leads. Intenta recargar el panel."); setLoading(false); return; }
    setAllowed(true);
    setPanelMessage("");
    setLeads((data || []) as Lead[]);
    setSelectedId((current) => current || data?.[0]?.id || null);
    setLoading(false);
  }, [supabase, session?.user.email]);

  const loadNotes = useCallback(async (leadId: string | null) => {
    if (!supabase || !leadId) { setNotes([]); return; }
    const { data } = await supabase.from("lead_notes").select("*").eq("lead_id", leadId).order("created_at", { ascending: false });
    setNotes((data || []) as Note[]);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotificationPermission("unsupported");
      return;
    }
    setNotificationPermission(Notification.permission);
  }, []);

  useEffect(() => {
    if (!session) { setAllowed(null); setLoading(false); return; }
    setLoading(true);
    loadLeads();
  }, [session, loadLeads]);

  useEffect(() => { loadNotes(selectedId); }, [selectedId, loadNotes]);

  useEffect(() => {
    if (!supabase || !session || allowed !== true) return;
    const channel = supabase.channel("aivan-leads")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, (payload) => {
        const lead = payload.new as Lead;
        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
          new Notification(`Nuevo brief · ${lead.business_name || "AIVAN"}`, {
            body: `${lead.contact_name || "Nuevo contacto"} · ${serviceLabels[lead.service] || "Servicio por definir"}`,
            tag: `aivan-lead-${lead.id}`,
          });
        }
        setPanelMessage(`Nuevo brief recibido: ${lead.business_name || "sin nombre"}.`);
        loadLeads();
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "leads" }, () => loadLeads())
      .on("postgres_changes", { event: "*", schema: "public", table: "lead_notes" }, () => loadNotes(selectedId))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [supabase, session, allowed, loadLeads, loadNotes, selectedId]);

  async function requestMagicLink(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !email.trim()) return;
    setAuthLoading(true); setAuthMessage("");
    const redirectTo = `${window.location.origin}/panel`;
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim().toLowerCase(), options: { emailRedirectTo: redirectTo, shouldCreateUser: true } });
    setAuthLoading(false);
    setAuthMessage(error ? error.message : "Te enviamos un enlace de acceso. Revisa tu correo.");
  }

  async function updateStatus(status: string) {
    if (!supabase || !selected) return;
    const patch: Record<string, string | null> = { status };
    if (status === "contactado" && !selected.last_contacted_at) patch.last_contacted_at = new Date().toISOString();
    setPanelMessage("");
    const { error } = await supabase.from("leads").update(patch).eq("id", selected.id);
    if (error) { setPanelMessage("No pudimos actualizar el estado. Intenta nuevamente."); return; }
    setLeads((current) => current.map((lead) => lead.id === selected.id ? { ...lead, ...patch } as Lead : lead));
    setPanelMessage(`Estado actualizado: ${statusLabels[status]}.`);
  }

  async function addNote(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !selected || !noteDraft.trim()) return;
    setPanelMessage("");
    const { error } = await supabase.from("lead_notes").insert({
      lead_id: selected.id,
      body: noteDraft.trim(),
      author_email: session?.user.email?.toLowerCase() || null,
    });
    if (error) { setPanelMessage("No pudimos guardar la nota. Intenta nuevamente."); return; }
    setNoteDraft("");
    setPanelMessage("Nota guardada.");
    loadNotes(selected.id);
  }

  async function requestNotifications() {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotificationPermission("unsupported");
      setPanelMessage("Este navegador no admite avisos del sistema.");
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    setPanelMessage(permission === "granted"
      ? "Avisos activados en este dispositivo mientras el panel esté abierto."
      : "Los avisos no fueron habilitados. El panel seguirá actualizándose en tiempo real.");
  }

  async function signOut() { if (supabase) await supabase.auth.signOut(); }

  const filtered = leads.filter((lead) => {
    const statusOk = filter === "todos" || lead.status === filter;
    const q = search.trim().toLowerCase();
    const searchOk = !q || [lead.business_name, lead.contact_name, lead.email || "", lead.city || "", lead.service].some((v) => v.toLowerCase().includes(q));
    return statusOk && searchOk;
  });

  const counts = { nuevo: leads.filter((x) => x.status === "nuevo").length, revision: leads.filter((x) => x.status === "revision").length, contactado: leads.filter((x) => x.status === "contactado").length, reunion: leads.filter((x) => x.status === "reunion").length };

  if (!supabase) return <div className="panel-center"><div className="panel-login"><Wordmark /><h1>Falta configurar Supabase.</h1><p>Añade las variables públicas del proyecto para activar el panel.</p></div></div>;

  if (!session) return (
    <div className="panel-center">
      <form className="panel-login" onSubmit={requestMagicLink}>
        <Wordmark /><p className="micro-label">PANEL INTERNO</p><h1>Acceso al equipo AIVAN.</h1>
        <p>Usa tu correo autorizado. Recibirás un enlace de acceso sin contraseña.</p>
        <label><span>Correo</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="equipo@aivanstudios.com" required /></label>
        <button className="button button-dark" disabled={authLoading}>{authLoading ? "Enviando…" : "Enviar enlace de acceso →"}</button>
        {authMessage && <p className="auth-message" role="status" aria-live="polite">{authMessage}</p>}<a href="/">← Volver al sitio</a>
      </form>
    </div>
  );

  if (allowed === false) return (
    <div className="panel-center"><div className="panel-login"><Wordmark /><p className="micro-label">SIN ACCESO</p><h1>Este correo no está autorizado.</h1><p>{session.user.email}</p><p>Pide al administrador de AIVAN que agregue este correo al panel.</p><button className="button button-dark" onClick={signOut}>Cerrar sesión</button></div></div>
  );

  return (
    <div className="crm-shell">
      <aside className="crm-sidebar">
        <a href="/"><Wordmark /></a>
        <nav aria-label="Panel AIVAN"><button className="active" aria-current="page">◉ <span>Leads</span></button></nav>
        <div className="crm-user"><span>{session.user.email?.slice(0,1).toUpperCase()}</span><div><strong>Equipo AIVAN</strong><small>{session.user.email}</small></div><button onClick={signOut} title="Cerrar sesión">↗</button></div>
      </aside>

      <main className="crm-main" id="main-content">
        <header className="crm-top"><div><p className="micro-label">PANEL DE OPORTUNIDADES</p><h1>Leads y briefs.</h1></div><div className="crm-top-actions">{notificationPermission === "default" && <button type="button" className="button button-quiet" onClick={requestNotifications}>Activar avisos</button>}{notificationPermission === "granted" && <span className="crm-live-indicator" title="Avisos activados"><i /> Avisos activos</span>}<a href="/" className="button button-quiet">Ver sitio ↗</a></div></header>{panelMessage && <p className="crm-notice" role="status" aria-live="polite">{panelMessage}</p>}
        <section className="crm-metrics"><article><span>Nuevos</span><strong>{counts.nuevo}</strong></article><article><span>En revisión</span><strong>{counts.revision}</strong></article><article><span>Contactados</span><strong>{counts.contactado}</strong></article><article><span>Reuniones</span><strong>{counts.reunion}</strong></article></section>
        <section className="crm-workspace">
          <div className="crm-list-pane">
            <div className="crm-filters"><input aria-label="Buscar leads" placeholder="Buscar negocio, contacto o ciudad…" value={search} onChange={(e) => setSearch(e.target.value)} /><select aria-label="Filtrar por estado" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="todos">Todos los estados</option>{statuses.map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></div>
            <div className="crm-list-head"><span>{filtered.length} oportunidades</span><small>Actualización en tiempo real</small></div>
            <div className="lead-list">
              {loading && <div className="crm-empty">Cargando…</div>}
              {!loading && filtered.length === 0 && <div className="crm-empty"><strong>No hay leads aquí.</strong><span>Los nuevos briefs aparecerán automáticamente.</span></div>}
              {filtered.map((lead) => <button key={lead.id} className={`lead-row${selectedId === lead.id ? " selected" : ""}`} onClick={() => setSelectedId(lead.id)}><span className="lead-avatar">{lead.business_name.slice(0,2).toUpperCase()}</span><span className="lead-main"><strong>{lead.business_name}</strong><small>{lead.contact_name} · {serviceLabels[lead.service]}</small></span><span className={`status-pill status-${lead.status}`}>{statusLabels[lead.status]}</span><time>{formatDate(lead.created_at)}</time><b>›</b></button>)}
            </div>
          </div>

          <aside className="lead-detail" aria-label="Detalle del lead">
            {!selected ? <div className="crm-empty"><strong>Selecciona un lead.</strong><span>Aquí aparecerá el brief completo.</span></div> : <>
              <button type="button" className="detail-back" onClick={() => setSelectedId(null)}>← Volver a la lista</button><div className="detail-head"><div className="lead-avatar large">{selected.business_name.slice(0,2).toUpperCase()}</div><div><p className="micro-label">{serviceLabels[selected.service]}</p><h2>{selected.business_name}</h2><span>{selected.contact_name}</span></div></div>
              <div className="detail-status"><span>Estado</span><select value={selected.status} onChange={(e) => updateStatus(e.target.value)}>{statuses.map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></div>
              <div className="detail-actions">{selected.phone && <a className="action-primary" href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">Responder por WhatsApp ↗</a>}{selected.email && <a href={`mailto:${selected.email}`}>Enviar correo</a>}</div>
              <div className="detail-section"><h3>Contacto</h3><dl><div><dt>Nombre</dt><dd>{selected.contact_name}</dd></div><div><dt>Correo</dt><dd>{selected.email || "—"}</dd></div><div><dt>Teléfono</dt><dd>{selected.phone || "—"}</dd></div><div><dt>Ciudad</dt><dd>{selected.city || "—"}</dd></div><div><dt>Web / red</dt><dd>{selected.website || "—"}</dd></div></dl></div>
              <div className="detail-section"><h3>Brief</h3><div className="brief-answer"><span>¿A qué se dedica?</span><p>{selected.industry || "—"}</p></div><div className="brief-answer"><span>¿Qué quiere impulsar?</span><p>{selected.product_focus || "—"}</p></div><div className="brief-answer"><span>Reto principal</span><p>{selected.challenge || "—"}</p></div><div className="brief-answer"><span>Objetivo</span><p>{selected.goal || "—"}</p></div><div className="brief-answer"><span>Presupuesto</span><p>{selected.budget || "Por definir"}</p></div>{selected.networks?.length > 0 && <div className="detail-chips">{selected.networks.map((n) => <span key={n}>{n}</span>)}</div>}</div>
              <div className="detail-section notes-section"><h3>Notas internas</h3><form onSubmit={addNote}><textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} placeholder="Añade contexto para el equipo…" rows={3} /><button className="button button-dark" disabled={!noteDraft.trim()}>Guardar nota</button></form>{notes.map((note) => <article key={note.id}><p>{note.body}</p><small>{note.author_email || "AIVAN"} · {formatDate(note.created_at)}</small></article>)}</div>
            </>}
          </aside>
        </section>
      </main>
    </div>
  );
}
