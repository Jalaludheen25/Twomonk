import { site } from "@/data/site";
import { allServices } from "@/data/services";

/**
 * Organization + WebSite JSON-LD.
 *
 * Every value here is drawn from the confirmed brochure details in
 * `src/data/site.ts` — nothing is asserted that TwoMonk hasn't published.
 * Deliberately omits aggregateRating, awards, foundingDate and employee counts:
 * structured data is machine-read and unverifiable claims there are worse than
 * absent ones.
 */
export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    slogan: site.tagline,
    description: site.positioning,
    email: site.contact.email,
    telephone: site.contact.phones.map((p) => p.value),
    areaServed: site.contact.locations,
    sameAs: site.contact.social.map((s) => s.href),
    knowsAbout: allServices.slice(0, 30),
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/logos/twomonk-colour.png`,
    },
    contactPoint: site.contact.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.value,
      email: site.contact.email,
      areaServed: p.region,
      contactType: "sales",
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      // Content is built from local constants, never user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organization, website]),
      }}
    />
  );
}
