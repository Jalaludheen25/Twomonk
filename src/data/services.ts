/**
 * The TwoMonk service ecosystem.
 *
 * Services are grouped into five capability areas so a large portfolio can be
 * presented without a wall of cards. Edit this file to add, rename or remove
 * services — every services surface on the site reads from here.
 *
 * `confirmed: true` marks the seven capabilities printed in the official
 * brochure ("One ecosystem. Seven capabilities."). Everything else is proposed
 * and should be verified with the client before launch.
 */

export type Service = {
  name: string;
  /** Present in the official brochure. */
  confirmed?: boolean;
};

export type ServiceGroup = {
  name: string;
  services: Service[];
};

export type Capability = {
  id: string;
  index: string;
  /** Large display word, e.g. BUILD */
  name: string;
  /** One-line promise shown beside the name. */
  headline: string;
  description: string;
  /** Condensed list used in overview strips and the nav. */
  summary: string[];
  groups: ServiceGroup[];
};

export const capabilities: Capability[] = [
  {
    id: "build",
    index: "01",
    name: "Build",
    headline: "Software that carries the business.",
    description:
      "Custom platforms, applications and commerce systems engineered around how the business actually runs — not around a template.",
    summary: ["Software", "Web", "Mobile", "SaaS", "E-Commerce"],
    groups: [
      {
        name: "Software & Product Engineering",
        services: [
          { name: "Custom Software Development", confirmed: true },
          { name: "Web Application Development" },
          { name: "SaaS Development" },
          { name: "API Development" },
          { name: "Backend Development" },
          { name: "Frontend Development" },
          { name: "Enterprise Applications" },
          { name: "Custom Platforms" },
        ],
      },
      {
        name: "Web & Digital Experience",
        services: [
          { name: "Website Development", confirmed: true },
          { name: "Corporate Websites" },
          { name: "Landing Pages" },
          { name: "CMS Development" },
          { name: "Website Maintenance" },
        ],
      },
      {
        name: "Mobile",
        services: [
          { name: "Android Development" },
          { name: "iOS Development" },
          { name: "Cross-Platform Development" },
          { name: "Flutter Development" },
          { name: "App Maintenance" },
        ],
      },
      {
        name: "E-Commerce",
        services: [
          { name: "E-Commerce Development", confirmed: true },
          { name: "Shopify" },
          { name: "WooCommerce" },
          { name: "Custom E-Commerce" },
          { name: "Payment Integration" },
          { name: "Product Management" },
          { name: "E-Commerce Optimization" },
        ],
      },
    ],
  },
  {
    id: "design",
    index: "02",
    name: "Design",
    headline: "Experiences people actually want to use.",
    description:
      "Interface, brand and product design that makes complex systems feel obvious — and makes the business look like itself.",
    summary: ["UI/UX", "Branding", "Digital Experience"],
    groups: [
      {
        name: "Product & Interface",
        services: [
          { name: "UI/UX Design" },
          { name: "Website Design", confirmed: true },
          { name: "Mobile UI/UX" },
          { name: "Design Systems" },
          { name: "Prototyping" },
        ],
      },
      {
        name: "Branding & Creative",
        services: [
          { name: "Brand Strategy" },
          { name: "Brand Identity" },
          { name: "Logo Design" },
          { name: "Creative Design" },
          { name: "Social Media Creative" },
          { name: "Presentation Design" },
        ],
      },
    ],
  },
  {
    id: "intelligence",
    index: "03",
    name: "Intelligence",
    headline: "Make the business smarter.",
    description:
      "AI and automation applied where they remove real work — support, operations, data entry, reporting — rather than as a badge on the homepage.",
    summary: ["AI", "Automation", "Data", "Machine Learning"],
    groups: [
      {
        name: "AI & Emerging Technology",
        services: [
          { name: "AI Solutions" },
          { name: "AI Integration" },
          { name: "Generative AI Solutions" },
          { name: "AI Chatbots & Assistants" },
          { name: "Machine Learning Solutions" },
          { name: "Computer Vision" },
        ],
      },
      {
        name: "Automation & Data",
        services: [
          { name: "AI Automation" },
          { name: "Business Automation" },
          { name: "Intelligent Business Automation" },
          { name: "Business Process Automation" },
          { name: "Business Intelligence" },
          { name: "Data-Driven Systems" },
        ],
      },
    ],
  },
  {
    id: "grow",
    index: "04",
    name: "Grow",
    headline: "Launch is the starting line.",
    description:
      "Search, campaigns and content that compound — measured against pipeline and revenue, not impressions.",
    summary: ["SEO", "Digital Marketing", "Paid Ads", "Content"],
    groups: [
      {
        name: "Search",
        services: [
          { name: "Search Engine Optimization", confirmed: true },
          { name: "Local SEO" },
          { name: "Technical SEO" },
          { name: "Analytics" },
        ],
      },
      {
        name: "Marketing & Demand",
        services: [
          { name: "Digital Marketing", confirmed: true },
          { name: "Social Media Marketing" },
          { name: "Content Marketing" },
          { name: "Lead Generation" },
          { name: "Email Marketing" },
          { name: "Marketing Automation" },
        ],
      },
      {
        name: "Paid Advertising",
        services: [
          { name: "Paid Advertising" },
          { name: "Google Ads" },
          { name: "Meta Ads" },
        ],
      },
    ],
  },
  {
    id: "scale",
    index: "05",
    name: "Scale",
    headline: "Built to hold under load.",
    description:
      "Cloud, infrastructure and technology strategy for systems that have to keep working as the business grows.",
    summary: ["Cloud", "Consulting", "Technology Strategy"],
    groups: [
      {
        name: "Technology Consulting",
        services: [
          { name: "IT Consulting", confirmed: true },
          { name: "Digital Transformation" },
          { name: "Technology Strategy" },
          { name: "Technical Consulting" },
        ],
      },
      {
        name: "Infrastructure",
        services: [
          { name: "Cloud Solutions" },
          { name: "Infrastructure Consulting" },
          { name: "DevOps & CI/CD" },
          { name: "Monitoring & Observability" },
        ],
      },
    ],
  },
];

/** Flat list — useful for the contact form's service picker and for SEO. */
export const allServices = capabilities.flatMap((c) =>
  c.groups.flatMap((g) => g.services.map((s) => s.name)),
);

export const capabilityNames = capabilities.map((c) => c.name);

/**
 * The seven capabilities exactly as printed in the brochure, kept intact so the
 * site and the brochure never contradict each other.
 */
export const brochureServices = [
  {
    index: "01",
    name: "Software Development",
    description:
      "Custom software solutions designed around your business processes and requirements.",
  },
  {
    index: "02",
    name: "Web Development",
    description:
      "Responsive, functional and SEO-ready websites built for modern businesses.",
  },
  {
    index: "03",
    name: "Web Designing",
    description:
      "Creative, user-focused website designs that turn visitors into customers.",
  },
  {
    index: "04",
    name: "E-Commerce Solutions",
    description:
      "Digital commerce solutions designed to help businesses sell, manage and grow online.",
  },
  {
    index: "05",
    name: "Search Engine Optimization",
    description:
      "Improve search visibility, attract relevant traffic and build sustainable organic growth.",
  },
  {
    index: "06",
    name: "Digital Marketing",
    description:
      "Strategic digital campaigns that strengthen brand visibility, engagement, leads and conversions.",
  },
  {
    index: "07",
    name: "IT Consulting",
    description:
      "Expert IT guidance to optimize technology, improve efficiency, and support business growth.",
  },
];
