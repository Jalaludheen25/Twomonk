"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook.
 * Starts `false` on the server and syncs on mount, so nothing that depends on
 * viewport size can cause a hydration mismatch.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the user has asked for reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on pointer-fine devices — gates cursor and magnetic effects. */
export function useHasFinePointer() {
  return useMediaQuery("(pointer: fine)");
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}
