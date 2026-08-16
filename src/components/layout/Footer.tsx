import Link from "next/link";
import { LogoLockup } from "@/components/ui/Logo";
import { site, footerNav, capabilityStrip } from "@/data/site";

/**
 * Footer.
 *
 * Opens with an oversized wordmark that bleeds to the page edges — the last
 * thing on screen is the brand at scale, which is where the reference sites
 * spend their final impression too.
 *
 * All contact details here are confirmed from the official brochure.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="tm-grain relative overflow-hidden border-t border-line/60 bg-paper-deep">
      <div className="tm-grain-layer" aria-hidden />

      <div className="tm-shell relative pt-20 sm:pt-28">
        {/* Capability strip — confirmed brochure footer line */}
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line/60 pb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">
          {capabilityStrip.map((c) => (
            <li key={c} className="flex items-center gap-5">
              <span>{c}</span>
              <span aria-hidden className="text-muted-2">
                ·
              </span>
            </li>
          ))}
        </ul>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <LogoLockup height={48} />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-muted">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-2">
              {site.positioning}
            </p>
          </div>

          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="md:col-span-2">
              <h2 className="tm-eyebrow">{col.heading}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-cursor="hover"
                      className="text-[15px] text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3">
            <h2 className="tm-eyebrow">Contact</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  data-cursor="hover"
                  className="text-muted transition-colors hover:text-accent-text"
                >
                  {site.contact.email}
                </a>
              </li>
              {site.contact.phones.map((p) => (
                <li key={p.value}>
                  <a
                    href={p.href}
                    data-cursor="hover"
                    className="text-muted transition-colors hover:text-accent-text"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
                      {p.region}
                    </span>{" "}
                    {p.value}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {site.contact.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 transition-colors hover:text-accent-text"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark, clipped at the baseline */}
        <div aria-hidden className="pointer-events-none select-none pt-6">
          <div className="-mb-[0.16em] overflow-hidden">
            <span className="tm-optical-display block bg-gradient-to-b from-paper/[0.13] to-paper/0 bg-clip-text text-center font-display text-[clamp(4rem,19vw,17rem)] font-extrabold leading-[0.8] tracking-[-0.05em] text-transparent">
              {site.wordmark}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line/60 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
            © {year} {site.name}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
            {site.contact.locations.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
