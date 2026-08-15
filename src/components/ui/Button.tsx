"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center gap-3 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";

const variants: Record<Variant, string> = {
  // Teal fill, ink text — the single high-contrast action on any screen.
  primary:
    "bg-teal-bright px-7 py-4 text-ink hover:bg-paper focus-visible:bg-paper",
  outline:
    "border border-ink-line px-7 py-4 text-paper hover:border-teal-bright hover:text-teal-bright",
  ghost: "px-1 py-2 text-paper hover:text-teal-bright",
};

/**
 * Primary site action.
 *
 * The arrow does a diagonal swap on hover: the visible arrow slides out to the
 * top-right while a duplicate slides in from the bottom-left. Both live inside
 * an overflow-hidden box so the motion reads as one continuous object.
 */
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
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const inner = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span className="relative block h-3.5 w-3.5 overflow-hidden">
          <ArrowUpRight
            className="absolute inset-0 h-3.5 w-3.5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-hover:-translate-y-full"
            strokeWidth={2}
          />
          <ArrowUpRight
            className="absolute inset-0 h-3.5 w-3.5 -translate-x-full translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
            strokeWidth={2}
            aria-hidden
          />
        </span>
      ) : null}
    </>
  );

  const classes = cn(base, variants[variant], className);

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
        <span>{children}</span>
        <span className="relative block h-3.5 w-3.5 overflow-hidden">
          <ArrowUpRight
            className="absolute inset-0 h-3.5 w-3.5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-hover:-translate-y-full"
            strokeWidth={2}
          />
          <ArrowUpRight
            className="absolute inset-0 h-3.5 w-3.5 -translate-x-full translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
            strokeWidth={2}
            aria-hidden
          />
        </span>
      </button>
    </Magnetic>
  );
}
