import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";

/**
 * Display — Bricolage Grotesque.
 * Variable optical-size axis lets the same family sit at 12px in a label and
 * 200px in the hero without the huge cut looking bloated. Both benchmark
 * agency sites converged on this face; it holds up at editorial scale.
 */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
});

/** Body — Hanken Grotesk. Neutral, tall x-height, very legible at 15–18px. */
export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

/** Labels, numerals, eyebrows, code. */
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/**
 * Emphasis — Instrument Serif italic.
 * Carries forward the brochure cover's own device, where "Bigger Growth."
 * breaks into a teal serif italic against the geometric sans.
 */
export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

export const fontVariables = [
  bricolage.variable,
  hanken.variable,
  jetbrains.variable,
  instrument.variable,
].join(" ");
