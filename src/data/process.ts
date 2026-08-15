/**
 * Delivery process and positioning.
 * The six steps are CONFIRMED — taken verbatim from brochure page 4,
 * "From idea to impact. A simple process. A strong partnership."
 */

export type ProcessStep = {
  index: string;
  name: string;
  /** Short line from the brochure. */
  summary: string;
  /** Expanded detail written for the site; brochure only carries the summary. */
  detail: string;
  /** Concrete artefacts the client receives at this stage. */
  outputs: string[];
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    name: "Discover",
    summary: "Understand your business.",
    detail:
      "Before a line of code, we map how the business actually operates — the workflows, the constraints, the people who will use what we build, and the number that has to move.",
    outputs: ["Stakeholder interviews", "Requirements map", "Success metrics"],
  },
  {
    index: "02",
    name: "Strategise",
    summary: "Build the roadmap.",
    detail:
      "We turn findings into a sequenced plan: what gets built first, what can wait, which platform choices keep options open, and what the whole thing costs.",
    outputs: ["Technical approach", "Delivery roadmap", "Scope & estimate"],
  },
  {
    index: "03",
    name: "Create",
    summary: "Develop the solution.",
    detail:
      "Design and engineering run together in short cycles. You see working software early and often, so course corrections cost days instead of months.",
    outputs: ["UI/UX design", "Working increments", "QA & review"],
  },
  {
    index: "04",
    name: "Launch",
    summary: "Put the strategy into action.",
    detail:
      "Deployment, migration, integrations and handover — with the monitoring and documentation needed to run it confidently from day one.",
    outputs: ["Deployment", "Integrations", "Handover & training"],
  },
  {
    index: "05",
    name: "Measure",
    summary: "Track performance.",
    detail:
      "Analytics and reporting wired to the metrics agreed in Discover, so performance is a fact rather than an opinion.",
    outputs: ["Analytics setup", "Dashboards", "Performance baseline"],
  },
  {
    index: "06",
    name: "Optimise",
    summary: "Improve continuously.",
    detail:
      "Launch is the starting line. We keep iterating on what the data shows — speed, conversion, search visibility, cost of running the system.",
    outputs: ["Iteration cycles", "Ongoing support", "Growth roadmap"],
  },
];

/** Positioning pillars — qualitative only, no invented numbers. */
export type Pillar = {
  index: string;
  name: string;
  claim: string;
  detail: string;
};

export const pillars: Pillar[] = [
  {
    index: "01",
    name: "Strategy",
    claim: "We understand the business before building.",
    detail:
      "Requirements come from how you operate and what you need to move, not from a feature list handed over at kickoff.",
  },
  {
    index: "02",
    name: "Design",
    claim: "We create experiences people want to use.",
    detail:
      "Interfaces are judged on whether they make the work faster and the brand clearer — not on how they look in a showcase.",
  },
  {
    index: "03",
    name: "Technology",
    claim: "We build scalable digital systems.",
    detail:
      "Maintainable architecture, sensible platform choices and code the next developer can read.",
  },
  {
    index: "04",
    name: "Growth",
    claim: "We think beyond launch.",
    detail:
      "Search, analytics and performance are part of the build, not a separate project bolted on afterwards.",
  },
  {
    index: "05",
    name: "Partnership",
    claim: "We support long-term digital growth.",
    detail:
      "Ongoing iteration and support, across India, the UAE and beyond — the relationship continues after handover.",
  },
];

/**
 * The growth loop shown in the Digital Growth section.
 * Deliberately a loop, not a line — Optimise feeds back into Build.
 */
export const growthLoop = [
  {
    name: "Build",
    detail: "Ship the system that carries the business.",
  },
  {
    name: "Launch",
    detail: "Get it into the market properly.",
  },
  {
    name: "Measure",
    detail: "Instrument what actually matters.",
  },
  {
    name: "Optimise",
    detail: "Compound the gains, then build again.",
  },
];

/**
 * Metrics displayed in the growth section.
 *
 * PLACEHOLDER — these are the *kinds* of metric TwoMonk reports on, shown as
 * labels with no fabricated figures attached. Supply real, verifiable numbers
 * before launch, or leave them as descriptive labels.
 */
export const growthMetrics = [
  { label: "Search visibility", unit: "organic traffic & rankings" },
  { label: "Conversion rate", unit: "visitors to enquiries" },
  { label: "Core Web Vitals", unit: "LCP · INP · CLS" },
  { label: "Cost per lead", unit: "paid & organic blended" },
];
