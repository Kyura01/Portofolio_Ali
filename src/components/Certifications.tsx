"use client";

import { useRef } from "react";
import { certifications } from "@/data/content";
import { useReveal } from "@/lib/useReveal";

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id="certifications" ref={ref} className="section">
      <p className="mono" data-reveal>Certifications [0{certifications.length}]</p>
      <h2 className="section-title" data-reveal>Credentials</h2>
      <div className="cert-grid">
        {certifications.map((c) => (
          <article key={c.title} className="cert" data-reveal>
            <span className="mono">{c.year}</span>
            <h3>{c.title}</h3>
            <p>{c.issuer}</p>
          </article>
        ))}
      </div>
      <style>{`
        .cert-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 3rem; }
        .cert { padding: 1.5rem; border: 1px solid var(--line); border-radius: 18px; background: var(--bg-2); display: grid; gap: .5rem; }
        .cert span { color: var(--accent); }
        .cert p { color: var(--muted); }
      `}</style>
    </section>
  );
}
