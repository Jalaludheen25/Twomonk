�"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eyebrow } from "@/components/ui/Reveal";
import { faqs } from "@/data/insights";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * FAQs � an accessible disclosure list.
 *
 * Uses real buttons with aria-expanded/aria-controls rather than a
 * details/summary hack, so the open state is announced and the height
 * animation stays smooth.
 */
export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative border-t border-line/50 py-24 sm:py-32">
      <div className="tm-shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-8 font-display text-h2 font-semibold">
            Before you <span className="tm-accent">ask</span>.
          </h2>
        </div>

        <dl className="border-t border-line/60 lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.question} className="border-b border-line/60">
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    data-cursor="hover"
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-semibold text-ink sm:text-xl">
                      {f.question}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative block h-3 w-3 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen && "rotate-45",
                      )}
                    >
                      <span className="absolute left-1/2 top-0 block h-3 w-px -translate-x-1/2 bg-accent" />
                      <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 bg-accent" />
                    </span>
                  </button>
                </dt>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.dd
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE.expo }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-muted">
                        {f.answer}
                      </p>
                    </motion.dd>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
