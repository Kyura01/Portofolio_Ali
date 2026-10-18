"use client";

import { useRef } from "react";
import { profile } from "@/data/content";
import { useReveal } from "@/lib/useReveal";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id="contact" ref={ref} className="section contact">
      <p className="mono" data-reveal>Contact</p>
      <h2 className="contact-title" data-reveal>
        Let&apos;s build something <em>remarkable.</em>
      </h2>
      <a href={`mailto:${profile.email}`} className="btn btn-primary" data-magnetic data-reveal>
        {profile.email} ↗
      </a>
      <div className="contact-links" data-reveal>
        {profile.socials.map((s) => (
          <a key={s.label} href={s.href} className="mono" target="_blank" rel="noreferrer" data-magnetic>
            {s.label}
          </a>
        ))}
      </div>
      <p className="mono contact-foot" data-reveal>© {profile.fullName}</p>
      <style>{`
        .contact { text-align: center; display: grid; justify-items: center; gap: 2rem; padding-bottom: 4rem; }
        .contact-title { font-size: clamp(2.4rem, 8vw, 7rem); font-weight: 800; letter-spacing: -.04em; line-height: 1; max-width: 14ch; }
        .contact-title em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px var(--accent); }
        .contact-links { display: flex; gap: 1.6rem; }
        .contact-links a:hover { color: var(--accent); }
        .contact-foot { margin-top: 3rem; }
      `}</style>
    </section>
  );
}
