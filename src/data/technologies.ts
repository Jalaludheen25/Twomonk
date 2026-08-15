/**
 * Technology ecosystem.
 *
 * NEEDS CONFIRMATION — the brochure does not list a technology stack. This is a
 * proposed set consistent with the services TwoMonk offers. Remove anything the
 * team does not genuinely work with: an inflated stack is easy for a technical
 * buyer to catch, and costs more credibility than it buys.
 */

export type TechCategory = {
  id: string;
  name: string;
  items: string[];
};

export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue"],
  },
  {
    id: "backend",
    name: "Backend",
    items: ["Node.js", "Python", "PHP / Laravel", ".NET", "REST & GraphQL"],
  },
  {
    id: "mobile",
    name: "Mobile",
    items: ["Flutter", "React Native", "Android", "iOS"],
  },
  {
    id: "database",
    name: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase"],
  },
  {
    id: "cloud",
    name: "Cloud",
    items: ["AWS", "Azure", "Google Cloud", "Vercel", "Cloudflare"],
  },
  {
    id: "ai",
    name: "AI",
    items: ["OpenAI", "Claude", "LangChain", "TensorFlow", "Vector search"],
  },
  {
    id: "devops",
    name: "DevOps",
    items: ["Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Terraform"],
  },
  {
    id: "commerce",
    name: "Commerce",
    items: ["Shopify", "WooCommerce", "Stripe", "Razorpay", "Headless commerce"],
  },
  {
    id: "analytics",
    name: "Analytics",
    items: ["GA4", "Google Tag Manager", "Search Console", "Looker Studio"],
  },
];

/** Flat marquee feed. */
export const techMarquee = techCategories.flatMap((c) => c.items);
