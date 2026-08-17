"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked parallax.
 *
 * The benchmark reference pins almost nothing — it ties motion continuously to
 * scroll position instead (`scrub: 0.8`–`1.2`). That is what makes its pages
 * feel alive while scrolling rather than only at the moment a section enters
 * view, and it is cheaper than pinning because nothing leaves normal flow.
 *
 * The spring stands in for GSAP's `scrub`: it lags the raw scroll value
 * slightly so movement has weight instead of tracking the wheel 1:1.
 *
 * Transform-only, so it never triggers layout. Off entirely under
 * prefers-reduced-motion.
 */
export function Parallax({
  children,
  /** Total travel in pixels across the element's full pass through the viewport. */
  distance = 60,
  className,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reduced ? undefined : { y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
