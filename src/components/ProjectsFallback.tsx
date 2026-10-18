"use client";

import type { Project } from "@/data/content";

/** 2D swipeable carousel used on mobile, with reduced motion, or when WebGL is unavailable. */
export default function ProjectsFallback({ items }: { items: Project[] }) {
  return (
    <div className="pf-track">
      {items.map((p, i) => (
        <a key={p.id} href={p.href} className="pf-card">
          <div className="pf-img" style={{ backgroundImage: `url(${p.image})` }} />
          <div className="pf-body">
            <span className="mono">
              0{i + 1} · {p.category === "real" ? "Real project" : "Exploration"}
            </span>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="pf-tags">
              {p.tags.map((t) => (
                <span key={t} className="mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
      <style>{`
        .pf-track { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; padding: 1rem 4vw 2rem;
          scrollbar-width: thin; scrollbar-color: var(--accent) transparent; }
        .pf-track::-webkit-scrollbar { height: 6px; background: transparent; }
        .pf-track::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 6px; }
        .pf-card { flex: 0 0 min(82vw, 380px); scroll-snap-align: center; border: 1px solid var(--line);
          border-radius: 20px; overflow: hidden; background: var(--bg-2); }
        .pf-img { aspect-ratio: 16/10; background-size: cover; background-position: center; }
        .pf-body { padding: 1.1rem; display: grid; gap: .5rem; }
        .pf-body h3 { font-size: 1.2rem; }
        .pf-body p { color: var(--muted); font-size: .9rem; line-height: 1.5; }
        .pf-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .3rem; }
        .pf-tags span { border: 1px solid var(--line); border-radius: 6px; padding: .2rem .45rem; }
      `}</style>
    </div>
  );
}
