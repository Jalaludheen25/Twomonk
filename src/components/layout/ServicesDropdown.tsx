"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { capabilities } from "@/data/services";
import { EASE, DURATION } from "@/lib/motion";

/**
 * Desktop "Services" nav dropdown.
 *
 * The trigger is still a real link — it navigates to /services on click, so
 * the dropdown is a progressive enhancement rather than the only way in.
 *
 * The panel is a child of the same <li>, positioned with `pt-3` (padding, not
 * margin) so the gap between the link and the panel is still inside the
 * panel's own hit box — hovering straight down through that gap keeps the
 * pointer "over" a descendant of the trigger the whole way, so there's no
 * dead zone that closes the menu mid-travel.
 */
export function ServicesDropdown({ isCurrent }: { isCurrent: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function hide() {
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  }

  return (
    <li
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href="/services"
        data-cursor="hover"
        aria-current={isCurrent ? "page" : undefined}
        aria-expanded={open}
        aria-haspopup="true"
        className="group relative block overflow-hidden px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em]"
      >
        <span
          className={`block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full ${
            isCurrent ? "text-accent-text" : "text-muted"
          }`}
        >
          Services
        </span>
        <span
          aria-hidden
          className="absolute inset-0 flex translate-y-full items-center justify-center text-accent-text transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        >
          Services
        </span>
      </Link>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: DURATION.fast, ease: EASE.expo }}
            className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3"
          >
            <div className="tm-card overflow-hidden rounded-cell p-3 shadow-[var(--shadow-card-hover)]">
              <ul className="grid grid-cols-1 gap-1">
                {capabilities.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/services#${c.id}`}
                      data-cursor="hover"
                      className="group/item flex items-start gap-3 rounded-[calc(var(--radius-cell)-0.4rem)] p-3 transition-colors duration-250 hover:bg-accent-wash"
                    >
                      <span className="mt-0.5 font-mono text-[10px] tracking-[0.16em] text-accent-text">
                        {c.index}
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-base font-semibold text-ink transition-colors group-hover/item:text-accent-text">
                          {c.name}
                        </span>
                        <span className="mt-0.5 block text-[12px] leading-snug text-muted">
                          {c.summary.join(" · ")}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="mt-1 text-accent-text opacity-0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                data-cursor="hover"
                className="mt-1 flex items-center justify-between rounded-[calc(var(--radius-cell)-0.4rem)] border-t border-line/70 p-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text"
              >
                View all services
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
