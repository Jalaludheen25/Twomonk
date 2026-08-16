import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { CapabilityVisual } from "@/components/sections/CapabilityVisual";
import { Intelligence } from "@/components/sections/Intelligence";
import { TechEcosystem } from "@/components/sections/TechEcosystem";
import { Cta } from "@/components/sections/Cta";
import { Faqs } from "@/components/sections/Faqs";
import { Reveal, Eyebrow } from "@/components/ui/Reveal";
import { capabilities, brochureServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Software, web, mobile, e-commerce, design, AI and automation, SEO, digital marketing and technology consulting — one connected service ecosystem.",
  alternates: { canonical: "/services" },
};

/**
 * Services.
 *
 * The home page shows the ecosystem as a scroll narrative; this page is the
 * reference version — every capability area laid out in full, deep-linkable by
 * anchor (`/services#intelligence`) so the nav and cards can point straight at
 * a section.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        lines={["One ecosystem.", "Every layer of it."]}
        accentWord="ecosystem."
        intro="A connected portfolio spanning software, design, intelligence, growth and infrastructure. Most engagements draw on more than one."
      />

      {/* Capability index */}
      <section className="tm-shell border-t border-line/50 py-14">
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
          {capabilities.map((c) => (
            <li key={c.id}>
              <Link
                href={`#${c.id}`}
                data-cursor="hover"
                className="group flex items-baseline gap-3 border-t border-line/60 pt-4"
              >
                <span className="font-mono text-[10px] tracking-[0.16em] text-accent-text">
                  {c.index}
                </span>
                <span className="font-display text-xl font-semibold transition-colors group-hover:text-accent-text">
                  {c.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Full detail per capability */}
      {capabilities.map((cap, i) => (
        <section
          key={cap.id}
          id={cap.id}
          className="border-t border-line/50 py-20 sm:py-28"
          // Offset so the floating nav never covers the heading on anchor jump.
          style={{ scrollMarginTop: "6rem" }}
        >
          <div className="tm-shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] tracking-[0.16em] text-accent-text">
                  {cap.index}
                </span>
                <h2 className="font-display text-h2 font-semibold">{cap.name}</h2>
              </div>

              <p className="mt-6 max-w-xl font-display text-h3 font-semibold text-ink">
                {cap.headline}
              </p>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
                {cap.description}
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {cap.groups.map((g) => (
                  <Reveal key={g.name}>
                    <div className="border-t border-line/60 pt-5">
                      <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
                        {g.name}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {g.services.map((s) => (
                          <li
                            key={s.name}
                            className="flex items-baseline gap-2 text-[15px] text-muted"
                          >
                            <span>{s.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div
              className={`flex items-start justify-center lg:col-span-5 ${
                i % 2 === 1 ? "lg:order-first" : ""
              }`}
            >
              <div className="aspect-square w-full max-w-[380px]">
                <CapabilityVisual id={cap.id} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <Intelligence />
      <TechEcosystem />

      {/* The brochure's seven, preserved verbatim */}
      <section className="border-t border-line/50 py-20 sm:py-28">
        <div className="tm-shell">
          <Eyebrow>From the brochure</Eyebrow>
          <h2 className="mt-8 font-display text-h2 font-semibold">
            One ecosystem. Seven <span className="tm-accent">capabilities</span>.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
            The seven core capabilities as published in the TwoMonk brochure. The
            areas above expand on these.
          </p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-paper-line/60 sm:grid-cols-2 lg:grid-cols-3">
            {brochureServices.map((s) => (
              <li key={s.index} className="bg-paper p-7">
                <span className="font-mono text-[10px] tracking-[0.16em] text-accent-text">
                  {s.index}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {s.name}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {s.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faqs />
      <Cta lines={["Know what you need?", "Let's scope it next."]} />
    </>
  );
}
