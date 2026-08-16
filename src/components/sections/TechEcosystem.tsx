"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Marquee } from "./Marquee";
import { Eyebrow, Reveal } from "@/components/ui/Reveal";
import { techCategories, techMarquee } from "@/data/technologies";
import { EASE, DURATION } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Technology ecosystem.
 *
 * Two layers: a pair of counter-scrolling marquees for the overall impression
 * of breadth, and a filterable grid underneath for anyone who actually wants
 * to check the stack. Technical buyers do check, so the detail is a real list
 * rather than a wall of vendor logos.
 *
 * Entirely data-driven from `src/data/technologies.ts`.
 */
export function TechEcosystem() {
  const [active, setActive] = useState<string>("all");

  const shown =
    active === "all"
      ? techCategories
      : techCategories.filter((c) => c.id === active);

  // Split the flat list in two so the counter-scrolling rows differ.
  const mid = Math.ceil(techMarquee.length / 2);

  return (
    <section id="technology" className="relative border-t border-line/50 py-24 sm:py-32">
      <div className="tm-shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Technology</Eyebrow>
            <h2 className="mt-8 font-display text-h2 font-semibold">
              The stack behind the <span className="tm-accent">work</span>.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-muted md:col-span-5">
            Platform choices are made per project, against what the system has to do
            and who has to maintain it â€” not against fashion.
          </p>
        </div>
      </div>

      <div className="mt-14 space-y-3 border-y border-line/50 py-6">
        <Marquee items={techMarquee.slice(0, mid)} duration={52} />
        <Marquee items={techMarquee.slice(mid)} duration={62} reverse />
      </div>

      <div className="tm-shell mt-14">
        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          {techCategories.map((c) => (
            <FilterChip
              key={c.id}
              label={c.name}
              active={active === c.id}
              onClick={() => setActive(c.id)}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.04}>
              <div className="border-t border-line/60 pt-5">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text">
                  {cat.name}
                </h3>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="text-[15px] text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-cursor="hover"
      className={cn(
        "relative rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300",
        active
          ? "border-accent text-ink"
          : "border-line text-muted hover:border-fog-dim hover:text-ink",
      )}
    >
      {active ? (
        <motion.span
          layoutId="tech-filter-pill"
          className="absolute inset-0 rounded-full bg-accent"
          transition={{ duration: DURATION.fast, ease: EASE.expo }}
        />
      ) : null}
      <span className="relative">{label}</span>
    </button>
  );
}
