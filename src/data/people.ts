/**
 * Team and testimonials.
 *
 * ⚠️ Both sets are EMPTY BY DESIGN.
 *
 * The brief is explicit: do not invent clients or testimonials, and do not use
 * generic stock portraits. Rather than shipping fabricated people, these arrays
 * start empty and the corresponding sections do not render until real content
 * is supplied. Add entries here and the sections appear automatically.
 */

export type TeamMember = {
  name: string;
  role: string;
  /** Path under /public, e.g. /team/name.jpg. Falls back to an initials tile. */
  photo?: string;
  bio?: string;
  links?: { label: string; href: string }[];
};

/** Add real team members here. Section renders only when non-empty. */
export const team: TeamMember[] = [];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Path under /public. */
  logo?: string;
};

/**
 * Add real, permissioned client testimonials here.
 * Section renders only when non-empty.
 */
export const testimonials: Testimonial[] = [];

export const hasTeam = team.length > 0;
export const hasTestimonials = testimonials.length > 0;

/**
 * Shown in place of the team grid until real people are supplied, so the About
 * page never has a hole in it.
 */
export const teamPlaceholderNote = {
  heading: "A small team that stays on your project.",
  body: "TwoMonk works across India and the UAE. You deal with the people building the thing, not an account layer in front of them.",
};
