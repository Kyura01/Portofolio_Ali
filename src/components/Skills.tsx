"use client";

import { useRef } from "react";
import { education, profile, skills } from "@/data/content";
import { useReveal } from "@/lib/useReveal";

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id="skills" ref={ref} className="section">
      <p className="mono" data-reveal>Skills [0{skills.length}]</p>
      <h2 className="section-title" data-reveal>What I work with</h2>
      <p className="skill-about" data-reveal>{profile.about}</p>
      <p className="mono" data-reveal>
        {education.program} · {education.school} · {education.period}
      </p>
      <div className="svc-grid">
        {skills.map((s, i) => (
          <article key={s.title} className="svc-card" data-reveal>
            <span className="mono">0{i + 1}</span>
            <h3>{s.title}</h3>
            <ul className="skill-chips">
              {s.items.map((item) => (
                <li key={item} className="mono">{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <style>{`
        .skill-about { color: var(--muted); line-height: 1.7; max-width: 46rem; margin: 1.4rem 0 .8rem; }
        .svc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 1rem; margin-top: 3rem; }
        .svc-card { position: relative; padding: 1.6rem; border: 1px solid var(--line); border-radius: 20px; background: var(--bg-2);
          display: grid; gap: .8rem; min-height: 220px; align-content: end; overflow: hidden; transition: border-color .3s, transform .4s; }
        .svc-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(255,181,71,.16), transparent 55%);
          opacity: 0; transition: opacity .4s; }
        .svc-card:hover { border-color: rgba(255,181,71,.5); transform: translateY(-6px); }
        .svc-card:hover::before { opacity: 1; }
        .svc-card h3 { font-size: 1.3rem; position: relative; }
        .svc-card > span { position: relative; color: var(--accent); }
        .skill-chips { position: relative; list-style: none; display: flex; flex-wrap: wrap; gap: .4rem; }
        .skill-chips li { border: 1px solid var(--line); border-radius: 6px; padding: .2rem .5rem; }
      `}</style>
    </section>
  );
}
