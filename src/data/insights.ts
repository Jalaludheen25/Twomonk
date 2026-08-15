/**
 * Insights / blog architecture.
 *
 * ⚠️ NO ARTICLES BY DESIGN. The brief says not to create fake articles. The
 * category taxonomy, types and routing exist so real posts can be added later
 * without building anything new — the Insights index shows a considered
 * "nothing published yet" state until then.
 */

export type InsightCategory = {
  id: string;
  name: string;
  description: string;
};

export const insightCategories: InsightCategory[] = [
  {
    id: "technology",
    name: "Technology",
    description: "Engineering decisions and the trade-offs behind them.",
  },
  {
    id: "ai",
    name: "AI",
    description: "Where AI removes real work, and where it does not.",
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    description: "Moving operations off spreadsheets and manual process.",
  },
  { id: "web", name: "Web", description: "Performance, search and the modern web." },
  {
    id: "marketing",
    name: "Marketing",
    description: "Search, campaigns and measurement.",
  },
  {
    id: "business-growth",
    name: "Business Growth",
    description: "Turning digital systems into commercial outcomes.",
  },
];

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date. */
  date: string;
  readingTime: string;
  author?: string;
  cover?: string;
  /** Markdown or plain paragraphs. */
  body: string[];
};

/** Add real articles here. */
export const insights: Insight[] = [];

export const hasInsights = insights.length > 0;

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

/**
 * FAQs — written to answer the questions a real prospect asks before enquiring.
 * These are TwoMonk's own positioning, not invented credentials.
 */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What kind of projects does TwoMonk take on?",
    answer:
      "Custom software, web applications, websites and e-commerce platforms — plus the design, search and marketing work that surrounds them. If a project needs building, launching and then growing, that full span is the work we are set up for.",
  },
  {
    question: "Do you only build, or do you also handle growth?",
    answer:
      "Both. Alongside technology solutions we work on digital marketing, social media, SEO, content and online advertising. In practice most engagements combine the two, because a system nobody finds does not earn anything.",
  },
  {
    question: "How does an engagement start?",
    answer:
      "With Discover — a short, focused phase where we map how the business runs, what the constraints are and which number has to move. That produces a roadmap, scope and estimate before any build commitment.",
  },
  {
    question: "Where are you based?",
    answer:
      "TwoMonk Innovations works across the UAE and India, and with clients beyond both.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Measure and Optimise are part of the process, not an upsell. Analytics get wired to the metrics agreed at the start, and we keep iterating on what the data shows.",
  },
  {
    question: "Can you work with our existing systems?",
    answer:
      "Yes. Integration with existing platforms, data and workflows is usually the harder half of the problem, and it is part of the Discover phase for exactly that reason.",
  },
];
