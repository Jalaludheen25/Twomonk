"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useHasFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Magnetic wrapper — the child drifts toward the pointer while it's inside a
 * padded hit area, then springs back on leave.
 *
 * Wraps rather than styles, so it composes with buttons, links and icons.
 * No-ops on touch and under reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  /** 0–1; how far the element follows the pointer. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

  function onMove(e: React.PointerEvent) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={active ? { x: springX, y: springY } : undefined}
      className={className}
    >
      {children}
    </motion.span>
  );
}
