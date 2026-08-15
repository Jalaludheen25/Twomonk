"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { HeroVisual } from "./HeroVisual";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { EASE, DURATION } from "@/lib/motion";

/**
 * Cinematic hero.
 *
 * Structure, from the top: a small locator rail, the headline set as
 * mask-revealed lines at editorial scale, the supporting line and actions, and
 * a bottom rail carrying the IDEA → GROWTH sequence that the whole site is
 * organised around.
 *
 * The headline lands one line at a time on an expo-out curve. The 3D form sits
 * behind it, masked so it never fights the type for legibility.
 */

const PIPELINE = ["Idea", "Strategy", "Design", "Technology", "Growth"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content drifts up and dissolves as the next section arrives.
  const y = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="tm-grain relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-28 sm:pb-10 sm:pt-32"
    >
      <HeroVisual />
      <div className="tm-grain-layer" aria-hidden />

      <motion.div style={{ y, opacity }} className="tm-shell relative flex flex-1 flex-col">
        {/* Locator rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE.expo, delay: 0.15 }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim"
        >
          <span>{site.contact.locations.join(" · ")}</span>
          <span className="hidden sm:block">{site.tagline}</span>
        </motion.div>

        {/* Headline — capped so it never runs under the visual on the right */}
        <div className="flex flex-1 flex-col justify-center py-10 sm:py-14">
          <h1 className="tm-optical-display max-w-[16ch] font-display text-display font-semibold text-paper lg:max-w-[13ch]">
            <Line delay={0.3}>
              Ideas that <span className="tm-accent">move</span>.
            </Line>
            <Line delay={0.42}>Technology that delivers.</Line>
          </h1>

          <div className="mt-9 grid gap-8 sm:mt-12 md:grid-cols-12 md:items-end">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, ease: EASE.expo, delay: 0.72 }}
              className="max-w-md text-lead text-fog md:col-span-6 lg:col-span-5"
            >
              We design, build and grow digital experiences, products and technology
              solutions for ambitious businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, ease: EASE.expo, delay: 0.84 }}
              className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7"
            >
              <Button href="/contact">Start a Project</Button>
              <Button href="/work" variant="outline">
                Explore Our Work
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom rail — the sequence the whole site is built around */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.slow, ease: EASE.expo, delay: 1 }}
        className="tm-shell relative"
      >
        <div className="flex flex-col gap-4 border-t border-ink-line/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.16em]">
            {PIPELINE.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className={i === 0 ? "text-teal-bright" : "text-fog-dim"}>
                  {step}
                </span>
                {i < PIPELINE.length - 1 ? (
                  <span aria-hidden className="text-ink-line">
                    /
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <a
            href="#statement"
            data-cursor="hover"
            className="group flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim transition-colors hover:text-teal-bright"
          >
            Scroll
            <ArrowDown
              className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-1"
              strokeWidth={2}
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/** One mask-revealed headline line. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.25, ease: EASE.expo, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
