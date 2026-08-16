import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyTwomonk } from "@/components/sections/WhyTwomonk";
import { TechEcosystem } from "@/components/sections/TechEcosystem";
import { Cta } from "@/components/sections/Cta";
import { Eyebrow, Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { capabilities } from "@/data/services";

export const metadata: Metadata = {
  title: "About",
  description: site.positioning,
  alternates: { canonical: "/about" },
};

/**
 * About.
 *
 * Copy here is taken from the official brochure wherever the brochure has a
 * position — mission and vision are verbatim, so the site and the sales
 * material never contradict each other.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        lines={["Where strategy", "meets innovation."]}
        accentWord="innovation."
        intro={site.positioning}
      />

      {/* Who we are */}
      <section className="border-t border-line/50 py-20 sm:py-28">
        <div className="tm-shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Who we are</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lead leading-relaxed text-ink">{site.about}</p>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line/60 pt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text">
              {site.themes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & Vision — verbatim from the brochure */}
      <section className="border-t border-line/50 py-20 sm:py-28">
        <div className="tm-shell grid gap-px overflow-hidden rounded-card bg-paper-line/60 md:grid-cols-2">
          {[
            { label: "Our mission", body: site.mission },
            { label: "Our vision", body: site.vision },
          ].map((b) => (
            <div key={b.label} className="bg-paper p-9 sm:p-12">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text">
                {b.label}
              </h2>
              <p className="mt-6 font-display text-h3 font-semibold leading-snug text-ink">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What we believe */}
      <section className="border-t border-line/50 py-20 sm:py-28">
        <div className="tm-shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>What we believe</Eyebrow>
            <h2 className="mt-8 font-display text-h2 font-semibold">
              Two figures, standing <span className="tm-accent">together</span>.
            </h2>
          </div>
          <div className="space-y-8 lg:col-span-8">
            {[
              {
                h: "Understand before building.",
                p: "The most expensive software is the kind that solves the wrong problem well. Discovery is not a formality.",
              },
              {
                h: "Technology serves the business.",
                p: "Stack choices follow from what the system has to do and who has to maintain it — never the other way round.",
              },
              {
                h: "Launch is the starting line.",
                p: "A system nobody finds, or nobody can maintain, has not shipped. Measurement and iteration are part of the work.",
              },
              {
                h: "Stay in the room.",
                p: "The mark is two people side by side. You deal with the people building the thing.",
              },
            ].map((b, i) => (
              <Reveal key={b.h} delay={i * 0.05}>
                <div className="border-t border-line/60 pt-6">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {b.h}
                  </h3>
                  <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-muted">
                    {b.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities summary */}
      <section className="border-t border-line/50 py-20 sm:py-28">
        <div className="tm-shell">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 className="mt-8 font-display text-h2 font-semibold">
            Five areas. One <span className="tm-accent">team</span>.
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-paper-line/60 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((c) => (
              <li key={c.id} className="bg-paper p-6">
                <span className="font-mono text-[10px] tracking-[0.16em] text-accent-text">
                  {c.index}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{c.name}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-2">
                  {c.summary.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhyTwomonk />
      <TechEcosystem />
      <Team />
      <Testimonials />
      <Cta lines={["Want to work together?", "Let's build what's next."]} />
    </>
  );
}
