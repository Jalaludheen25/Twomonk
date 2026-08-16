/**
 * Generated project cover art.
 *
 * Real screenshots go here as soon as there is real work to show — set
 * `cover` on the project and this is bypassed. Until then this draws an
 * original abstract composition from the project's own accent pair, which is
 * honest about being a placeholder while still looking deliberate. Stock
 * photography of strangers at laptops would look worse and say less.
 *
 * Deterministic: the same slug always produces the same composition, so covers
 * stay stable between renders and across server/client.
 */

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function ProjectCover({
  slug,
  accent,
  index,
}: {
  slug: string;
  accent: [string, string];
  index: number;
}) {
  const h = hash(slug);
  const id = `pc-${slug}`;
  // Vary the composition per project without ever producing a broken layout.
  const tilt = (h % 24) - 12;
  const orbX = 46 + (h % 22);
  const orbY = 34 + ((h >> 3) % 26);
  const rings = 3 + (h % 3);

  return (
    <svg
      viewBox="0 0 800 520"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      role="presentation"
    >
      <defs>
        <radialGradient id={`${id}-orb`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent[0]} stopOpacity="0.42" />
          <stop offset="55%" stopColor={accent[0]} stopOpacity="0.13" />
          <stop offset="100%" stopColor={accent[0]} stopOpacity="0" />
        </radialGradient>
        {/* Paper bed with a faint cool cast, so covers sit on the page rather
            than punching a dark hole in it. */}
        <linearGradient id={`${id}-bed`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e3ecf3" />
        </linearGradient>
        <pattern
          id={`${id}-grid`}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0 L0 0 0 40"
            fill="none"
            stroke={accent[0]}
            strokeOpacity="0.13"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="800" height="520" fill={`url(#${id}-bed)`} />
      <rect width="800" height="520" fill={`url(#${id}-grid)`} />

      {/* Light source */}
      <ellipse
        cx={(orbX / 100) * 800}
        cy={(orbY / 100) * 520}
        rx="300"
        ry="260"
        fill={`url(#${id}-orb)`}
      />

      {/* Concentric structure, rotated per project */}
      <g
        transform={`rotate(${tilt} ${(orbX / 100) * 800} ${(orbY / 100) * 520})`}
        stroke={accent[0]}
        fill="none"
      >
        {Array.from({ length: rings }).map((_, i) => (
          <circle
            key={i}
            cx={(orbX / 100) * 800}
            cy={(orbY / 100) * 520}
            r={72 + i * 58}
            strokeOpacity={0.3 - i * 0.05}
            strokeWidth="1.2"
          />
        ))}
      </g>

      {/* Horizon rule + oversized index */}
      <line
        x1="0"
        y1="430"
        x2="800"
        y2="430"
        stroke={accent[0]}
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      <text
        x="52"
        y="398"
        fill={accent[0]}
        fillOpacity="0.5"
        fontSize="150"
        fontWeight="700"
        fontFamily="var(--font-display), sans-serif"
        letterSpacing="-6"
      >
        {String(index + 1).padStart(2, "0")}
      </text>
    </svg>
  );
}
