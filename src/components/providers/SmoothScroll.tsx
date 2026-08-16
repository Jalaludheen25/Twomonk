"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Lenis smooth scrolling, driven off GSAP's ticker so ScrollTrigger and Lenis
 * share a single rAF loop. Two loops fighting each other is the usual cause of
 * jittery pinned sections.
 *
 * Disabled entirely under prefers-reduced-motion — hijacking scroll is exactly
 * what that setting asks us not to do.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      // Matches the expo-out curve used across the design system.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [reduced]);

  /*
   * `reducedMotion="user"` makes Motion drop transform and layout animations
   * for users who ask for reduced motion, while still running opacity — the
   * CSS override in globals.css can't reach JS-driven animations, so without
   * this the page would keep sliding things around.
   */
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
