�"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { CapabilityVisual } from "./CapabilityVisual";
import { Eyebrow } from "@/components/ui/Reveal";
import { capabilities } from "@/data/services";
import { EASE, DURATION } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The full service ecosystem, presented as five capability areas rather than
 * twenty-odd cards. That is the whole point: TwoMonk's portfolio is large, and
 * a flat grid of it would read as clutter instead of range.
 *
 * Desktop gets a pinned, scroll-driven experience � a rail of all five areas
 * on the left so the breadth is visible at a glance, the active area's detail
 * in the middle, and a generative visual on the right that changes with it.
 *
 * Below `lg` the section unpins entirely and becomes a stacked, tappable list.
 * Pinned scroll-jacking on a phone is hostile; this is designed for mobile
 * rather than scaled down to it. The two layouts are swapped with CSS, not JS,
 * so there is no hydration flash.
 */
export function ServiceEcosystem() {
  return (
    <section id="services" className="relative border-t border-line/50">
      <PinnedEcosystem />
      <StackedEcosystem />
    </section>
  );
}

/* ------------------------------------------------------------------ desktop */

function PinnedEcosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(
      capabilities.length - 1,
      Math.max(0, Math.floor(p * capabilities.length)),
    );
    setActive((cur) => (cur === next ? cur : next));
  });

  const cap = capabilities[active];

  return (
    <div
      ref={ref}
      className="hidden lg:block"
      style={{ height: `${capabilities.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="tm-shell">
          <div className="flex items-center justify-between">
            <Eyebrow>Service ecosystem</Eyebrow>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">
              {cap.index} / {String(capabilities.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-10 grid grid-cols-12 gap-8 xl:gap-12">
            {/* Rail � the whole ecosystem stays visible */}
            <nav aria-label="Capability areas" className="col-span-3">
              <ul className="space-y-1">
                {capabilities.map((c, i) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => scrollToIndex(ref, i)}
                      data-cursor="hover"
                      aria-current={i === active ? "true" : undefined}
                      className="group flex w-full items-baseline gap-3 py-1.5 text-left"
                    >
                      <span
                        className={cn(
                          "font-mono text-[10px] tracking-[0.16em] transition-colors duration-500",
                          i === active ? "text-accent-text" : "text-muted-2",
                        )}
                      >
                        {c.index}
                      </span>
                      <span
                        className={cn(
                          "font-display text-3xl font-semibold leading-none tracking-[-0.03em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:text-4xl",
                          i === active
                            ? "text-ink"
                            : "text-muted-2/50 group-hover:text-muted",
                        )}
                      >
                        {c.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Progress rail */}
              <div className="mt-8 h-px w-full bg-paper-line">
                <motion.div
                  className="h-px origin-left bg-accent"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </nav>

            {/* Detail */}
            <div className="col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: DURATION.fast, ease: EASE.expo }}
                >
                  <h2 className="font-display text-h3 font-semibold text-ink">
                    {cap.headline}
                  </h2>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                    {cap.description}
                  </p>

                  <dl className="mt-8 space-y-4 border-t border-line/60 pt-6">
                    {cap.groups.map((g) => (
                      <div key={g.name} className="grid grid-cols-12 gap-3">
                        <dt className="col-span-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-accent-text/80">
                          {g.name}
                        </dt>
                        <dd className="col-span-8 text-[13px] leading-relaxed text-muted-2">
                          {g.services.map((s) => s.name).join(" · ")}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    href={`/services#${cap.id}`}
                    data-cursor="hover"
                    className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text underline-offset-4 hover:underline"
                  >
                    All {cap.name} services � 
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual */}
            <div className="col-span-4 flex items-center justify-center">
              <div className="aspect-square w-full max-w-[360px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: DURATION.base, ease: EASE.expo }}
                    className="h-full w-full"
                  >
                    <CapabilityVisual id={cap.id} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Jump the page to the scroll offset that activates a given capability. */
function scrollToIndex(ref: React.RefObject<HTMLDivElement | null>, i: number) {
  const el = ref.current;
  if (!el) return;
  const start = el.offsetTop;
  const span = el.offsetHeight - window.innerHeight;
  // Aim at the middle of the target segment so it lands solidly on that index.
  const target = start + (span * (i + 0.5)) / capabilities.length;
  window.scrollTo({ top: target, behavior: "smooth" });
}

/* ------------------------------------------------------------------- mobile */

function StackedEcosystem() {
  const [open, setOpen] = useState<string | null>(capabilities[0].id);

  return (
    <div className="tm-shell py-24 lg:hidden">
      <Eyebrow>Service ecosystem</Eyebrow>
      <h2 className="mt-8 font-display text-h2 font-semibold">
        Five ways we <span className="tm-accent">work</span>.
      </h2>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
        A connected portfolio spanning software, design, intelligence, growth and
        infrastructure.
      </p>

      <ul className="mt-12 border-t border-line/60">
        {capabilities.map((c) => {
          const isOpen = open === c.id;
          return (
            <li key={c.id} className="border-b border-line/60">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : c.id)}
                  aria-expanded={isOpen}
                  aria-controls={`cap-${c.id}`}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-accent-text">
                      {c.index}
                    </span>
                    <span className="font-display text-[clamp(1.75rem,8vw,2.5rem)] font-semibold leading-none tracking-[-0.03em]">
                      {c.name}
                    </span>
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
              </h3>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`cap-${c.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE.expo }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8">
                      <p className="text-[15px] leading-relaxed text-muted">
                        {c.headline}
                      </p>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted-2">
                        {c.description}
                      </p>

                      <div className="mx-auto my-7 aspect-square w-full max-w-[220px]">
                        <CapabilityVisual id={c.id} />
                      </div>

                      <dl className="space-y-4">
                        {c.groups.map((g) => (
                          <div key={g.name}>
                            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text/80">
                              {g.name}
                            </dt>
                            <dd className="mt-1.5 text-[13px] leading-relaxed text-muted-2">
                              {g.services.map((s) => s.name).join(" · ")}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <Link
                        href={`/services#${c.id}`}
                        className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text underline-offset-4 hover:underline"
                      >
                        All {c.name} services � 
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
