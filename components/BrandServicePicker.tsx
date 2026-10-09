"use client";

import { useEffect, useId, useRef, useState } from "react";

const choices = [
  { value: "no-se", title: "No estoy seguro todavía", detail: "Lo descubrimos juntos", style: "unsure", number: "—" },
  { value: "aibrand", title: "AIBRAND", detail: "Branding y diseño", style: "brand", number: "01" },
  { value: "aimark", title: "AIMARK", detail: "Marketing creativo", style: "mark", number: "02" },
  { value: "aiprod", title: "AIPROD", detail: "Producción audiovisual", style: "prod", number: "03" },
  { value: "aipacks", title: "AIPACKS", detail: "Acompañamiento integral", style: "packs", number: "04" },
] as const;

export default function BrandServicePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const controlRef = useRef<HTMLDivElement>(null);
  const controlId = useId();
  const listId = `${controlId}-list`;
  const selected = choices.find((choice) => choice.value === value) ?? choices[0];

  useEffect(() => {
    if (!open) return;
    const onOutside = (event: PointerEvent) => {
      if (controlRef.current && !controlRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, [open]);

  function choose(index: number) {
    onChange(choices[index].value);
    setHighlighted(index);
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      if (open) { event.preventDefault(); setOpen(false); }
      return;
    }
    if (event.key === "Tab") { setOpen(false); return; }
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (!open) { setHighlighted(Math.max(0, choices.findIndex((choice) => choice.value === value))); setOpen(true); return; }
      setHighlighted((current) =>
        event.key === "Home" ? 0 :
        event.key === "End" ? choices.length - 1 :
        event.key === "ArrowDown" ? (current + 1) % choices.length :
        (current + choices.length - 1) % choices.length
      );
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) {
        setHighlighted(Math.max(0, choices.findIndex((choice) => choice.value === value)));
        setOpen(true);
      } else choose(highlighted);
    }
  }

  return (
    <div ref={controlRef} className={`aivan-service-picker${open ? " is-open" : ""}`}>
      <button
        type="button"
        className={`aivan-service-trigger aivan-service-trigger--${selected.style}`}
        role="combobox"
        aria-label="Área que crees necesitar"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${controlId}-option-${highlighted}` : undefined}
        onClick={() => {
          setHighlighted(Math.max(0, choices.findIndex((choice) => choice.value === value)));
          setOpen(!open);
        }}
        onKeyDown={handleKeyDown}
      >
        <span className={`aivan-service-orb aivan-service-orb--${selected.style}`} aria-hidden="true" />
        <span className="aivan-service-trigger-copy">
          <strong>{selected.title}</strong>
          <small>{selected.detail}</small>
        </span>
        <svg className="aivan-service-chevron" aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m6.5 9 5.5 5.5L17.5 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <div className="aivan-service-options" id={listId} role="listbox" aria-label="Áreas de AIVAN">
          <div className="aivan-service-menu-eyebrow">ELIGE UNA DIRECCIÓN</div>
          {choices.map((choice, index) => (
            <button
              type="button"
              role="option"
              id={`${controlId}-option-${index}`}
              aria-selected={choice.value === value}
              key={choice.value}
              tabIndex={-1}
              className={`aivan-service-option aivan-service-option--${choice.style}${highlighted === index ? " is-highlighted" : ""}`}
              onMouseEnter={() => setHighlighted(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span className="aivan-service-option-index">{choice.number}</span>
              <span className="aivan-service-option-copy"><strong>{choice.title}</strong><small>{choice.detail}</small></span>
              <span className="aivan-service-option-check" aria-hidden="true">{choice.value === value ? "✓" : "↗"}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
