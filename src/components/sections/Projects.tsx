import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { Eyebrow } from "@/components/ui/Reveal";
import { projects, PROJECTS_ARE_PLACEHOLDER } from "@/data/projects";

/**
 * Selected work.
 *
 * Proof beats promises, so this sits high on the page — but only real work
 * earns that. While the entries are placeholders a build notice is rendered in
 * development so nobody ships them by accident. The notice is stripped from
 * production bundles by the NODE_ENV check.
 */
export function Projects({ limit }: { limit?: number }) {
  const shown = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="work" className="relative border-t border-line/50 py-24 sm:py-32">
      <div className="tm-shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-8 font-display text-h2 font-semibold">
              Proof over <span className="tm-accent">promises</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Link
              href="/work"
              data-cursor="hover"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text underline-offset-4 hover:underline"
            >
              All work → 
            </Link>
          </div>
        </div>

        {PROJECTS_ARE_PLACEHOLDER && process.env.NODE_ENV !== "production" ? (
          <p className="mt-10 rounded-card border border-accent/30 bg-accent/[0.06] px-5 py-4 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-accent-text">
            BUILD NOTICE (development only): every project below is placeholder
            content. Replace the entries in <code>src/data/projects.ts</code> with
            real work and set <code>isPlaceholder: false</code> before launch.
          </p>
        ) : null}

        <div className="mt-14">
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
