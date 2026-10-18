"use client";

import { useRef } from "react";
import { experience, type ExperienceCategory } from "@/data/content";
import { useReveal } from "@/lib/useReveal";

const LABEL: Record<ExperienceCategory, string> = {
  work: "Work",
  teaching: "Teaching",
  organization: "Organization",
  certification: "Certification",
};

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id="experience" ref={ref} className="section">
      <p className="mono" data-reveal>Experience [{String(experience.length).padStart(2, "0")}]</p>
      <h2 className="section-title" data-reveal>Where I&apos;ve worked</h2>
      <ol className="exp-list">
        {experience.map((e) => (
          <li
            key={e.period + e.role}
            className={`exp-item exp-${e.category}`}
            data-reveal
          >
            <span className="mono exp-period">{e.period}</span>
            <div>
              <span className="exp-tag mono">{LABEL[e.category]}</span>
              <h3>{e.role}</h3>
              <p className="exp-org">{e.org}</p>
              {e.category === "teaching" || e.category === "certification" ? (
                <p className="exp-line">{e.bullets[0]}</p>
              ) : (
                <ul className="exp-bullets">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
      <style>{`
        .exp-list { list-style: none; margin-top: 3rem; border-top: 1px solid var(--line); }
        .exp-item { display: grid; grid-template-columns: 14rem 1fr; gap: 2rem; padding: 2rem 0; border-bottom: 1px solid var(--line);
          transition: padding-left .4s, background .4s; }
        .exp-item:hover { padding-left: 1.2rem; background: linear-gradient(90deg, rgba(255,181,71,.06), transparent); }
        .exp-teaching, .exp-certification { padding: 1.2rem 0; }
        .exp-tag { display: inline-block; margin-bottom: .5rem; padding: .15rem .5rem; border: 1px solid var(--line); border-radius: 999px; }
        .exp-work .exp-tag { color: var(--accent); border-color: rgba(255,181,71,.4); }
        .exp-organization .exp-tag { color: var(--accent-2); border-color: rgba(122,108,255,.45); }
        .exp-item h3 { font-size: 1.5rem; letter-spacing: -.02em; }
        .exp-teaching h3, .exp-certification h3 { font-size: 1.15rem; }
        .exp-org { color: var(--accent); margin: .2rem 0 .6rem; }
        .exp-teaching .exp-org, .exp-certification .exp-org { margin-bottom: .3rem; }
        .exp-bullets { display: grid; gap: .4rem; padding-left: 1.1rem; color: var(--muted); line-height: 1.6; max-width: 42rem; }
        .exp-bullets li::marker { color: var(--accent); }
        .exp-line { color: var(--muted); line-height: 1.6; max-width: 42rem; }
        @media (max-width: 700px) { .exp-item { grid-template-columns: 1fr; gap: .6rem; } }
      `}</style>
    </section>
  );
}
