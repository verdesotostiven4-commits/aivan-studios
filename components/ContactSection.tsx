"use client";

import { useState } from "react";

/** Approved custom gradient WhatsApp icon provided by the studio. */
const WHATSAPP_ICON_URL = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFJMLspsTRLe2aBl94MZ9zkNjs3iSsjGM5-pn79WXFFDHYs5GtIIiqZbj-ab-tn3pxGr04Jj99qeiP7eR0fyobsNXau3Zv5vBqtiEIkmp1XyMn0SuY7A-9alVUbNjEGtutYxLGF829za_2yC8UctYrwv1I2t291MqXw9zmL7NO1jvKNh7du1NOiS6Sa6o/s1600/image.png";

/** Transparent custom email icon supplied by AIVAN (2026-10-09). */
const EMAIL_ICON_URL = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFOUQqnGiFPqerhOKjJ0UT6_Fz-cksZtMH8tyJH8DveKzW0AzQXaEova0PHFYGr7v51mwNcAMv72PkDMM_kMxA3wK3dXjrwZ1wKo9z7voB5U6YBoq_V89nJcCPZsGV5O7LBcpah_W9F3rUhQ9OowdCeH21GusgNH8g5Hqy1-nR9gowXDZ5GhR_1mptQVA/s1600/image.png";

type ContactSectionProps = {
  whatsappHref: string;
  emailHref: string;
  email: string;
  phone: string;
};

function ContactSymbol({ kind }: { kind: "whatsapp" | "email" }) {
  if (kind === "whatsapp") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 37.5 6 42l2.1-9A18.8 18.8 0 1 1 15 39"/>
        <path d="M17 14.5c-.9-.5-2.2.1-3 1.9-1.7 3.7 2.3 10 7.7 14.1 5 3.8 10.2 3.3 11.5 1.2.8-1.2.7-2.5-.4-3.1l-4.2-1.9-2.6 2.3c-3.7-1.8-5.9-4.1-7.7-7.2l2-2.8-2.1-4.5z"/>
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5.5" y="10" width="37" height="28" rx="5"/>
      <path d="m7.5 14.5 16.5 13 16.5-13"/>
    </svg>
  );
}

function ArrowSymbol() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15m-6-6 6 6-6 6"/>
    </svg>
  );
}

function BenefitIcon({ type }: { type: "fast" | "people" | "trust" }) {
  if (type === "fast") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-9 12h7l-1 8 10-13h-7l1-7z"/></svg>;
  }
  if (type === "people") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2c0-3 2-5 6-5s6 2 6 5v2"/><path d="M17 5a3 3 0 0 1 0 6m-1 3c3 0 5 2 5 5v1"/></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4.5 5v6c0 5.6 3 8.7 7.5 11 4.5-2.3 7.5-5.4 7.5-11V5L12 2z"/><path d="m8.5 11.5 2.3 2.3 4.7-4.8"/></svg>;
}

export default function ContactSection({ whatsappHref, emailHref, email, phone }: ContactSectionProps) {
  const [whatsappIconError, setWhatsappIconError] = useState(false);
  const [emailIconError, setEmailIconError] = useState(false);

  return (
    <section className="contact-section contact-section--editorial" id="contacto" aria-labelledby="contact-title">
      <div className="contact-ambient" aria-hidden="true" />
      <div className="contact-shell contact-shell--editorial">
        <div className="contact-editorial-copy" data-reveal>
          <div className="contact-editorial-kicker"><span>CONTACTO DIRECTO</span><i aria-hidden="true" /></div>
          <h2 id="contact-title">¿Prefieres hablar <span>sin llenar el brief?</span></h2>
          <p className="contact-editorial-lead">Escríbenos directamente por WhatsApp o correo. Si ya tienes claro lo que necesitas, este es el camino más rápido.</p>
          <div className="contact-editorial-benefits" aria-label="Ventajas del contacto directo">
            <div><BenefitIcon type="fast" /><span>Respuesta<br/>rápida</span></div>
            <div><BenefitIcon type="people" /><span>Atención<br/>directa</span></div>
            <div><BenefitIcon type="trust" /><span>Tus ideas<br/>en buenas manos</span></div>
          </div>
        </div>
        <div className="contact-editorial-actions" data-reveal>
          <a className="contact-editorial-card" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`Escribir a AIVAN por WhatsApp: ${phone}`}>
            <span className="contact-editorial-icon contact-editorial-icon--whatsapp">
              {whatsappIconError ? (
                <ContactSymbol kind="whatsapp" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="contact-whatsapp-image"
                  src={WHATSAPP_ICON_URL}
                  alt=""
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onError={() => setWhatsappIconError(true)}
                />
              )}
            </span>
            <span className="contact-editorial-card-body">
              <span className="contact-editorial-eyebrow">WHATSAPP</span>
              <strong>{phone}</strong>
              <span className="contact-editorial-description">Escríbenos y conversemos sobre tu proyecto.</span>
            </span>
            <span className="contact-editorial-arrow"><ArrowSymbol /></span>
          </a>
          <a className="contact-editorial-card" href={emailHref} aria-label={`Enviar correo a AIVAN: ${email}`}>
            <span className="contact-editorial-icon contact-editorial-icon--email">
              {emailIconError ? (
                <ContactSymbol kind="email" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="contact-email-image" src={EMAIL_ICON_URL} alt="" width={160} height={160} loading="lazy" decoding="async" draggable={false} onError={() => setEmailIconError(true)} />
              )}
            </span>
            <span className="contact-editorial-card-body">
              <span className="contact-editorial-eyebrow">CORREO</span>
              <strong>{email}</strong>
              <span className="contact-editorial-description">Cuéntanos tu idea y te responderemos pronto.</span>
            </span>
            <span className="contact-editorial-arrow"><ArrowSymbol /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
