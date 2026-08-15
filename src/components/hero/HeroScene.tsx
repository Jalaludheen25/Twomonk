"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero WebGL — "Two Strands".
 *
 * The concept comes straight out of the TwoMonk mark: two figures standing
 * side by side. Here they become two helical strands of light that wind around
 * a shared axis and are stitched together by faint rungs — a partnership, and
 * a pipeline. Density increases from bottom to top, so the form reads as
 * IDEA rising into GROWTH rather than as a decorative object.
 *
 * Deliberately not a floating sphere.
 *
 * Implementation notes:
 *  - One BufferGeometry, one draw call, rendered as GPU points.
 *  - All motion happens in the vertex shader; React never re-renders per frame.
 *  - Capped DPR and additive blending with no post-processing, so it stays
 *    cheap on integrated graphics.
 */

// Tuned against the rendered result, not guessed. Additive blending stacks
// alpha, so a dense cloud of large sprites saturates to flat white and eats
// the headline. Fewer, smaller, dimmer points spread over a taller form keeps
// it reading as structure — two strands of light — rather than as a glow blob.
const COUNT = 2300;
const TURNS = 3.5;
const HEIGHT = 9.2;
const RADIUS = 1.95;

function buildGeometry() {
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);
  const scales = new Float32Array(COUNT);

  // Strand A — teal → cyan (the accent figure)
  const a1 = new THREE.Color("#009f9d");
  const a2 = new THREE.Color("#6ff0ea");
  // Strand B — deep brand blue → light periwinkle (the navy figure).
  // Navy #002C54 itself is too dark to register on a near-black canvas, so the
  // ramp starts at a lifted version of it and keeps the hue.
  const b1 = new THREE.Color("#1d5f96");
  const b2 = new THREE.Color("#9fd8f7");

  const tmp = new THREE.Color();

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    const strand = i % 2; // interleave so both strands share the buffer
    const t = i / COUNT;

    // Rungs: every 26th point is pulled toward the axis, implying a connection
    // between the two strands without a second draw call.
    const isRung = i % 26 === 0;

    const angle = t * TURNS * Math.PI * 2 + (strand === 0 ? 0 : Math.PI);
    // Waist in the middle, flare at the ends — gives the form a body.
    const r = RADIUS * (0.62 + 0.38 * Math.sin(t * Math.PI)) * (isRung ? 0.34 : 1);

    positions[i3] = Math.cos(angle) * r;
    positions[i3 + 1] = (t - 0.5) * HEIGHT;
    positions[i3 + 2] = Math.sin(angle) * r;

    // Colour ramps along the strand: dim at the base, bright at the top.
    tmp.copy(strand === 0 ? a1 : b1).lerp(strand === 0 ? a2 : b2, t);
    colors[i3] = tmp.r;
    colors[i3 + 1] = tmp.g;
    colors[i3 + 2] = tmp.b;

    seeds[i] = Math.random();
    // Density and size rise toward the top — IDEA at the base, GROWTH above.
    scales[i] = (isRung ? 0.5 : 1) * (0.45 + t * 0.95) * (0.7 + Math.random() * 0.6);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  return geo;
}

const vertexShader = /* glsl */ `
  attribute float aSeed;
  attribute float aScale;
  uniform float uTime;
  uniform float uSize;
  uniform vec2  uPointer;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    vColor = color;

    vec3 p = position;

    // Slow individual drift so the form breathes instead of sitting rigid.
    float w = uTime * 0.55 + aSeed * 6.2831;
    p.x += sin(w) * 0.075;
    p.z += cos(w * 0.9) * 0.075;
    p.y += sin(w * 0.6) * 0.045;

    // Pointer tilts the whole form — the visual leans toward the cursor.
    float ry = uPointer.x * 0.32;
    float rx = -uPointer.y * 0.20;
    mat3 rotY = mat3(cos(ry), 0.0, -sin(ry), 0.0, 1.0, 0.0, sin(ry), 0.0, cos(ry));
    mat3 rotX = mat3(1.0, 0.0, 0.0, 0.0, cos(rx), sin(rx), 0.0, -sin(rx), cos(rx));
    p = rotX * rotY * p;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Perspective attenuation, normalised against the camera distance so
    // uSize reads directly in device pixels at the form's centre. (The usual
    // "300.0 / -mv.z" idiom assumes a much closer camera; at z=11 it produced
    // ~120px sprites, which is what turned the whole thing into a white smear.)
    gl_PointSize = uSize * aScale * (12.0 / -mv.z);

    // Fade points that sit far behind the axis so the helix reads with depth.
    vFade = smoothstep(-3.2, 1.6, p.z);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vFade;

  void main() {
    // Round, soft-edged point sprite — no texture fetch needed.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.06, d);
    // Capped well below 1.0: with additive blending the overlap between
    // neighbouring sprites is what creates brightness, so the per-point ceiling
    // has to stay low or the whole form clips to white.
    gl_FragColor = vec4(vColor, alpha * mix(0.16, 0.78, vFade));
  }
`;

function Strands({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const geometry = useMemo(buildGeometry, []);
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 3.2 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const m = material.current;
    if (!m) return;

    m.uniforms.uTime.value += delta;

    // Ease the pointer so the tilt has weight rather than snapping.
    const target = pointer.current ?? { x: 0, y: 0 };
    const p = m.uniforms.uPointer.value as THREE.Vector2;
    p.x += (target.x - p.x) * Math.min(1, delta * 3);
    p.y += (target.y - p.y) * Math.min(1, delta * 3);

    // Constant slow rotation gives the form its own life independent of input.
    if (points.current) points.current.rotation.y += delta * 0.09;

    // gl_PointSize is in device pixels, so scale by DPR to keep the apparent
    // size identical on retina and non-retina displays.
    m.uniforms.uSize.value = (size.width < 640 ? 2.6 : 3.6) * viewport.dpr;
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      }}
      onPointerLeave={() => {
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      <Canvas
        // Capped DPR: retina sharpness without quadrupling the fragment cost.
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 11], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <Strands pointer={pointer} />
      </Canvas>
    </div>
  );
}
