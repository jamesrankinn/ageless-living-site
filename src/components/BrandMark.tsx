type BrandMarkProps = {
  className?: string;
  /** When true, render light-on-dark variant (footer / dark backgrounds). */
  inverted?: boolean;
  title?: string;
};

/**
 * Official Ageless Living lockup — the real teal triangle mark (from the
 * brand SVG) paired with a clean, tracked wordmark. Inline SVG keeps it
 * crisp at any size and tiny on the wire. The mark always renders in the
 * brand teal; the wordmark inherits `currentColor` so it reads correctly on
 * both light (header) and dark (footer) surfaces.
 */
export default function BrandMark({
  className,
  inverted = false,
  title = "Ageless Living",
}: BrandMarkProps) {
  const wordmark = inverted ? "hsl(var(--card))" : "currentColor";
  return (
    <svg
      role="img"
      aria-label={`${title} — Longevity & Vitality Clinic`}
      viewBox="0 0 232 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Real brand mark — three nested chevrons forming the Ageless "A". */}
      <g transform="translate(1 2) scale(0.0925)" fill="hsl(var(--clinic-teal))">
        <polygon points="421.33 389.33 388.89 389.33 211.44 59.44 32 389.33 0 389.33 210.67 0 421.33 389.33" />
        <polygon points="345.78 389.33 313.33 389.33 301.33 365.33 119.56 365.33 108 389.33 74.67 389.33 100 342.22 320.44 342.22 345.78 389.33" />
        <polygon points="304 307.56 115.56 307.56 212.89 128 227.11 155.11 159.44 282.22 291.11 282.22 304 307.56" />
      </g>
      {/* Wordmark */}
      <text
        x="52"
        y="22"
        fill={wordmark}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
        letterSpacing="1"
      >
        AGELESS
      </text>
      <text
        x="52"
        y="34"
        fill={wordmark}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="8.5"
        fontWeight="500"
        letterSpacing="4.6"
        opacity="0.7"
      >
        LIVING
      </text>
    </svg>
  );
}
