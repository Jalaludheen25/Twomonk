import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/Cta";
import { insights, getInsight } from "@/data/insights";
import { site } from "@/data/site";

/**
 * Article template.
 *
 * Generates statically from `src/data/insights.ts`. That array is empty today,
 * so this route produces no pages — it exists so publishing an article is a
 * data edit rather than a build task.
 */

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return { title: "Insight" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: `${post.title} — ${site.name}`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header className="tm-shell pb-12 pt-36 sm:pt-44">
          <Link
            href="/insights"
            data-cursor="hover"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2 transition-colors hover:text-accent-text"
          >
            ← All insights
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
            <span className="text-accent-text">{post.category}</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="tm-optical-display mt-6 max-w-[20ch] font-display text-h1 font-semibold">
            {post.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lead text-muted">{post.excerpt}</p>
        </header>

        <div className="tm-shell pb-16">
          <div className="max-w-2xl space-y-6 border-t border-line/60 pt-10">
            {post.body.map((para, i) => (
              <p key={i} className="text-[17px] leading-[1.75] text-muted">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      <Cta />
    </>
  );
}
