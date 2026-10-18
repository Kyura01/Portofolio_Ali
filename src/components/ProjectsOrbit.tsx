"use client";

import Link from "next/link";
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
  { id: "real", label: "Client work" },
  { id: "exploration", label: "Personal & research" },
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
  // hide filter chips for categories that have no projects yet
  const filters = FILTERS.filter((f) => f.id === "all" || projects.some((p) => p.category === f.id));
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
      <div ref={stage} className={`proj-stage ${useOrbit ? "proj-stage-orbit" : ""}`}>
        <header className="proj-head">
          <div>
            <p className="mono">Selected archives</p>
            <h2 className="section-title">/Selected Projects</h2>
          </div>
          <div className="proj-filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
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
            <div className="proj-orbit">
              <OrbitScene items={items} targetRef={target} onActive={setActive} onSelect={jumpTo} onFail={onFail} />
            </div>

            <div className="proj-foot">
              {current && (
                <aside className="proj-info" key={current.id}>
                  <span className="proj-badge mono">
                    Project [{active + 1} / {n}]
                  </span>
                  <h3>{current.title}</h3>
                  <p>{current.description}</p>
                  <div className="proj-actions">
                    <Link href={`/projects/${current.id}`} className="btn btn-primary" data-magnetic>
                      View details ↗
                    </Link>
                    <div className="proj-tags">
                      {current.tags.map((t) => (
                        <span key={t} className="mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              )}

              <div className="proj-progress" aria-hidden>
                <i style={{ transform: `scaleX(${n > 1 ? (active + 1) / n : 1})` }} />
                <span className="mono">
                  0{active + 1} / 0{n}
                </span>
              </div>

              <nav className="proj-jump" aria-label="Jump to project">
                <p className="mono">{n} archives · jump to</p>
                {items.map((p, i) => (
                  <button key={p.id} className={i === active ? "on" : ""} onClick={() => jumpTo(i)}>
                    <span className="mono">0{i + 1}</span> {p.title}
                  </button>
                ))}
              </nav>
            </div>
          </>
        ) : (
          <ProjectsFallback items={items} />
        )}

        {/* text mirror for screen readers / SEO */}
        <ul className="sr-only">
          {items.map((p) => (
            <li key={p.id}>
              <Link href={`/projects/${p.id}`}>{p.title}</Link> ({p.role}, {p.period}): {p.description}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .proj { position: relative; }
        .proj-stage { position: relative; min-height: 100svh; overflow: hidden; padding: 6.5rem 4vw 2rem; }
        .proj-stage-orbit { height: 100svh; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; gap: .5rem; padding-bottom: 1.6rem; }
        .proj-head { position: relative; z-index: 3; display: flex; justify-content: space-between; align-items: flex-end;
          gap: 1rem; flex-wrap: wrap; }
        .proj-filters { display: flex; gap: .3rem; padding: .3rem; border: 1px solid var(--line); border-radius: 999px;
          background: rgba(255,255,255,.03); }
        .proj-filters button { padding: .5rem 1rem; border-radius: 999px; font-size: .85rem; color: var(--muted); transition: .25s; }
        .proj-filters button.on { background: var(--accent); color: #1a1103; font-weight: 600; }
        .proj-orbit { position: relative; min-height: 0; margin-inline: -4vw; }
        .orbit-canvas { position: absolute; inset: 0; z-index: 1; }
        .proj-foot { position: relative; z-index: 3; display: grid; grid-template-columns: minmax(18rem, 27rem) 1fr minmax(14rem, 18rem);
          gap: 1.5rem; align-items: end; }
        .proj-info, .proj-jump { border: 1px solid var(--line); border-radius: 20px; background: rgba(11,13,20,.72);
          backdrop-filter: blur(14px); }
        .proj-info { padding: 1.1rem 1.2rem; display: grid; gap: .5rem; justify-items: start; animation: projIn .55s cubic-bezier(.2,.8,.2,1); }
        .proj-info h3 { font-size: 1.3rem; letter-spacing: -.02em; }
        .proj-info p { color: var(--muted); font-size: .88rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden; }
        .proj-badge { color: var(--accent); border: 1px solid rgba(255,181,71,.4); border-radius: 999px; padding: .2rem .55rem; }
        .proj-actions { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; margin-top: .2rem; }
        .proj-actions .btn { padding: .6rem 1.1rem; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: .35rem; }
        .proj-tags span { border: 1px solid var(--line); border-radius: 6px; padding: .2rem .45rem; }
        .proj-jump { padding: .8rem; display: grid; gap: .1rem; }
        .proj-jump p { margin-bottom: .3rem; }
        .proj-jump button { text-align: left; padding: .35rem .6rem; border-radius: 10px; font-size: .82rem; color: var(--muted);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: .25s; }
        .proj-jump button:hover { color: var(--fg); }
        .proj-jump button.on { background: rgba(255,181,71,.1); color: var(--fg); box-shadow: inset 2px 0 var(--accent); }
        .proj-progress { position: relative; width: min(22rem, 100%); justify-self: center; padding-bottom: .4rem;
          display: grid; gap: .5rem; justify-items: center; }
        .proj-progress i { position: relative; z-index: 1; display: block; width: 100%; height: 3px; border-radius: 3px;
          background: var(--accent); transform-origin: left; transition: transform .5s; box-shadow: var(--glow); }
        .proj-progress::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--line); }
        @keyframes projIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        @media (max-height: 760px) {
          .proj-info p, .proj-tags { display: none; }
          .proj-jump button { padding: .25rem .5rem; }
        }
        @media (max-width: 1100px) {
          .proj-foot { grid-template-columns: minmax(18rem, 27rem) 1fr; }
          .proj-jump { display: none; }
        }
      `}</style>
    </section>
  );
}
