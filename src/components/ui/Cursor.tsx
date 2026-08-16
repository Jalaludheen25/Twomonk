"use client";

import { useEffect, useRef, useState } from "react";
import { useHasFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Custom cursor: a small teal dot with a trailing ring.
 *
 * Elements opt into states declaratively via `data-cursor`:
 *   data-cursor="hover"  â€” ring expands
 *   data-cursor="view"   â€” ring expands and shows a label
 *   data-cursor="hidden" â€” cursor hides (e.g. over inputs)
 * plus `data-cursor-label="View case"` to set the label text.
 *
 * Positioned with a rAF lerp on transform only, so it never triggers layout.
 * Off entirely for touch devices and reduced-motion users.
 */
export function Cursor() {
  const fine = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<"idle" | "hover" | "view" | "hidden">("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);

      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(
        "[data-cursor]",
      );
      if (el) {
        setState((el.dataset.cursor as typeof state) ?? "hover");
        setLabel(el.dataset.cursorLabel ?? "");
      } else {
        setState("idle");
        setLabel("");
      }
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      // Dot tracks the pointer exactly; the ring lags for a sense of weight.
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const hidden = state === "hidden" || !visible;
  const expanded = state === "hover" || state === "view";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-200"
        style={{ opacity: hidden || expanded ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-accent/70 transition-[width,height,background-color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: expanded ? 76 : 30,
          height: expanded ? 76 : 30,
          opacity: hidden ? 0 : 1,
          backgroundColor: expanded
            ? "color-mix(in oklab, var(--color-teal-bright) 14%, transparent)"
            : "transparent",
        }}
      >
        {state === "view" && label ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent-text">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
