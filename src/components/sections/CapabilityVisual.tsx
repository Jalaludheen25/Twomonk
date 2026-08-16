"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Generative visuals for the five capability areas.
 *
 * These are original line-art motifs rather than stock photography — no
 * suitable imagery exists yet, and generic office photos would undercut the
 * rest of the page. Each motif is drawn from the capability's actual meaning:
 *
 *   Build        — modules stacking into a structure
 *   Design       — a bezier with live control handles
 *   Intelligence — a node graph resolving connections
 *   Grow         — a compounding curve over a measurement grid
 *   Scale        — concentric load rings around a core
 *
 * Everything is stroke-based SVG: sharp at any size, a few KB, and cheap to
 * animate. Each remounts on capability change so the draw-on replays.
 */

const STROKE = "var(--color-ink)";
const DIM = "color-mix(in oklab, var(--color-ink) 22%, transparent)";
/** Fill used to knock nodes out of the lines behind them. */
const KNOCKOUT = "var(--color-paper)";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, ease: EASE.expo, delay: i * 0.09 },
      opacity: { duration: 0.25, delay: i * 0.09 },
    },
  }),
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className="h-full w-full"
      aria-hidden
      role="presentation"
    >
      {/* Reference crosshair — full-bleed, so it stays outside the scale group */}
      <g stroke={DIM} strokeWidth="1">
        <line x1="0" y1="200" x2="400" y2="200" strokeDasharray="2 8" />
        <line x1="200" y1="0" x2="200" y2="400" strokeDasharray="2 8" />
      </g>
      {/* Motifs are drawn to a conservative safe area; scaling about the centre
          lets them fill the frame without redrawing every set of coordinates. */}
      <g transform="translate(200 200) scale(1.22) translate(-200 -200)">
        {children}
      </g>
    </svg>
  );
}

function Build() {
  // Modules settling into a stack.
  const blocks = [
    { x: 120, y: 250, w: 160, h: 46 },
    { x: 100, y: 196, w: 200, h: 46 },
    { x: 140, y: 142, w: 120, h: 46 },
    { x: 160, y: 88, w: 80, h: 46 },
  ];
  return (
    <Frame>
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="6"
          stroke={STROKE}
          strokeWidth="1.4"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, ease: EASE.expo, delay: i * 0.1 }}
        />
      ))}
      <motion.line
        x1="80"
        y1="316"
        x2="320"
        y2="316"
        stroke={STROKE}
        strokeWidth="1.4"
        variants={draw}
        initial="hidden"
        animate="visible"
        custom={4}
      />
    </Frame>
  );
}

function Design() {
  return (
    <Frame>
      <motion.path
        d="M70 300 C 130 120, 270 280, 330 100"
        stroke={STROKE}
        strokeWidth="1.6"
        variants={draw}
        initial="hidden"
        animate="visible"
        custom={0}
      />
      {/* Control handles */}
      <g stroke={DIM} strokeWidth="1">
        <line x1="70" y1="300" x2="130" y2="120" />
        <line x1="330" y1="100" x2="270" y2="280" />
      </g>
      {[
        [70, 300],
        [130, 120],
        [270, 280],
        [330, 100],
      ].map(([cx, cy], i) => (
        <motion.rect
          key={i}
          x={cx - 5}
          y={cy - 5}
          width="10"
          height="10"
          stroke={STROKE}
          strokeWidth="1.4"
          fill={KNOCKOUT}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE.back, delay: 0.5 + i * 0.07 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </Frame>
  );
}

function Intelligence() {
  const nodes = [
    [200, 90],
    [110, 170],
    [290, 170],
    [140, 290],
    [260, 290],
    [200, 200],
  ];
  const edges = [
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [1, 3],
    [2, 4],
  ];
  return (
    <Frame>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={STROKE}
          strokeWidth="1"
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={i}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={i === 5 ? 13 : 7}
          stroke={STROKE}
          strokeWidth="1.4"
          fill={KNOCKOUT}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE.back, delay: 0.35 + i * 0.06 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      {/* Signal pulse at the hub */}
      <circle cx="200" cy="200" r="13" stroke={STROKE} strokeWidth="1" fill="none">
        <animate
          attributeName="r"
          values="13;40"
          dur="2.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0"
          dur="2.6s"
          repeatCount="indefinite"
        />
      </circle>
    </Frame>
  );
}

function Grow() {
  const bars = [
    { x: 90, h: 40 },
    { x: 140, h: 76 },
    { x: 190, h: 120 },
    { x: 240, h: 168 },
    { x: 290, h: 226 },
  ];
  return (
    <Frame>
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          width="26"
          rx="3"
          stroke={STROKE}
          strokeWidth="1.3"
          initial={{ height: 0, y: 316 }}
          animate={{ height: b.h, y: 316 - b.h }}
          transition={{ duration: 0.9, ease: EASE.expo, delay: i * 0.08 }}
        />
      ))}
      <motion.path
        d="M78 300 C 150 292, 210 220, 316 74"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeDasharray="5 6"
        variants={draw}
        initial="hidden"
        animate="visible"
        custom={5}
      />
      <line x1="70" y1="316" x2="340" y2="316" stroke={DIM} strokeWidth="1" />
    </Frame>
  );
}

/**
 * Spoke endpoints, rounded to 2dp at module scope.
 *
 * Math.sin/cos precision is implementation-defined, so Node and V8-in-Chrome
 * disagree on the final float digit — enough for React to flag a hydration
 * mismatch on every render. Rounding makes the markup byte-identical on both
 * sides. (Anything trig- or random-derived in SSR'd markup needs this.)
 */
const SPOKES: [number, number][] = [0, 60, 120, 180, 240, 300].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return [
    Math.round((200 + Math.cos(rad) * 146) * 100) / 100,
    Math.round((200 + Math.sin(rad) * 146) * 100) / 100,
  ];
});

function Scale() {
  // Largest ring kept at 146 so the 1.22 frame scale doesn't clip it.
  const rings = [42, 77, 112, 146];
  return (
    <Frame>
      {rings.map((r, i) => (
        <motion.circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          stroke={STROKE}
          strokeWidth="1.2"
          strokeOpacity={1 - i * 0.2}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: EASE.expo, delay: i * 0.1 }}
          style={{ transformOrigin: "200px 200px" }}
        />
      ))}
      <motion.rect
        x="182"
        y="182"
        width="36"
        height="36"
        rx="5"
        stroke={STROKE}
        strokeWidth="1.6"
        fill={KNOCKOUT}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE.back, delay: 0.42 }}
        style={{ transformOrigin: "200px 200px" }}
      />
      {SPOKES.map(([x2, y2], i) => (
        <motion.line
          key={i}
          x1="200"
          y1="200"
          x2={x2}
          y2={y2}
          stroke={DIM}
          strokeWidth="1"
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={i + 3}
        />
      ))}
    </Frame>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  build: Build,
  design: Design,
  intelligence: Intelligence,
  grow: Grow,
  scale: Scale,
};

export function CapabilityVisual({ id }: { id: string }) {
  const Visual = VISUALS[id] ?? Build;
  return <Visual />;
}
