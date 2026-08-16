�"use client";

import { motion } from "motion/react";
import { EASE, DURATION, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Generic scroll reveal � content rises and fades once as it enters view.
 * Under reduced motion the CSS in globals.css collapses the duration, so the
 * content still ends up visible rather than stuck at opacity 0.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: DURATION.base, ease: EASE.expo, delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/**
 * Line-mask headline reveal.
 *
 * Each line sits inside an overflow-hidden block and slides up from below.
 * This is the single highest-value motion technique on the reference sites �
 * it makes type feel physically set rather than faded in.
 *
 * Pass an array of strings; each becomes its own animated line.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  stagger = 0.09,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden", lineClassName)}>
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={viewportOnce}
            transition={{
              duration: DURATION.reveal,
              ease: EASE.expo,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Section eyebrow with a short animated rule beside it. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.span
        className="block h-px bg-accent/60"
        initial={{ width: 0 }}
        whileInView={{ width: 28 }}
        viewport={viewportOnce}
        transition={{ duration: DURATION.base, ease: EASE.expo }}
      />
      <span className="tm-eyebrow">{children}</span>
    </div>
  );
}
