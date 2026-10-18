import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ParticleBackground from "@/components/ParticleBackground";
import { profile, projects } from "@/data/content";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return { title: `${project.title} — ${profile.fullName}`, description: project.description };
}

export default function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  // params is runtime data: read it under Suspense so the page shell can be prerendered
  return (
    <Suspense fallback={null}>
      {params.then(({ id }) => (
        <ProjectDetail id={id} />
      ))}
    </Suspense>
  );
}

function ProjectDetail({ id }: { id: string }) {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const [cover, ...shots] = project.gallery.length ? project.gallery : [project.image];

  return (
    <>
      <ParticleBackground />
      <main className="pd">
        <nav className="pd-nav">
          <Link href="/#project" className="btn" data-magnetic>
            ← All projects
          </Link>
          <span className="mono">
            Project [{index + 1} / {projects.length}]
          </span>
        </nav>

        <header className="pd-head">
          <p className="mono">
            {project.period} · {project.role}
          </p>
          <h1>{project.title}</h1>
          <p className="pd-lead">{project.description}</p>
        </header>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pd-cover" src={cover} alt={`${project.title} preview`} />

        <section className="pd-grid">
          <aside className="pd-meta">
            <div>
              <h2 className="mono">Role</h2>
              <p>{project.role}</p>
            </div>
            <div>
              <h2 className="mono">Client</h2>
              <p>{project.client}</p>
            </div>
            <div>
              <h2 className="mono">Period</h2>
              <p>{project.period}</p>
            </div>
            <div>
              <h2 className="mono">Status</h2>
              <p>{project.status}</p>
            </div>
            <div>
              <h2 className="mono">Stack</h2>
              <ul className="pd-stack">
                {project.stack.map((s) => (
                  <li key={s} className="mono">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="pd-body">
            <h2 className="mono">What I did</h2>
            <ul className="pd-list">
              {project.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </section>

        {shots.length > 0 && (
          <section className="pd-shots">
            <h2 className="mono">Screens</h2>
            <div className="pd-shot-grid">
              {shots.map((s) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={s} src={s} alt={`${project.title} screenshot`} loading="lazy" />
              ))}
            </div>
          </section>
        )}

        <footer className="pd-pager">
          <Link href={`/projects/${prev.id}`} data-magnetic>
            <span className="mono">← Previous</span>
            <strong>{prev.title}</strong>
          </Link>
          <Link href={`/projects/${next.id}`} data-magnetic>
            <span className="mono">Next →</span>
            <strong>{next.title}</strong>
          </Link>
        </footer>
      </main>

      <style>{`
        .pd { position: relative; z-index: 1; min-height: 100svh; padding: 1.4rem 4vw 4rem; }
        .pd-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: clamp(2rem, 6vw, 5rem); }
        .pd-head { display: grid; gap: 1rem; max-width: 64rem; }
        .pd-head h1 { font-size: clamp(2.4rem, 7vw, 6rem); font-weight: 800; letter-spacing: -.04em; line-height: 1; }
        .pd-lead { color: var(--muted); font-size: clamp(1rem, 1.6vw, 1.3rem); line-height: 1.6; max-width: 44rem; }
        .pd-cover { display: block; width: 100%; height: auto; margin: clamp(2rem, 5vw, 4rem) 0; border-radius: 24px;
          border: 1px solid var(--line); background: var(--bg-2); }
        .pd-grid { display: grid; grid-template-columns: minmax(16rem, 22rem) 1fr; gap: clamp(2rem, 6vw, 6rem); align-items: start; }
        .pd-meta { display: grid; gap: 1.6rem; position: sticky; top: 2rem; padding: 1.6rem; border: 1px solid var(--line);
          border-radius: 20px; background: var(--bg-2); }
        .pd-meta p { margin-top: .35rem; line-height: 1.5; }
        .pd-stack { list-style: none; display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .5rem; }
        .pd-stack li { border: 1px solid var(--line); border-radius: 6px; padding: .25rem .55rem; }
        .pd-body h2, .pd-shots h2 { margin-bottom: 1.2rem; color: var(--accent); }
        .pd-list { display: grid; gap: 1.1rem; padding-left: 1.2rem; font-size: clamp(1rem, 1.4vw, 1.15rem); line-height: 1.7; color: #c9cee2; max-width: 46rem; }
        .pd-list li::marker { color: var(--accent); }
        .pd-shots { margin-top: clamp(3rem, 7vw, 6rem); }
        .pd-shot-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 26rem), 1fr)); gap: 1rem; }
        .pd-shot-grid img { width: 100%; height: auto; border-radius: 16px; border: 1px solid var(--line); }
        .pd-pager { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: clamp(3rem, 7vw, 6rem); }
        .pd-pager a { display: grid; gap: .4rem; padding: 1.4rem; border: 1px solid var(--line); border-radius: 20px;
          background: var(--bg-2); transition: border-color .3s, transform .4s; }
        .pd-pager a:last-child { text-align: right; }
        .pd-pager a:hover { border-color: rgba(255,181,71,.5); transform: translateY(-4px); }
        .pd-pager strong { font-size: clamp(1rem, 2vw, 1.4rem); letter-spacing: -.02em; }
        @media (max-width: 860px) {
          .pd-grid { grid-template-columns: 1fr; }
          .pd-meta { position: static; }
          .pd-pager { grid-template-columns: 1fr; }
          .pd-pager a:last-child { text-align: left; }
        }
      `}</style>
    </>
  );
}
