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
 * Letter-style wordmark — the rounded two-line "two / monk" logotype, cropped
 * from the supplied master (which also carries a third "Innovations" line at
 * full size). The crop drops that third line: at compact header height a
 * third line would shrink to an illegible sliver, so the two-line crop is
 * what actually reads at nav scale. See `scripts/crop-letter-logo.mjs` if the
 * source master ever needs re-cropping.
 */
export function LogoWordmarkLetter({
  className,
  height = 34,
}: {
  className?: string;
  height?: number;
}) {
  // Crop is 2071 × 1004 → aspect 2.063
  const width = Math.round(height * 2.063);
  return (
    <Image
      src="/logos/twomonk-logo-letter-2line.png"
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
  markSize = 30,
  wordmarkHeight = 34,
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
