"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/**
 * Brand statement.
 *
 * The sentence fills in word by word as the section crosses the viewport —
 * scroll position drives opacity directly rather than a one-shot animation, so
 * reading pace and scroll pace are the same thing. Dim words stay legible
 * (not invisible), which keeps the sentence readable at any scroll position
 * and means screen readers and no-JS users get the full text regardless.
 */

const STATEMENT =
  "We build digital systems that turn ambitious ideas into measurable business outcomes.";

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = STATEMENT.split(" ");

  return (
    <section id="statement" className="relative border-t border-ink-line/50">
      <div ref={ref} className="tm-shell py-28 sm:py-40 lg:py-48">
        <Eyebrow>What we do</Eyebrow>

        <p className="mt-10 font-display text-h2 font-semibold leading-[1.06] tracking-[-0.03em]">
          {words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1.6) / words.length]}
            >
              {word}
            </Word>
          ))}
        </p>

        <div className="mt-14 grid gap-10 border-t border-ink-line/50 pt-10 md:grid-cols-12">
          <p className="text-[15px] leading-relaxed text-fog md:col-span-5">
            {site.positioning}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim md:col-span-7 md:justify-end">
            {site.themes.map((t) => (
              <li key={t} className="flex items-center gap-6">
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
