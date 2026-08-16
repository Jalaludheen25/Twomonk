"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";
import { EASE, DURATION } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Delivery process — the brochure's six steps, given room to breathe.
 *
 * Desktop pins the section and steps through Discover → Optimise as the user
 * scrolls, with a progress spine on the left. Below `lg` it becomes an ordinary
 * numbered list, because pinning six full-height steps on a phone is a long
 * scroll to nowhere.
 */
export function Process() {
  return (
    <section id="process" className="relative border-t border-line/50">
      <PinnedProcess />
      <ListProcess />
    </section>
  );
}

function PinnedProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(
      processSteps.length - 1,
      Math.max(0, Math.floor(p * processSteps.length)),
    );
    setActive((cur) => (cur === next ? cur : next));
  });

  const step = processSteps[active];

  return (
    <div
      ref={ref}
      className="hidden lg:block"
      style={{ height: `${processSteps.length * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="tm-shell">
          <div className="flex items-center justify-between">
            <Eyebrow>How we work</Eyebrow>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">
              From idea to impact
            </span>
          </div>

          <div className="mt-12 grid grid-cols-12 gap-12">
            {/* Spine */}
            <ol className="col-span-5">
              {processSteps.map((s, i) => (
                <li key={s.index} className="relative flex items-center gap-5 py-2.5">
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-[0.16em] transition-colors duration-500",
                      i === active ? "text-accent-text" : "text-muted-2/60",
                    )}
                  >
                    {s.index}
                  </span>
                  <span
                    className={cn(
                      "font-display text-4xl font-semibold leading-none tracking-[-0.03em] transition-colors duration-500 xl:text-5xl",
                      i === active ? "text-ink" : "text-muted-2/40",
                    )}
                  >
                    {s.name}
                  </span>
                  {i === active ? (
                    <motion.span
                      layoutId="process-marker"
                      className="ml-2 block h-px w-16 bg-accent"
                      transition={{ duration: DURATION.base, ease: EASE.expo }}
                    />
                  ) : null}
                </li>
              ))}
            </ol>

            {/* Detail */}
            <div className="col-span-7 border-l border-line/60 pl-12">
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.base, ease: EASE.expo }}
              >
                <p className="font-display text-h3 font-semibold text-ink">
                  {step.summary}
                </p>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
                  {step.detail}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {step.outputs.map((o) => (
                    <li
                      key={o}
                      className="rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <div className="mt-14 h-px w-full bg-paper-line">
            <motion.div
              className="h-px origin-left bg-accent"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ListProcess() {
  return (
    <div className="tm-shell py-24 lg:hidden">
      <Eyebrow>How we work</Eyebrow>
      <h2 className="mt-8 font-display text-h2 font-semibold">
        From idea to <span className="tm-accent">impact</span>.
      </h2>
      <p className="mt-5 text-[15px] text-muted">A simple process. A strong partnership.</p>

      <ol className="mt-12 border-t border-line/60">
        {processSteps.map((s) => (
          <li key={s.index} className="border-b border-line/60 py-7">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tracking-[0.16em] text-accent-text">
                {s.index}
              </span>
              <h3 className="font-display text-[clamp(1.6rem,7vw,2.25rem)] font-semibold leading-none tracking-[-0.03em]">
                {s.name}
              </h3>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.summary}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-2">{s.detail}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.outputs.map((o) => (
                <li
                  key={o}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2"
                >
                  {o}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
