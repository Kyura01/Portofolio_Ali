"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/content";

const links = [
  { href: "#project", label: "Project", count: "06" },
  { href: "#service", label: "Service", count: "04" },
  { href: "#experience", label: "Experience", count: "03" },
  { href: "#certifications", label: "Certifications", count: "01" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <a href="#top" className="nav-logo" data-magnetic aria-label="Beranda">
        {profile.name.slice(0, 1)}
        <i />
      </a>
      <nav className="nav-links" aria-label="Utama">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
            {l.count && <span className="mono"> [{l.count}]</span>}
          </a>
        ))}
      </nav>
      <a href="#contact" className="btn btn-primary nav-cta" data-magnetic>
        Let&apos;s Talk ↗
      </a>
      <style>{`
        .nav { position: fixed; inset: 0 0 auto 0; z-index: 50; display: flex; align-items: center;
          justify-content: space-between; padding: 1.4rem 3vw; transition: padding .4s, background .4s, border-color .4s;
          border-bottom: 1px solid transparent; }
        .nav-scrolled { padding: .7rem 3vw; background: rgba(5,6,10,.72); backdrop-filter: blur(14px); border-color: var(--line); }
        .nav-logo { position: relative; width: 38px; height: 38px; display: grid; place-items: center; border-radius: 10px;
          background: var(--accent); color: #02130e; font-weight: 800; }
        .nav-logo i { position: absolute; inset: -5px; border-radius: 14px; border: 1px solid var(--accent); opacity: .4; }
        .nav-links { display: flex; gap: 2rem; font-size: .92rem; color: var(--muted); }
        .nav-links a { transition: color .25s; }
        .nav-links a:hover { color: var(--fg); }
        .nav-cta { padding: .6rem 1.1rem; }
        @media (max-width: 860px) { .nav-links { display: none; } }
      `}</style>
    </header>
  );
}
