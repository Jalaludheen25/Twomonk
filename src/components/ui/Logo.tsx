import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Brand marks.
 *
 * These use the official artwork rather than a re-drawn approximation — the
 * mark is two monk figures (navy + teal) standing side by side, and that
 * "partner beside you" reading is the core of the identity. Files live in
 * /public/logos and were cropped from the supplied master PNGs.
 */

/** Compact two-figure mark. Used in the nav and anywhere space is tight. */
export function LogoMark({
  className,
  size = 32,
  variant = "white",
}: {
  className?: string;
  size?: number;
  variant?: "white" | "colour" | "black";
}) {
  // Mark artwork is 1648 × 2053 → aspect 0.803
  const width = Math.round(size * 0.803);
  return (
    <Image
      src={`/logos/twomonk-mark-${variant}.png`}
      alt=""
      width={width}
      height={size}
      priority
      className={className}
    />
  );
}

/** Full lockup: mark + wordmark. Used in the footer and the mobile menu. */
export function LogoLockup({
  className,
  height = 56,
  variant = "white",
}: {
  className?: string;
  height?: number;
  variant?: "white" | "colour" | "black";
}) {
  // Full lockup is 3928 × 2053 → aspect 1.913
  const width = Math.round(height * 1.913);
  return (
    <Image
      src={`/logos/twomonk-${variant}.png`}
      alt={site.name}
      width={width}
      height={height}
      className={className}
    />
  );
}

/** Clickable home link wrapping the compact mark plus the name. */
export function LogoLink({
  className,
  markSize = 30,
}: {
  className?: string;
  markSize?: number;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      data-cursor="hover"
      className={cn("group flex items-center gap-3", className)}
    >
      <LogoMark
        size={markSize}
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
      />
      <span className="font-display text-[15px] font-semibold leading-none tracking-[-0.02em] text-ink">
        {site.shortName}
        <span className="text-accent-text">.</span>
      </span>
    </Link>
  );
}
