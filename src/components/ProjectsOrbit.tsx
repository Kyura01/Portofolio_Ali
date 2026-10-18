"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/content";
import { filterProjects, type ProjectFilter } from "@/lib/filter";
import { scrollBus } from "@/lib/pointer";
import { useReducedMotion } from "@/lib/useReducedMotion";
import OrbitScene from "./OrbitScene";
import ProjectsFallback from "./ProjectsFallback";

gsap.registerPlugin(ScrollTrigger);

const FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "real", label: "Real Project" },
  { id: "exploration", label: "Exploration" },
];

export default function ProjectsOrbit() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const trigger = useRef<ScrollTrigger | null>(null);

  const reduced = useReducedMotion();
  const [narrow, setNarrow] = useState<boolean | null>(null);
  const [noWebGL, setNoWebGL] = useState(false);
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [active, setActive] = useState(0);

  const items = useMemo(() => filterProjects(projects, filter), [filter]);
  const n = items.length;
  const useOrbit = narrow === false && !reduced && !noWebGL;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // pin the stage and map scroll → orbit progress
  useEffect(() => {
    if (!useOrbit || !section.current || !stage.current) return;
    target.current = 0;
    setActive(0);
    if (n < 2) return;

    const st = ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      end: () => `+=${(n - 1) * window.innerHeight * 0.8}`,
      pin: stage.current,
      scrub: true,
      invalidateOnRefresh: true,
      snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
      onUpdate: (self) => {
        target.current = self.progress * (n - 1);
      },
    });
    trigger.current = st;
    return () => {
      st.kill();
      trigger.current = null;
    };
  }, [useOrbit, n]);

  const jumpTo = useCallback(
    (i: number) => {
      const st = trigger.current;
      if (!st || n < 2) return;
      scrollBus.to(st.start + (i / (n - 1)) * (st.end - st.start));
    },
    [n],
  );

  const onFail = useCallback(() => setNoWebGL(true), []);
  const current = items[Math.min(active, n - 1)];

  return (
    <section id="project" ref={section} className="proj">
      <div ref={stage} className="proj-stage">
        <header className="proj-head">
          <div>
            <p className="mono">Selected archives</p>
            <h2 className="section-title">/Selected Projects</h2>
          </div>
          <div className="proj-filters" role="group" aria-label="Filter proyek">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={filter === f.id ? "on" : ""}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                data-magnetic
              >
                {f.label}
              </button>
            ))}
          </div>
        </header>

        {narrow === null ? null : useOrbit ? (
          <>
            <OrbitScene items={items} targetRef={target} onActive={setActive} onSelect={jumpTo} onFail={onFail} />

            {current && (
              <aside className="proj-info" key={current.id}>
                <span className="proj-badge mono">
                  Project [{active + 1} / {n}]
                </span>
                <span className="mono">{current.category === "real" ? "Real project" : "Exploration"}</span>
                <h3>{current.title}</h3>
                <p>{current.description}</p>
                <div className="proj-tags">
                  {current.tags.map((t) => (
                    <span key={t} className="mono">
                      {t}
                    </span>
                  ))}
                </div>
                <a href={current.href} className="btn btn-primary" data-magnetic>
                  View case study ↗
                </a>
              </aside>
            )}

            <nav className="proj-jump" aria-label="Lompat ke proyek">
              <p className="mono">{n} archives · jump to</p>
              {items.map((p, i) => (
                <button key={p.id} className={i === active ? "on" : ""} onClick={() => jumpTo(i)}>
                  <span className="mono">0{i + 1}</span> {p.title}
                </button>
              ))}
            </nav>

            <div className="proj-progress" aria-hidden>
              <i style={{ transform: `scaleX(${n > 1 ? (active + 1) / n : 1})` }} />
              <span className="mono">
                0{active + 1} / 0{n}
              </span>
            </div>
          </>
        ) : (
          <ProjectsFallback items={items} />
        )}

        {/* text mirror for screen readers / SEO */}
        <ul className="sr-only">
          {items.map((p) => (
            <li key={p.id}>
              <a href={p.href}>{p.title}</a>: {p.description}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .proj { position: relative; }
        .proj-stage { position: relative; min-height: 100svh; overflow: hidden; padding: 6.5rem 4vw 2rem; }
        .proj-head { position: relative; z-index: 3; display: flex; justify-content: space-between; align-items: flex-end;
          gap: 1rem; flex-wrap: wrap; }
        .proj-filters { display: flex; gap: .3rem; padding: .3rem; border: 1px solid var(--line); border-radius: 999px;
          background: rgba(255,255,255,.03); }
        .proj-filters button { padding: .5rem 1rem; border-radius: 999px; font-size: .85rem; color: var(--muted); transition: .25s; }
        .proj-filters button.on { background: var(--accent); color: #02130e; font-weight: 600; }
        .orbit-canvas { position: absolute; inset: 0; z-index: 1; }
        .proj-info, .proj-jump { position: absolute; z-index: 3; border: 1px solid var(--line); border-radius: 20px;
          background: rgba(11,13,20,.72); backdrop-filter: blur(14px); }
        .proj-info { left: 4vw; bottom: 3.5rem; width: min(22rem, 28vw); padding: 1.3rem; display: grid; gap: .6rem;
          justify-items: start; animation: projIn .55s cubic-bezier(.2,.8,.2,1); }
        .proj-info h3 { font-size: 1.35rem; letter-spacing: -.02em; }
        .proj-info p { color: var(--muted); font-size: .9rem; line-height: 1.55; }
        .proj-badge { color: var(--accent); border: 1px solid rgba(90,242,200,.4); border-radius: 999px; padding: .25rem .6rem; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: .35rem; }
        .proj-tags span { border: 1px solid var(--line); border-radius: 6px; padding: .2rem .45rem; }
        .proj-jump { right: 4vw; bottom: 3.5rem; width: min(17rem, 22vw); padding: 1rem; display: grid; gap: .2rem; }
        .proj-jump p { margin-bottom: .4rem; }
        .proj-jump button { text-align: left; padding: .5rem .6rem; border-radius: 10px; font-size: .82rem; color: var(--muted);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: .25s; }
        .proj-jump button:hover { color: var(--fg); }
        .proj-jump button.on { background: rgba(90,242,200,.1); color: var(--fg); box-shadow: inset 2px 0 var(--accent); }
        .proj-progress { position: absolute; z-index: 3; left: 50%; bottom: 1.6rem; transform: translateX(-50%); width: min(22rem, 40vw);
          display: grid; gap: .5rem; justify-items: center; }
        .proj-progress i { display: block; width: 100%; height: 3px; border-radius: 3px; background: var(--accent);
          transform-origin: left; transition: transform .5s; box-shadow: var(--glow); }
        .proj-progress::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--line); z-index: -1; }
        @keyframes projIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        @media (max-width: 1100px) { .proj-info { width: 20rem; } .proj-jump { display: none; } }
      `}</style>
    </section>
  );
}
