import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Projects } from "@/components/sections/Projects";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected TwoMonk Innovations projects — software, web, e-commerce and growth engagements.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        lines={["What we've", "actually shipped."]}
        accentWord="shipped."
        intro="Every engagement starts with understanding the business and ends with something measurable. Here is what that looks like in practice."
      />
      <Projects />
      <Cta lines={["Want results like these?", "Let's build what's next."]} />
    </>
  );
}
