import type { Transition, Variants } from "motion/react";

/**
 * Shared motion language.
 *
 * The easing curves are the same ones used by reference-grade agency sites:
 * an expo-out for reveals (fast start, long settle), a symmetric in-out for
 * state changes, and a slight overshoot for magnetic/pop interactions.
 * Using three curves everywhere is what makes motion feel authored rather
 * than assembled.
 */

export const EASE = {
  expo: [0.16, 1, 0.3, 1],
  swift: [0.6, 0, 0.2, 1],
  inout: [0.65, 0, 0.35, 1],
  back: [0.34, 1.56, 0.64, 1],
} as const;

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  reveal: 1.1,
} as const;

export const revealTransition: Transition = {
  duration: DURATION.reveal,
  ease: EASE.expo,
};

/** Standard "rise into place" used by most section content. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.expo },
  },
};

/** Parent that staggers its children. */
export function staggerVariants(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/**
 * Per-line mask reveal. The child slides up from behind an overflow-hidden
 * parent, which reads far more expensive than a plain fade.
 */
export const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.reveal, ease: EASE.expo },
  },
};

/** Viewport config shared by scroll reveals — fires once, slightly early. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
