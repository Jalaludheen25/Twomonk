"use client";

import { useSyncExternalStore } from "react";

/**
 * WebGL capability probe.
 *
 * The answer never changes for the lifetime of the page, so the context test
 * runs at most once and is cached at module scope. Exposed through
 * `useSyncExternalStore` with a `false` server snapshot: the first client
 * render matches the server HTML, then React re-reads on the client.
 */
let cached: boolean | null = null;

function detect() {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    cached = false;
  }
  return cached;
}

/** No-op: capability is static, so there is nothing to subscribe to. */
const subscribe = () => () => {};

export function useWebGLSupport() {
  return useSyncExternalStore(subscribe, detect, () => false);
}
