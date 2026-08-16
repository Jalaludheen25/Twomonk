"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite marquee.
 *
 * The content is rendered exactly twice and the track translates -50%, so the
 * loop is seamless without measuring anything at runtime. Animation runs in
 * CSS on the compositor (transform only) rather than through JS, so it costs
 * nothing on the main thread and keeps running smoothly during scroll.
 *
 * The duplicate copy is aria-hidden so screen readers hear the list once.
 * Hovering pauses it; reduced-motion stops it outright (see globals.css).
 */
export function Marquee({
  items,
  duration = 44,
  reverse = false,
  className,
  separator = "✦",
}: {
  items: string[];
  /** Seconds for one full cycle. Longer = slower. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  separator?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="px-5 font-mono text-[12px] uppercase tracking-[0.14em] text-fog sm:px-7 sm:text-[13px]">
            {item}
          </span>
          <span aria-hidden className="text-[10px] text-teal-dim">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  // Mask is set inline rather than through a utility class: it must apply on
  // the same element as `overflow-hidden`, and an inline style is the version
  // guaranteed to survive both vendor prefixing and class ordering.
  const edgeFade =
    "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)";

  return (
    <div
      className={cn("tm-marquee overflow-hidden", className)}
      style={{ WebkitMaskImage: edgeFade, maskImage: edgeFade }}
    >
      <div
        className="tm-marquee__track flex w-max"
        style={
          {
            "--tm-marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
