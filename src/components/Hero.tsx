"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { profile } from "@/data/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

const Orb = dynamic(() => import("./Orb"), { ssr: false });

// The big outline name morphs between these. First entry is what shows on load.
const NAMES = [profile.name, profile.fullName.toUpperCase()];
const CYCLE_MS = 4200;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const [nameIdx, setNameIdx] = useState(0);
  const idxRef = useRef(0);
  const busy = useRef(false);
  const hovering = useRef(false);
  const swapped = useRef(false); // skip the "letters in" tween on first mount (the intro timeline owns it)

  const letters = () => Array.from(root.current?.querySelectorAll<HTMLElement>(".hero-letter") ?? []);

  /** letters slide up and out, the text swaps, new letters slide in */
  const morphTo = useCallback((next: number) => {
    if (busy.current || next === idxRef.current) return;
    busy.current = true;
    gsap.to(letters(), {
      yPercent: -110,
      opacity: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power3.in",
      onComplete: () => {
        idxRef.current = next;
        swapped.current = true;
        setNameIdx(next);
      },
    });
  }, []);

  useEffect(() => {
    if (!swapped.current) return;
    gsap.fromTo(
      letters(),
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.035,
        ease: "power4.out",
        onComplete: () => {
          busy.current = false;
        },
      },
    );
  }, [nameIdx]);

  // auto-cycle, paused while the pointer is over the name
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!hovering.current) morphTo((idxRef.current + 1) % NAMES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, morphTo]);

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
      <h1
        className="hero-name"
        aria-label={profile.fullName}
        style={{ "--n": NAMES[nameIdx].replace(/\s/g, "").length } as React.CSSProperties}
        onPointerEnter={() => {
          hovering.current = true;
          morphTo(NAMES.length - 1);
        }}
        onPointerLeave={() => {
          hovering.current = false;
        }}
        onClick={() => morphTo((idxRef.current + 1) % NAMES.length)}
      >
        {NAMES[nameIdx].split(" ").map((word, w) => (
          <span key={`${nameIdx}-${w}`} className="hero-word" aria-hidden>
            {word.split("").map((c, i) => (
              <span key={i} className="hero-clip">
                <span className="hero-letter">{c}</span>
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="hero-body">
        <div className="hero-copy">
          <p className="mono">{profile.fullName}</p>
          <h2>{profile.role}</h2>
          <p className="mono hero-sub">{profile.subtitle}</p>
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
        .hero-name { display: flex; flex-wrap: wrap; justify-content: center; column-gap: .22em; font-size: clamp(2.6rem, min(22vw, calc(88vw / (var(--n, 3) * .78))), 20rem);
          font-weight: 900; line-height: .95; letter-spacing: -.04em; will-change: transform; cursor: pointer; }
        /* reserve the height of the tall "ALI" state so the layout below never jumps while the name morphs */
        .hero-name { min-height: calc(min(22vw, 20rem) * 1.03); align-content: center; align-items: center; }
        .hero-word { display: inline-flex; gap: .02em; }
        .hero-clip { display: inline-block; overflow: hidden; padding: .04em .02em; }
        .hero-letter { display: inline-block; color: transparent; -webkit-text-stroke: 1.5px var(--fg);
          transition: color .4s, -webkit-text-stroke-color .4s; }
        .hero-clip:hover .hero-letter { color: var(--accent); -webkit-text-stroke-color: var(--accent); }
        .hero-body { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 2rem; }
        .hero-copy h2 { font-size: clamp(1.8rem, 4vw, 3.2rem); letter-spacing: -.03em; margin: .6rem 0; }
        .hero-sub { color: var(--accent); margin-bottom: .8rem; }
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
