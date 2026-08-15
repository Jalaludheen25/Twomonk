/**
 * Single source of truth for company identity, contact details and navigation.
 *
 * CONFIRMED entries are taken verbatim from the official TwoMonk brochure
 * ("Broucher Demo for checking.pdf") and the logo artwork.
 * Anything not in the brochure is marked NEEDS CONFIRMATION.
 */

export const site = {
  /**
   * NOTE: the brochure body copy spells this "TwoMonk Innovations" (capital M),
   * the logo lockup is lowercase "two monk", and the domain is twomonk.com.
   * Change this one constant to restyle the name everywhere.
   */
  name: "TwoMonk Innovations",
  shortName: "TwoMonk",
  /** Used for the oversized wordmark treatments. */
  wordmark: "TWOMONK",

  // CONFIRMED — brochure cover, under the logo
  tagline: "Transforming Ideas Into Digital Reality",

  // CONFIRMED — brochure page 2. Brochure prints "Techology"; corrected here.
  themes: ["Strategy", "Creativity", "Technology", "Growth"],

  // CONFIRMED — brochure cover
  brochureHeadline: ["Digital Ideas.", "Smarter Solutions.", "Bigger Growth."],
  brochureSubline:
    "Your Partner for Software, Technology, Web Development & IT Solutions",

  // CONFIRMED — brochure page 2, "Where Strategy Meets Innovation"
  positioning:
    "TwoMonk Innovations is a software development and technology company focused on building powerful digital solutions for modern businesses.",

  about:
    "We develop custom software, websites and digital platforms designed around real business needs. From business applications and web development to e-commerce and digital solutions, we combine technology, creativity and strategy to help businesses work smarter and grow faster. Alongside our technology solutions, we help businesses strengthen their online presence through digital marketing, social media, SEO, content and online advertising.",

  mission:
    "To empower businesses with innovative digital solutions that create meaningful connections, measurable growth and long-term value.",

  vision:
    "To become a trusted digital and technology partner for ambitious businesses across India, the UAE and beyond.",

  // CONFIRMED — brochure page 4 contact block
  contact: {
    email: "Sales@twomonk.com",
    website: "https://www.twomonk.com",
    websiteLabel: "www.twomonk.com",
    phones: [
      { region: "UAE", value: "+971 562816806", href: "tel:+971562816806" },
      { region: "India", value: "+91 7736016453", href: "tel:+917736016453" },
    ],
    locations: ["UAE", "India"],
    social: [
      {
        label: "Instagram",
        handle: "twomonkinnovations",
        href: "https://instagram.com/twomonkinnovations",
      },
      {
        label: "Facebook",
        handle: "twomonkinnovations",
        href: "https://facebook.com/twomonkinnovations",
      },
    ],
    // NEEDS CONFIRMATION — no LinkedIn or street address appears in the brochure.
  },

  url: "https://www.twomonk.com",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Optional preview copy shown in the mega/mobile menu. */
  blurb?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", blurb: "Ideas that move." },
  {
    label: "Services",
    href: "/services",
    blurb: "Build · Design · Intelligence · Grow · Scale",
  },
  { label: "Work", href: "/work", blurb: "Proof over promises." },
  { label: "About", href: "/about", blurb: "Where strategy meets innovation." },
  { label: "Insights", href: "/insights", blurb: "Notes on technology." },
  { label: "Contact", href: "/contact", blurb: "Start the conversation." },
];

export const navCta = { label: "Start a Project", href: "/contact" } as const;

export const footerNav = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Capabilities",
    links: [
      { label: "Build", href: "/services#build" },
      { label: "Design", href: "/services#design" },
      { label: "Intelligence", href: "/services#intelligence" },
      { label: "Grow", href: "/services#grow" },
      { label: "Scale", href: "/services#scale" },
    ],
  },
];

/** CONFIRMED — brochure page 4 footer strip. */
export const capabilityStrip = [
  "Software",
  "Technology",
  "Web",
  "Digital Marketing",
  "E-Commerce",
  "Consulting",
];
