"use client";

import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";
import { intelligenceCapabilities, intelligenceIntro } from "@/data/intelligence";
import { EASE, DURATION, viewportOnce } from "@/lib/motion";

/**
 * AI / Automation.
 *
 * Framed around removing real work rather than around the technology, because
 * "we do AI" is worth nothing to a buyer and "your team stops re-typing orders"
 * is worth a meeting. Each capability carries a plain-language example for
 * exactly that reason.
 */
export function Intelligence() {
  return (
    <section
      id="intelligence"
      className="tm-grain relative overflow-hidden border-t border-ink-line/50 bg-ink-raised/40 py-24 sm:py-32"
    >
      <div className="tm-grain-layer" aria-hidden />

      {/* Ambient field, tinted to the brand teal */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,159,157,0.42) 0%, transparent 68%)",
        }}
      />

      <div className="tm-shell relative">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Intelligence &amp; automation</Eyebrow>
            <h2 className="mt-8 font-display text-h2 font-semibold">
              Make your business <span className="tm-accent">smarter</span>.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-fog md:col-span-5">
            {intelligenceIntro}
          </p>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-card bg-ink-line/60 sm:grid-cols-2 lg:grid-cols-3">
          {intelligenceCapabilities.map((c, i) => (
            <motion.li
              key={c.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: DURATION.base, ease: EASE.expo, delay: i * 0.05 }}
              className="group relative bg-ink p-7 transition-colors duration-500 hover:bg-ink-raised"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-teal-bright">
                {c.index}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-paper">
                {c.name}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-fog">
                {c.description}
              </p>
              <p className="mt-4 border-t border-ink-line/70 pt-4 text-[13px] leading-relaxed text-fog-dim">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-dim">
                  Example
                </span>
                <br />
                {c.example}
              </p>

              {/* Bottom rule that draws in on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-teal-bright transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </motion.li>
          ))}
        </ul>

      </div>
    </section>
  );
}
