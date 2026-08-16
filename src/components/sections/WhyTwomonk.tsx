"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";
import { pillars } from "@/data/process";
import { EASE, DURATION, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Why TwoMonk.
 *
 * A hoverable list rather than a card grid: the active row expands to show its
 * detail while the others stay as headlines, so all five pillars are readable
 * at once and the section stays a single confident block.
 *
 * Qualitative only — no invented figures, awards or client counts.
 */
export function WhyTwomonk() {
  const [active, setActive] = useState(0);

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

        <ul className="mt-14 border-t border-line/60">
          {pillars.map((p, i) => {
            const isActive = i === active;
            return (
              <motion.li
                key={p.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: DURATION.base, ease: EASE.expo, delay: i * 0.05 }}
                className="border-b border-line/60"
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className="grid w-full grid-cols-12 items-start gap-4 py-7 text-left"
                >
                  <span className="col-span-2 font-mono text-[10px] tracking-[0.16em] text-accent-text sm:col-span-1">
                    {p.index}
                  </span>

                  <span className="col-span-10 sm:col-span-4">
                    <span
                      className={cn(
                        "block font-display text-[clamp(1.5rem,3.4vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] transition-colors duration-500",
                        isActive ? "text-ink" : "text-muted-2/60",
                      )}
                    >
                      {p.name}
                    </span>
                  </span>

                  <span className="col-span-12 sm:col-span-7">
                    <span className="block text-[15px] leading-relaxed text-muted">
                      {p.claim}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.45, ease: EASE.expo }}
                      className="block overflow-hidden"
                    >
                      <span className="mt-2.5 block text-[14px] leading-relaxed text-muted-2">
                        {p.detail}
                      </span>
                    </motion.span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
