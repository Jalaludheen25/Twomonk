import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Cta } from "@/components/sections/Cta";
import { Eyebrow } from "@/components/ui/Reveal";
import { insights, insightCategories, hasInsights } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on technology, AI, digital transformation, web, marketing and business growth from TwoMonk Innovations.",
  alternates: { canonical: "/insights" },
};

/**
 * Insights index.
 *
 * The architecture is complete — categories, article type, routing and
 * per-post pages all exist — but no articles are published, because inventing
 * thought leadership would be worse than an honest empty state. Add entries to
 * `insights` in src/data/insights.ts and this page fills in.
 */
export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        lines={["Notes on", "building things."]}
        accentWord="building things."
        intro="Occasional writing on technology decisions, AI that earns its place, and what actually moves the numbers."
      />

      <section className="border-t border-line/50 py-16 sm:py-24">
        <div className="tm-shell">
          <Eyebrow>Topics</Eyebrow>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {insightCategories.map((c) => (
              <li key={c.id} className="tm-card tm-card--interactive rounded-cell p-7">
                <h2 className="font-display text-xl font-semibold text-ink">
                  {c.name}
                </h2>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                  {c.description}
                </p>
              </li>
            ))}
          </ul>

          {hasInsights ? (
            <ul className="mt-16 border-t border-line/60">
              {insights.map((post) => (
                <li key={post.slug} className="border-b border-line/60">
                  <Link
                    href={`/insights/${post.slug}`}
                    data-cursor="view"
                    data-cursor-label="Read"
                    className="group grid gap-4 py-8 lg:grid-cols-12 lg:items-baseline"
                  >
                    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2 lg:col-span-3">
                      <span className="text-accent-text">{post.category}</span>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <h3 className="font-display text-h3 font-semibold transition-colors group-hover:text-accent-text lg:col-span-7">
                      {post.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2 lg:col-span-2 lg:text-right">
                      {post.readingTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-16 rounded-card border border-line/70 px-8 py-14 text-center sm:px-14 sm:py-20">
              <p className="font-display text-h3 font-semibold text-ink">
                Nothing published yet.
              </p>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                We would rather publish nothing than publish filler. Writing is on
                the way — in the meantime, the fastest way to get our thinking on
                your problem is to ask.
              </p>
              <Link
                href="/contact"
                data-cursor="hover"
                className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text underline-offset-4 hover:underline"
              >
                Ask us directly →
              </Link>

              {process.env.NODE_ENV !== "production" ? (
                <p className="mx-auto mt-10 max-w-xl rounded-card border border-accent/30 bg-accent/[0.06] px-5 py-4 text-left font-mono text-[11px] leading-relaxed text-accent-text">
                  BUILD NOTICE (development only): add articles to{" "}
                  <code>src/data/insights.ts</code> and this empty state is replaced
                  by the article index automatically.
                </p>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <Cta lines={["Got a harder question?", "Let's talk it through."]} />
    </>
  );
}
