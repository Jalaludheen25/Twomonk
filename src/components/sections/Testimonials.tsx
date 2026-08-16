�"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";
import { testimonials, hasTestimonials } from "@/data/people";
import { EASE, DURATION } from "@/lib/motion";

/**
 * Testimonials.
 *
 * Returns null when there are none. The brief forbids inventing client
 * quotes, and a "what our clients say" heading over fabricated praise is the
 * single most obvious tell of a template site � so the whole section stays out
 * of the page until real, permissioned quotes exist.
 *
 * Add entries to `testimonials` in src/data/people.ts and it appears.
 */
export function Testimonials() {
  const [i, setI] = useState(0);

  if (!hasTestimonials) return null;

  const t = testimonials[i];
  const go = (dir: number) =>
    setI((cur) => (cur + dir + testimonials.length) % testimonials.length);

  return (
    <section className="border-t border-line/50 py-24 sm:py-32">
      <div className="tm-shell">
        <Eyebrow>Clients</Eyebrow>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: DURATION.base, ease: EASE.expo }}
              >
                <p className="font-display text-h3 font-semibold leading-snug text-ink">
                  �S{t.quote}⬝
                </p>
                <footer className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
                  <span className="text-accent-text">{t.author}</span> � {t.role},{" "}
                  {t.company}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 ? (
            <div className="flex items-end gap-3 lg:col-span-3 lg:justify-end">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                data-cursor="hover"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent-text"
              >
                � �
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                data-cursor="hover"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent-text"
              >
                � 
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
