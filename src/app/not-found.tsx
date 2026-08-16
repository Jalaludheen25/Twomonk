import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/data/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="tm-shell flex min-h-[70svh] flex-col justify-center py-32">
      <span className="tm-eyebrow">Error 404</span>
      <h1 className="tm-optical-display mt-8 max-w-[14ch] font-display text-h1 font-semibold">
        This page took a <span className="tm-accent">wrong turn</span>.
      </h1>
      <p className="mt-6 max-w-md text-lead text-muted">
        The link is broken or the page has moved. Here is the way back.
      </p>

      <div className="mt-10">
        <Button href="/">Back to home</Button>
      </div>

      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line/60 pt-8">
        {primaryNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              data-cursor="hover"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2 transition-colors hover:text-accent-text"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
