import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Statement } from "@/components/sections/Statement";
import { ServiceEcosystem } from "@/components/sections/ServiceEcosystem";
import { Projects } from "@/components/sections/Projects";
import { TechEcosystem } from "@/components/sections/TechEcosystem";
import { Process } from "@/components/sections/Process";
import { Intelligence } from "@/components/sections/Intelligence";
import { Growth } from "@/components/sections/Growth";
import { WhyTwomonk } from "@/components/sections/WhyTwomonk";
import { Faqs } from "@/components/sections/Faqs";
import { Cta } from "@/components/sections/Cta";
import { site } from "@/data/site";

export const metadata: Metadata = {
  description: site.positioning,
  alternates: { canonical: "/" },
};

/**
 * Home.
 *
 * Sequenced as the argument the site is making:
 *   who we are → what we do → the full range → proof → how →
 *   what we build with → where it's going → why us → objections → act.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <ServiceEcosystem />
      <Projects limit={3} />
      <Process />
      <Intelligence />
      <TechEcosystem />
      <Growth />
      <WhyTwomonk />
      <Faqs />
      <Cta />
    </>
  );
}
