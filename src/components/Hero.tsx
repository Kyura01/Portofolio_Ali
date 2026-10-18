"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { profile } from "@/data/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

const Orb = dynamic(() => import("./Orb"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-letter", { yPercent: 110, opacity: 0, rotate: 6, stagger: 0.05, duration: 1.1 })
        .from(".hero-orb", { scale: 0.4, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.6)" }, "-=0.7")
        .from(".hero-copy > *", { y: 30, opacity: 0, stagger: 0.12, duration: 0.9 }, "-=0.9");

      // outline name fills with accent colour as you scroll away
      gsap.to(".hero-name", {
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        yPercent: -25,
        opacity: 0.2,
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="top" ref={root} className="hero">
      <h1 className="hero-name" aria-label={profile.name}>
        {profile.name.split("").map((c, i) => (
          <span key={i} className="hero-clip" aria-hidden>
            <span className="hero-letter">{c}</span>
          </span>
        ))}
      </h1>

      <div className="hero-body">
        <div className="hero-copy">
          <p className="mono">{profile.fullName}</p>
          <h2>{profile.role}</h2>
          <p className="hero-tag">{profile.tagline}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary" data-magnetic>
              Let&apos;s collaborate
            </a>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} className="btn" data-magnetic target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="hero-orb">
          <Orb />
        </div>
      </div>

      <span className="mono hero-scroll">Scroll ↓</span>

      <style>{`
        .hero { position: relative; min-height: 100svh; padding: 7rem 4vw 3rem; display: flex; flex-direction: column;
          justify-content: space-between; overflow: hidden; }
        .hero::before { content: ""; position: absolute; width: 60vw; height: 60vw; right: -15vw; top: 10vh;
          background: radial-gradient(circle, rgba(122,108,255,.25), transparent 60%); filter: blur(40px); pointer-events: none; }
        .hero-name { display: flex; justify-content: center; gap: .02em; font-size: clamp(5rem, 22vw, 20rem);
          font-weight: 900; line-height: .95; letter-spacing: -.04em; will-change: transform; }
        .hero-clip { display: inline-block; overflow: hidden; padding: .04em .02em; }
        .hero-letter { display: inline-block; color: transparent; -webkit-text-stroke: 1.5px var(--fg);
          transition: color .4s, -webkit-text-stroke-color .4s; }
        .hero-clip:hover .hero-letter { color: var(--accent); -webkit-text-stroke-color: var(--accent); }
        .hero-body { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 2rem; }
        .hero-copy h2 { font-size: clamp(1.8rem, 4vw, 3.2rem); letter-spacing: -.03em; margin: .6rem 0; }
        .hero-tag { color: var(--muted); max-width: 32rem; line-height: 1.6; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 1.6rem; }
        .hero-orb { justify-self: end; width: min(34vw, 420px); aspect-ratio: 1; }
        .orb { width: 100%; height: 100%; }
        .hero-scroll { align-self: center; margin-top: 1rem; }
        @media (max-width: 860px) {
          .hero-body { grid-template-columns: 1fr; }
          .hero-orb { justify-self: center; width: min(70vw, 340px); order: -1; }
        }
      `}</style>
    </section>
  );
}
