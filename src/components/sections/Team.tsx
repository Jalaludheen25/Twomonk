import Image from "next/image";
import { Eyebrow } from "@/components/ui/Reveal";
import { team, hasTeam, teamPlaceholderNote } from "@/data/people";
import { site } from "@/data/site";

/**
 * Team.
 *
 * Renders real people when `src/data/people.ts` has them, and a written
 * statement when it doesn't. The brief rules out generic stock portraits, and
 * inventing faces for a company page would be worse than saying nothing — so
 * the fallback is honest copy rather than five grey silhouettes.
 */
export function Team() {
  return (
    <section id="team" className="border-t border-ink-line/50 py-24 sm:py-32">
      <div className="tm-shell">
        <Eyebrow>Team</Eyebrow>

        {hasTeam ? (
          <>
            <h2 className="mt-8 font-display text-h2 font-semibold">
              The people on your <span className="tm-accent">project</span>.
            </h2>
            <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <li key={m.name} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-ink-line/70 bg-ink-raised">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={`${m.name}, ${m.role}`}
                        width={640}
                        height={800}
                        className="h-full w-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-display text-6xl font-semibold text-ink-line">
                        {m.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{m.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-teal-bright">
                    {m.role}
                  </p>
                  {m.bio ? (
                    <p className="mt-3 text-[14px] leading-relaxed text-fog">{m.bio}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <h2 className="font-display text-h2 font-semibold lg:col-span-7">
              {teamPlaceholderNote.heading}
            </h2>
            <div className="lg:col-span-5">
              <p className="text-[15px] leading-relaxed text-fog">
                {teamPlaceholderNote.body}
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-fog-dim">
                {site.contact.locations.join(" · ")}
              </p>
              {process.env.NODE_ENV !== "production" ? (
                <p className="mt-8 rounded-card border border-teal-bright/30 bg-teal-bright/[0.06] px-5 py-4 font-mono text-[11px] leading-relaxed text-teal-bright">
                  BUILD NOTICE (development only): add real team members to{" "}
                  <code>src/data/people.ts</code> and this becomes a photo grid
                  automatically.
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
