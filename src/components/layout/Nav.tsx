"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { LogoLink, LogoLockup } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { primaryNav, navCta, site } from "@/data/site";
import { EASE, DURATION } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Floating navigation.
 *
 * Desktop: a pill that sits over the hero transparently, then condenses into a
 * frosted bar once the user scrolls past the fold. It hides on scroll-down and
 * returns on scroll-up, so it is out of the way while reading but always one
 * gesture away.
 *
 * Mobile: a fullscreen overlay that wipes in, with links revealed on a stagger.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        // Only hide well below the fold, and never while the menu is open.
        setHidden(y > 320 && y > lastY + 4);
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll and close on Escape while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-140%" : "0%" }}
        transition={{ duration: DURATION.fast, ease: EASE.swift }}
        className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5"
      >
        <div className="tm-shell">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5",
              scrolled
                ? "border border-ink-line/80 bg-ink/72 backdrop-blur-xl"
                : "border border-transparent bg-transparent",
            )}
          >
            <LogoLink />

            {/* Desktop links */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        data-cursor="hover"
                        aria-current={active ? "page" : undefined}
                        className="group relative block overflow-hidden px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em]"
                      >
                        {/* Two stacked copies slide vertically on hover —
                            reads as one label rolling over. */}
                        <span
                          className={cn(
                            "block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full",
                            active ? "text-teal-bright" : "text-fog",
                          )}
                        >
                          {item.label}
                        </span>
                        <span
                          aria-hidden
                          className="absolute inset-0 flex translate-y-full items-center justify-center text-teal-bright transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <Button href={navCta.href} className="px-5 py-3">
                  {navCta.label}
                </Button>
              </div>

              {/* Menu toggle — visible below lg */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                data-cursor="hover"
                className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-paper lg:hidden"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <span className="relative block h-3 w-5">
                  <motion.span
                    animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: DURATION.fast, ease: EASE.swift }}
                    className="absolute left-0 top-0 block h-px w-5 bg-current"
                  />
                  <motion.span
                    animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: DURATION.fast, ease: EASE.swift }}
                    className="absolute bottom-0 left-0 block h-px w-5 bg-current"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen mobile / tablet menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE.expo }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink-deep lg:hidden"
          >
            <div className="tm-shell flex flex-1 flex-col pb-10 pt-28">
              <nav aria-label="Mobile" className="flex-1">
                <ul>
                  {primaryNav.map((item, i) => (
                    <li key={item.href} className="overflow-hidden border-b border-ink-line/60">
                      <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{
                          duration: DURATION.slow,
                          ease: EASE.expo,
                          delay: 0.14 + i * 0.055,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-baseline justify-between gap-4 py-4"
                        >
                          <span className="font-display text-[clamp(2rem,9vw,3.25rem)] font-semibold leading-none tracking-[-0.035em]">
                            {item.label}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog-dim">
                            0{i + 1}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.base, ease: EASE.expo, delay: 0.5 }}
                className="mt-10 space-y-6"
              >
                <Button href={navCta.href} className="w-full justify-center">
                  {navCta.label}
                </Button>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.08em] text-fog">
                  <a href={`mailto:${site.contact.email}`} className="hover:text-teal-bright">
                    {site.contact.email}
                  </a>
                  {site.contact.phones.map((p) => (
                    <a key={p.value} href={p.href} className="hover:text-teal-bright">
                      {p.region} {p.value}
                    </a>
                  ))}
                </div>

                <LogoLockup height={34} className="opacity-40" />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
