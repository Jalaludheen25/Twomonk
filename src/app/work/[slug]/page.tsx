import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/sections/ProjectCover";
import { Cta } from "@/components/sections/Cta";
import { Reveal, Eyebrow } from "@/components/ui/Reveal";
import { projects, getProject } from "@/data/projects";
import { site } from "@/data/site";

/**
 * Case study template.
 *
 * Statically generated for every entry in `src/data/projects.ts` — adding a
 * project to that file is all it takes to publish a new case study; there is
 * nothing to wire up here.
 */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case study" };

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${site.name}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* Hero */}
      <section className="tm-shell pb-12 pt-36 sm:pt-44">
        <Link
          href="/work"
          data-cursor="hover"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim transition-colors hover:text-teal-bright"
        >
          ← All work
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {project.isPlaceholder ? (
              <span className="mb-5 inline-block rounded-full border border-teal-bright/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-teal-bright">
                Placeholder case study
              </span>
            ) : null}
            <h1 className="tm-optical-display font-display text-h1 font-semibold">
              {project.name}
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[15px] leading-relaxed text-fog">{project.summary}</p>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="tm-shell">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-card border border-ink-line/70">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={`${project.name} — ${project.industry}`}
              width={1920}
              height={1080}
              priority
              className="h-full w-full object-cover"
              sizes="100vw"
            />
          ) : (
            <ProjectCover
              slug={project.slug}
              accent={project.accent}
              index={index}
            />
          )}
        </div>
      </section>

      {/* Facts */}
      <section className="tm-shell py-16">
        <dl className="grid gap-8 border-y border-ink-line/60 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Industry" value={project.industry} />
          <Fact label="Year" value={project.year} />
          <Fact label="Services" value={project.services.join(" · ")} />
          <Fact label="Technology" value={project.technologies.join(" · ")} />
        </dl>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Overview</Eyebrow>
          </div>
          <p className="text-lead leading-relaxed text-fog lg:col-span-8">
            {project.caseStudy.overview}
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="tm-shell pb-16">
        {project.caseStudy.sections.map((s) => (
          <Reveal key={s.heading}>
            <div className="grid gap-8 border-t border-ink-line/60 py-12 lg:grid-cols-12">
              <h2 className="font-display text-h3 font-semibold lg:col-span-4">
                {s.heading}
              </h2>
              <div className="lg:col-span-8">
                <p className="max-w-2xl text-[16px] leading-relaxed text-fog">
                  {s.body}
                </p>
                {s.points ? (
                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 text-[15px] leading-relaxed text-fog-dim"
                      >
                        <span aria-hidden className="text-teal-bright">
                          —
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}

        {/* Outcome */}
        <div className="grid gap-8 border-t border-ink-line/60 py-12 lg:grid-cols-12">
          <h2 className="font-display text-h3 font-semibold lg:col-span-4">Outcome</h2>
          <div className="lg:col-span-8">
            <p className="text-lead leading-relaxed text-paper">{project.outcome}</p>
            <ul className="mt-7 space-y-3">
              {project.caseStudy.results.map((r) => (
                <li
                  key={r}
                  className="flex gap-3 border-t border-ink-line/60 pt-3 text-[15px] text-fog"
                >
                  <span aria-hidden className="text-teal-bright">
                    →
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Next project */}
      {next.slug !== project.slug ? (
        <section className="tm-shell border-t border-ink-line/50 py-14">
          <Link
            href={`/work/${next.slug}`}
            data-cursor="view"
            data-cursor-label="Next"
            className="group flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">
                Next project
              </span>
              <span className="mt-3 block font-display text-h3 font-semibold transition-colors group-hover:text-teal-bright">
                {next.name}
              </span>
            </span>
            <span
              aria-hidden
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal-bright transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </section>
      ) : null}

      <Cta />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog-dim">
        {label}
      </dt>
      <dd className="mt-2.5 text-[15px] leading-relaxed text-paper">{value}</dd>
    </div>
  );
}
