"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Shared interior-page hero.
 *
 * Deliberately quieter than the home hero â€” no WebGL, no full viewport. Inner
 * pages are read, not marvelled at, and repeating the 3D on every route would
 * cost load time while diluting the one place it earns its keep.
 *
 * `accentWord` is matched against the last line and set in the serif italic,
 * carrying the brochure's own emphasis device onto every page.
 */
export function PageHero({
  eyebrow,
  lines,
  accentWord,
  intro,
}: {
  eyebrow: string;
  lines: string[];
  accentWord?: string;
  intro?: string;
}) {
  return (
    <section className="tm-grain relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="tm-grain-layer" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[30rem] w-[30rem] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,159,157,0.35) 0%, rgba(0,44,84,0.2) 50%, transparent 72%)",
        }}
      />

      <div className="tm-shell relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE.expo }}
        >
          <span className="tm-eyebrow">{eyebrow}</span>
        </motion.div>

        <h1 className="tm-optical-display mt-8 max-w-[15ch] font-display text-h1 font-semibold">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block will-change-transform"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: EASE.expo, delay: 0.12 + i * 0.09 }}
              >
                {accentWord && line.includes(accentWord) ? (
                  <>
                    {line.split(accentWord)[0]}
                    <span className="tm-accent">{accentWord}</span>
                    {line.split(accentWord)[1]}
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {intro ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE.expo, delay: 0.4 }}
            className="mt-8 max-w-xl text-lead text-muted"
          >
            {intro}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
