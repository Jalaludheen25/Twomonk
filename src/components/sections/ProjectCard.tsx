"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ProjectCover } from "./ProjectCover";
import { Parallax } from "@/components/ui/Parallax";
import type { Project } from "@/data/projects";
import { EASE, DURATION, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Large editorial project card.
 *
 * Deliberately not a small rounded card in a grid: one project per row on
 * desktop, alternating which side the media sits on, so each piece of work
 * gets the space of a magazine spread. The cover scales inside a fixed frame
 * on hover — the frame stays put, so nothing reflows and neighbouring cards
 * don't shift.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: DURATION.slow, ease: EASE.expo }}
      className="group border-t border-line/60 py-10 first:border-t-0 lg:py-14"
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        data-cursor-label="View case"
        className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      >
        {/* Media */}
        <div
          className={cn(
            "relative overflow-hidden rounded-card lg:col-span-7",
            flip && "lg:order-2",
          )}
        >
          {/* The frame is fixed; the art inside drifts on scroll and scales on
              hover. Because both happen inside the clip, nothing reflows and
              neighbouring cards never shift. `scale-110` gives the parallax
              travel somewhere to go without exposing an edge. */}
          <div className="aspect-[16/10] w-full overflow-hidden rounded-card border border-line/70 shadow-[var(--shadow-card)] transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[var(--shadow-card-hover)]">
            <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
              <Parallax distance={54} className="h-full w-full">
                <div className="h-full w-full scale-110">
                  {project.cover ? (
                    <Image
                      src={project.cover}
                      alt={`${project.name} — ${project.industry}`}
                      width={1200}
                      height={750}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  ) : (
                    <ProjectCover
                      slug={project.slug}
                      accent={project.accent}
                      index={index}
                    />
                  )}
                </div>
              </Parallax>
            </div>
          </div>

          {project.isPlaceholder ? (
            <span className="absolute left-4 top-4 rounded-full border border-accent/40 bg-paper/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-accent-text backdrop-blur">
              Placeholder
            </span>
          ) : null}
        </div>

        {/* Detail */}
        <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">
            <span className="text-accent-text">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{project.industry}</span>
            <span aria-hidden>·</span>
            <span>{project.year}</span>
          </div>

          <h3 className="mt-4 font-display text-h3 font-semibold text-ink">
            {project.name}
          </h3>

          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
            {project.summary}
          </p>

          <dl className="mt-6 space-y-3 border-t border-line/60 pt-5 text-[13px]">
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                Services
              </dt>
              <dd className="text-muted">{project.services.join(" · ")}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                Stack
              </dt>
              <dd className="text-muted">{project.technologies.join(" · ")}</dd>
            </div>
          </dl>

          <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text">
            View case study
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
