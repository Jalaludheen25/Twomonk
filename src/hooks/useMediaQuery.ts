"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook.
 *
 * Built on `useSyncExternalStore` rather than useState + useEffect. matchMedia
 * is precisely the "external store" that API exists for: the server snapshot is
 * always `false`, the client subscribes to the real MediaQueryList, and React
 * reads it during render — so there is no cascading re-render on mount and no
 * torn state between the two.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // The server has no viewport and no user preferences; `false` keeps the
  // first client render identical to the server HTML.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
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
