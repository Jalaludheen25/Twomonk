/**
 * Projects / case studies.
 *
 * ⚠️ PLACEHOLDER CONTENT — no real client work has been supplied yet, and the
 * brochure contains none. Every entry below is explicitly marked and uses
 * generated abstract cover art rather than stock photography or invented logos.
 *
 * To publish real work:
 *   1. Replace an entry's copy with the real project.
 *   2. Drop the cover image in /public/work/<slug>/ and set `cover`.
 *   3. Set `isPlaceholder: false`.
 *
 * The site reads `PROJECTS_ARE_PLACEHOLDER` (computed below) and shows a build
 * notice in development so placeholders can't be shipped by accident.
 */

export type CaseStudySection = {
  heading: string;
  body: string;
  /** Optional bullet list rendered under the body. */
  points?: string[];
};

export type Project = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  /** One-line result. Never a fabricated statistic. */
  outcome: string;
  summary: string;
  services: string[];
  technologies: string[];
  /** Path under /public. Falls back to generated art when omitted. */
  cover?: string;
  /** Two brand hues used by the generated cover art. */
  accent: [string, string];
  isPlaceholder: boolean;
  caseStudy: {
    overview: string;
    sections: CaseStudySection[];
    /** Qualitative results only — no invented numbers. */
    results: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "sample-commerce-platform",
    name: "Commerce Platform",
    industry: "Retail",
    year: "2025",
    outcome: "Placeholder — replace with the real project outcome.",
    summary:
      "Sample entry demonstrating the case-study layout for a custom e-commerce build. Swap this copy for a real project.",
    services: ["E-Commerce Development", "UI/UX Design", "Payment Integration"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    accent: ["#009F9D", "#002C54"],
    isPlaceholder: true,
    caseStudy: {
      overview:
        "This is placeholder case-study copy. It exists to demonstrate the page architecture — hero, challenge, strategy, design, development, technology, outcome — so a real project can be dropped in without touching components.",
      sections: [
        {
          heading: "Challenge",
          body: "Describe the business problem here: what was slow, manual, expensive or losing customers.",
        },
        {
          heading: "Strategy",
          body: "Describe the approach agreed in Discover and Strategise, and why this route was chosen over the alternatives.",
        },
        {
          heading: "Design",
          body: "Describe the interface and brand decisions, and what they were optimising for.",
          points: [
            "Key design decision",
            "Key design decision",
            "Key design decision",
          ],
        },
        {
          heading: "Development",
          body: "Describe the architecture, integrations and engineering decisions that made the system maintainable.",
        },
      ],
      results: [
        "Qualitative result — replace with a verifiable outcome.",
        "Qualitative result — replace with a verifiable outcome.",
      ],
    },
  },
  {
    slug: "sample-business-platform",
    name: "Business Platform",
    industry: "Operations",
    year: "2025",
    outcome: "Placeholder — replace with the real project outcome.",
    summary:
      "Sample entry demonstrating a custom internal platform replacing manual workflows.",
    services: ["Custom Software Development", "Business Automation", "UI/UX Design"],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    accent: ["#14D6CF", "#002C54"],
    isPlaceholder: true,
    caseStudy: {
      overview:
        "Placeholder case-study copy for an internal business platform. Replace with a real engagement.",
      sections: [
        {
          heading: "Challenge",
          body: "Describe the operational bottleneck and its cost to the business.",
        },
        {
          heading: "Strategy",
          body: "Describe the phased approach and how risk was contained.",
        },
        {
          heading: "Development",
          body: "Describe the system design, data model and integrations.",
        },
      ],
      results: ["Qualitative result — replace.", "Qualitative result — replace."],
    },
  },
  {
    slug: "sample-growth-engagement",
    name: "Growth Engagement",
    industry: "Services",
    year: "2025",
    outcome: "Placeholder — replace with the real project outcome.",
    summary:
      "Sample entry demonstrating a combined build-and-grow engagement: site, search and campaigns.",
    services: ["Website Development", "Search Engine Optimization", "Digital Marketing"],
    technologies: ["Next.js", "GA4", "Google Ads", "Search Console"],
    accent: ["#4EE2FF", "#002C54"],
    isPlaceholder: true,
    caseStudy: {
      overview:
        "Placeholder case-study copy for a build-plus-growth engagement. Replace with a real engagement.",
      sections: [
        {
          heading: "Challenge",
          body: "Describe the visibility or conversion problem.",
        },
        {
          heading: "Strategy",
          body: "Describe the search and campaign strategy alongside the rebuild.",
        },
        {
          heading: "Measure & Optimise",
          body: "Describe the measurement setup and the iteration cycle that followed launch.",
        },
      ],
      results: ["Qualitative result — replace.", "Qualitative result — replace."],
    },
  },
];

export const PROJECTS_ARE_PLACEHOLDER = projects.every((p) => p.isPlaceholder);

export const realProjects = projects.filter((p) => !p.isPlaceholder);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
