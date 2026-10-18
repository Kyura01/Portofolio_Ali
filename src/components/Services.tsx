"use client";

import { useRef } from "react";
import { services } from "@/data/content";
import { useReveal } from "@/lib/useReveal";

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id="service" ref={ref} className="section">
      <p className="mono" data-reveal>Services [0{services.length}]</p>
      <h2 className="section-title" data-reveal>What I do</h2>
      <div className="svc-grid">
        {services.map((s, i) => (
          <article key={s.title} className="svc-card" data-reveal>
            <span className="mono">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
      <style>{`
        .svc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 3rem; }
        .svc-card { position: relative; padding: 1.6rem; border: 1px solid var(--line); border-radius: 20px; background: var(--bg-2);
          display: grid; gap: .8rem; min-height: 220px; align-content: end; overflow: hidden; transition: border-color .3s, transform .4s; }
        .svc-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(90,242,200,.16), transparent 55%);
          opacity: 0; transition: opacity .4s; }
        .svc-card:hover { border-color: rgba(90,242,200,.5); transform: translateY(-6px); }
        .svc-card:hover::before { opacity: 1; }
        .svc-card h3 { font-size: 1.3rem; position: relative; }
        .svc-card p { color: var(--muted); line-height: 1.55; position: relative; }
        .svc-card span { position: relative; color: var(--accent); }
      `}</style>
    </section>
  );
}
