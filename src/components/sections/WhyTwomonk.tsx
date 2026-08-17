"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";
import { pillars } from "@/data/process";
import { EASE, DURATION, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Why TwoMonk — asymmetric bento grid.
 *
 * Partnership anchors the grid as the large cell: it's the pillar that
 * actually differentiates ("we sit alongside the business"), and the mark
 * itself — two figures standing together — is that claim made visual. The
 * other four pillars (Strategy, Design, Technology, Growth) sit around it as
 * even cells, tracing the IDEA → STRATEGY → DESIGN → TECHNOLOGY → GROWTH
 * sequence the rest of the site is built on.
 *
 * Qualitative only — no invented figures, awards or client counts.
 */
export function WhyTwomonk() {
  const partnership = pillars.find((p) => p.name === "Partnership") ?? pillars[4];
  const rest = pillars.filter((p) => p.name !== "Partnership");

  return (
    <section className="relative border-t border-line/50 py-24 sm:py-32">
      <div className="tm-shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Why TwoMonk</Eyebrow>
            <h2 className="mt-8 font-display text-h2 font-semibold">
              A partner, not a <span className="tm-accent">vendor</span>.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-muted md:col-span-5">
            The mark is two figures standing together. That is the working model:
            we sit alongside the business rather than taking a brief over a wall.
          </p>
        </div>

        <div className="tm-bento mt-14">
          {/* Hero cell — Partnership, dark, anchors the grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: DURATION.base, ease: EASE.expo }}
            className="tm-bento__hero relative flex flex-col justify-between overflow-hidden rounded-cell bg-ink p-7 text-paper sm:p-9"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-[70px]"
              style={{
                background: "radial-gradient(circle, rgba(0,159,157,0.9) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <span className="font-mono text-[10px] tracking-[0.16em] text-accent-hot">
                {partnership.index} — {partnership.name}
              </span>
              <p className="mt-5 max-w-sm font-display text-h3 font-semibold leading-[1.1] text-paper">
                {partnership.claim}
              </p>
            </div>
            <div className="relative mt-8 flex items-end justify-between gap-6">
              <p className="max-w-xs text-[14px] leading-relaxed text-paper/70">
                {partnership.detail}
              </p>
              <Link
                href="/contact"
                data-cursor="hover"
                className="group flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-hot"
              >
                Talk to us
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Four even cells */}
          {rest.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: DURATION.base,
                ease: EASE.expo,
                delay: 0.06 + i * 0.05,
              }}
              className={cn(
                "tm-card tm-card--interactive group flex flex-col justify-between rounded-cell p-6",
              )}
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-accent-text">
                {p.index}
              </span>
              <div className="mt-4">
                <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-accent-text sm:text-2xl">
                  {p.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.claim}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
