"use client";

import { useRef } from "react";
import { experience } from "@/data/content";
import { useReveal } from "@/lib/useReveal";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id="experience" ref={ref} className="section">
      <p className="mono" data-reveal>Experience [0{experience.length}]</p>
      <h2 className="section-title" data-reveal>Where I&apos;ve worked</h2>
      <ol className="exp-list">
        {experience.map((e) => (
          <li key={e.period + e.role} className="exp-item" data-reveal>
            <span className="mono">{e.period}</span>
            <div>
              <h3>{e.role}</h3>
              <p className="exp-org">{e.org}</p>
              <p>{e.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <style>{`
        .exp-list { list-style: none; margin-top: 3rem; border-top: 1px solid var(--line); }
        .exp-item { display: grid; grid-template-columns: 14rem 1fr; gap: 2rem; padding: 2rem 0; border-bottom: 1px solid var(--line);
          transition: padding-left .4s, background .4s; }
        .exp-item:hover { padding-left: 1.2rem; background: linear-gradient(90deg, rgba(90,242,200,.06), transparent); }
        .exp-item h3 { font-size: 1.5rem; letter-spacing: -.02em; }
        .exp-org { color: var(--accent); margin: .2rem 0 .6rem; }
        .exp-item p:last-child { color: var(--muted); line-height: 1.6; max-width: 40rem; }
        @media (max-width: 700px) { .exp-item { grid-template-columns: 1fr; gap: .6rem; } }
      `}</style>
    </section>
  );
}
