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
  // Paper ground, so the full-colour navy + teal artwork is the default.
  variant = "colour",
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

/**
 * Letter-style wordmark — the rounded three-line "two / monk / Innovations"
 * logotype. Sized deliberately taller than a typical nav logo: at compact
 * header height the "Innovations" line shrinks to an illegible sliver, so
 * this needs real height to keep all three lines readable. See
 * `scripts/crop-letter-logo.mjs` for the trimmed source; a two-line variant
 * (`twomonk-logo-letter-2line.png`, drops "Innovations") also exists if a
 * more compact mark is ever needed somewhere space-constrained.
 */
export function LogoWordmarkLetter({
  className,
  height = 48,
}: {
  className?: string;
  height?: number;
}) {
  // Full crop is 2071 × 1350 → aspect 1.534
  const width = Math.round(height * 1.534);
  return (
    <Image
      src="/logos/twomonk-logo-letter-full.png"
      alt={site.name}
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}

/** Full lockup: mark + wordmark. Used in the footer and the mobile menu. */
export function LogoLockup({
  className,
  height = 56,
  // Paper ground, so the full-colour navy + teal artwork is the default.
  variant = "colour",
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

/** Clickable home link wrapping the compact mark plus the wordmark. */
export function LogoLink({
  className,
  markSize = 42,
  wordmarkHeight = 48,
}: {
  className?: string;
  markSize?: number;
  wordmarkHeight?: number;
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
      <LogoWordmarkLetter
        height={wordmarkHeight}
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
