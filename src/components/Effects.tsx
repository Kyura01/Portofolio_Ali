"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pointer, scrollBus, startPointerTracking } from "@/lib/pointer";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/** Smooth scroll (Lenis ↔ ScrollTrigger), custom cursor and magnetic buttons. */
export default function Effects() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // pointer tracking + smooth scroll
  useEffect(() => {
    const stopPointer = startPointerTracking();
    if (reduced) return stopPointer;

    const lenis = new Lenis({ lerp: 0.085, anchors: true });
    scrollBus.to = (y) => lenis.scrollTo(y, { duration: 1.4 });
    const onScroll = () => {
      ScrollTrigger.update();
      pointer.scrollVelocity = lenis.velocity;
    };
    lenis.on("scroll", onScroll);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      stopPointer();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);

  // cursor follower + magnetic effect
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || !dot.current || !ring.current) return;
    document.body.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    let magnet: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      ring.current?.classList.toggle("is-hover", pointer.hoveringInteractive);

      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet && magnet !== target) {
        gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      }
      magnet = target;
      if (target) {
        const r = target.getBoundingClientRect();
        const mx = (e.clientX - (r.left + r.width / 2)) * 0.3;
        const my = (e.clientY - (r.top + r.height / 2)) * 0.3;
        gsap.to(target, { x: mx, y: my, duration: 0.3, ease: "power3.out" });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
