import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faqs } from "@/components/sections/Faqs";
import { Eyebrow } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { processSteps } from "@/data/process";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with TwoMonk Innovations. Software, web, e-commerce, AI, SEO and digital marketing across the UAE and India.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Start the", "conversation."]}
        accentWord="conversation."
        intro="Tell us what you're trying to build. We'll come back with an honest view of scope, approach and cost."
      />

      <section className="border-t border-line/50 py-16 sm:py-24">
        <div className="tm-shell grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <Eyebrow>Direct</Eyebrow>

            <ul className="mt-8 space-y-6 border-t border-line/60 pt-8">
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                  Email
                </p>
                <a
                  href={`mailto:${site.contact.email}`}
                  data-cursor="hover"
                  className="mt-2 block font-display text-xl font-semibold transition-colors hover:text-accent-text"
                >
                  {site.contact.email}
                </a>
              </li>

              {site.contact.phones.map((p) => (
                <li key={p.value}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                    {p.region}
                  </p>
                  <a
                    href={p.href}
                    data-cursor="hover"
                    className="mt-2 block font-display text-xl font-semibold transition-colors hover:text-accent-text"
                  >
                    {p.value}
                  </a>
                </li>
              ))}

              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                  Social
                </p>
                <ul className="mt-2 flex gap-4">
                  {site.contact.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="text-[15px] text-muted transition-colors hover:text-accent-text"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <div className="mt-12 border-t border-line/60 pt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
                What happens next
              </p>
              <ol className="mt-5 space-y-3">
                {processSteps.slice(0, 3).map((s) => (
                  <li key={s.index} className="flex gap-3 text-[14px] text-muted">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted-2">
                      {s.index}
                    </span>
                    <span>
                      <span className="text-ink">{s.name}</span> â€” {s.summary}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <Faqs />
    </>
  );
}
