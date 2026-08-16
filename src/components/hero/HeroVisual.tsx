"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";

/**
 * Loads the WebGL hero only when it is actually wanted:
 *  - never on the server (three.js has no business in the HTML payload),
 *  - never under prefers-reduced-motion,
 *  - never when the device can't create a WebGL context.
 *
 * In every skipped case a static CSS composition renders instead, so the hero
 * still has depth and brand colour rather than a blank rectangle.
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <StaticVisual />,
});

/**
 * Two offset radial fields in the brand's navy and teal, echoing the two
 * figures in the mark.
 *
 * Doubles as both the no-WebGL fallback (at full strength) and the lighting
 * bed that sits behind the live canvas (dimmed). Points alone render flat;
 * a soft core behind them is what gives the form depth and makes it read as
 * lit rather than as scattered dots.
 */
function StaticVisual({ intensity = 1 }: { intensity?: number }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ opacity: intensity }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-[58%] -translate-y-1/2 rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(29,95,150,0.55) 0%, rgba(0,44,84,0.22) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-[38%] -translate-y-[46%] rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,159,157,0.5) 0%, rgba(20,214,207,0.16) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => setWebgl(detectWebGL()), []);

  /*
   * Placement matters more than the shader here. Centred behind the headline,
   * the form competed with the type and won. It now sits in the right third on
   * desktop — the two strands read as a standing figure beside the words, which
   * is also the composition of the logo itself. On small screens it drops
   * behind the content at low opacity, purely as atmosphere.
   */
  const useCanvas = webgl !== null && !reduced && webgl;

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-55 [mask-image:radial-gradient(78%_78%_at_50%_50%,#000_32%,transparent_74%)] sm:opacity-75 lg:left-auto lg:w-[48%] lg:opacity-100"
      aria-hidden
    >
      {useCanvas ? (
        <>
          <StaticVisual intensity={0.5} />
          <HeroScene />
        </>
      ) : (
        <StaticVisual />
      )}
    </div>
  );
}
