"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * Per-word headline entrance.
 *
 * Ordinary words rise into place on a tight stagger. One accent word gets a
 * different treatment entirely: it starts oversized, rotated and heavily
 * blurred, then resolves into focus with a glow that decays afterwards. Having
 * one word behave differently from the rest is what turns a headline entrance
 * into a moment — a uniform stagger reads as a transition, this reads as an
 * arrival.
 *
 * Initial state is set in CSS (`.tm-word`), not JS, so the finished type never
 * flashes before the timeline starts.
 */
export function WordReveal({
  text,
  accent,
  className,
  delay = 0.15,
  as: Tag = "span",
}: {
  text: string;
  /** Word (or phrase) that gets the bloom. Matched case-insensitively. */
  accent?: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "span" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const words = root.querySelectorAll<HTMLElement>(".tm-word");
    if (!words.length) return;

    // Reduced motion: reveal immediately, no transforms, no glow.
    if (reduced) {
      gsap.set(words, { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "none" });
      return;
    }

    const plain = root.querySelectorAll(".tm-word:not(.tm-word--accent)");
    const hero = root.querySelectorAll(".tm-word--accent");

    const tl = gsap.timeline({ delay });

    tl.to(plain, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.075,
      ease: "expo.out",
    });

    if (hero.length) {
      tl.to(
        hero,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
          textShadow:
            "0 0 90px rgba(0,159,157,0.55), 0 0 36px rgba(0,159,157,0.40)",
          duration: 1.4,
          ease: "expo.out",
        },
        "-=0.55",
      )
        // Let the glow settle rather than leaving it burning.
        .to(hero, {
          textShadow: "0 0 0px rgba(0,159,157,0), 0 0 0px rgba(0,159,157,0)",
          duration: 2.2,
          ease: "power2.out",
        });
    }

    return () => {
      tl.kill();
    };
  }, [delay, reduced]);

  const accentWords = accent ? accent.toLowerCase().split(" ") : [];

  return (
    <Tag ref={ref as never} className={className}>
      {text.split(" ").map((word, i) => {
        // Compare without trailing punctuation so "move." still matches "move".
        const bare = word.toLowerCase().replace(/[.,!?;:]+$/, "");
        const isAccent = accentWords.includes(bare);
        return (
          <span
            key={`${word}-${i}`}
            className={cn(
              "tm-word mr-[0.22em]",
              isAccent && "tm-word--accent tm-accent",
            )}
          >
            {word}
          </span>
        );
      })}
    </Tag>
  );
}
