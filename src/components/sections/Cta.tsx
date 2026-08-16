import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { RevealLines } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/**
 * Closing conversion block.
 *
 * Ends every major page. Two actions with clearly different weight: start a
 * project (committed) versus talk to us (low commitment), because the two
 * buyers arriving at the bottom of the page are not in the same place.
 */
export function Cta({
  lines = ["Have an idea?", "Let's build what's next."],
}: {
  lines?: string[];
}) {
  return (
    <section className="tm-grain relative overflow-hidden border-t border-line/50 py-24 sm:py-36">
      <div className="tm-grain-layer" aria-hidden />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,159,157,0.34) 0%, rgba(0,44,84,0.18) 50%, transparent 72%)",
        }}
      />

      <div className="tm-shell relative text-center">
        <RevealLines
          as="h2"
          lines={[
            lines[0],
            <Fragment key="accent">
              {lines[1]?.replace(/next\.$/, "")}
              <span className="tm-accent">next</span>.
            </Fragment>,
          ]}
          className="tm-optical-display mx-auto max-w-[18ch] font-display text-h1 font-semibold"
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/contact">Start a Project</Button>
          <Button href={`mailto:${site.contact.email}`} variant="outline">
            Talk to TwoMonk
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
          <a
            href={`mailto:${site.contact.email}`}
            data-cursor="hover"
            className="transition-colors hover:text-accent-text"
          >
            {site.contact.email}
          </a>
          {site.contact.phones.map((p) => (
            <a
              key={p.value}
              href={p.href}
              data-cursor="hover"
              className="transition-colors hover:text-accent-text"
            >
              {p.region} {p.value}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
