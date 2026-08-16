"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

/**
 * Blob button.
 *
 * A dot parked in the button's left padding expands to flood the whole pill on
 * hover while the label inverts against it. The asymmetric padding (`pl-14`
 * against `pr-9`) is what makes room for the resting dot — and it's why the
 * label reads as centred once the blob has filled.
 *
 * The blob is a `::before` layer behind the content (see `.tm-blob` in
 * globals.css) so it animates on the compositor and never repaints the text.
 */

type Variant = "primary" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

const variants: Record<Variant, string> = {
  // Solid navy at rest; the teal blob floods it and the label flips to navy.
  primary: "tm-blob bg-ink py-[17px] pl-14 pr-9 text-paper hover:text-ink",
  // Hairline at rest, same blob behaviour.
  outline:
    "tm-blob border border-ink/20 py-[17px] pl-14 pr-9 text-ink hover:border-ink/0",
  ghost: "px-1 py-2 text-ink underline-offset-4 hover:text-accent-text hover:underline",
};

function Arrow() {
  return (
    <ArrowUpRight
      className="h-4 w-4 shrink-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
      strokeWidth={2}
      aria-hidden
    />
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  magnetic = true,
  showArrow = true,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  showArrow?: boolean;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const classes = cn(base, variants[variant], className);
  const inner = (
    <>
      {/* `relative` keeps the label above the blob's stacking context. */}
      <span className="relative">{children}</span>
      {showArrow ? <Arrow /> : null}
    </>
  );

  const link = isExternal ? (
    <a
      href={href}
      className={classes}
      data-cursor="hover"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes} data-cursor="hover" {...rest}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic className="inline-block">{link}</Magnetic> : link;
}

/** Same treatment for real <button> elements (form submits). */
export function ActionButton({
  children,
  variant = "primary",
  className,
  ...rest
}: {
  children: React.ReactNode;
  variant?: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Magnetic className="inline-block">
      <button
        className={cn(base, variants[variant], "disabled:opacity-50", className)}
        data-cursor="hover"
        {...rest}
      >
        <span className="relative">{children}</span>
        <Arrow />
      </button>
    </Magnetic>
  );
}
