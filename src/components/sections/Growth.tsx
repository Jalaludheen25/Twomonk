"use client";

import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";
import { growthLoop, growthMetrics } from "@/data/process";
import { EASE, DURATION, viewportOnce } from "@/lib/motion";

/**
 * Digital growth.
 *
 * Drawn as a loop rather than a line: Optimise feeds back into Build, which is
 * the actual argument — launch is the start of the work, not the end of it.
 *
 * The metrics row names the *kinds* of number TwoMonk reports against and
 * deliberately carries no figures. Inventing "300% growth" here would be the
 * fastest way to lose a buyer who checks.
 */
export function Growth() {
  return (
    <section id="growth" className="relative border-t border-line/50 py-24 sm:py-32">
      <div className="tm-shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Digital growth</Eyebrow>
            <h2 className="mt-8 font-display text-h2 font-semibold">
              Launch is the <span className="tm-accent">starting line</span>.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-muted md:col-span-5">
            Technology and growth are the same project. We instrument what we build,
            then keep improving it against what the data actually shows.
          </p>
        </div>

        {/* The loop */}
        <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {growthLoop.map((s, i) => (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: DURATION.base, ease: EASE.expo, delay: i * 0.07 }}
              className="tm-card tm-card--interactive rounded-cell p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.16em] text-accent-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-[13px] text-line"
                  title={i === growthLoop.length - 1 ? "back to Build" : undefined}
                >
                  {i === growthLoop.length - 1 ? "↺" : "→"}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                {s.name}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{s.detail}</p>
            </motion.li>
          ))}
        </ol>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
          Optimise feeds back into build — it is a loop, not a line.
        </p>

        {/* What we measure */}
        <div className="mt-16 border-t border-line/60 pt-10">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text">
            What we report on
          </h3>
          <ul className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {growthMetrics.map((m) => (
              <li key={m.label} className="border-t border-line/60 pt-4">
                <p className="font-display text-lg font-semibold text-ink">
                  {m.label}
                </p>
                <p className="mt-1 text-[13px] text-muted-2">{m.unit}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-muted-2">
            Figures are reported per engagement against the baseline agreed in
            Discover. We do not publish blended numbers that cannot be traced back
            to a specific project.
          </p>
        </div>
      </div>
    </section>
  );
}
