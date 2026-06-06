/**
 *  <AglessPattern />
 *  ------------------------------------------------------------------
 *  A subtle, decorative background texture built from the real Ageless
 *  Living chevron "A" mark. Used to add warmth and brand identity to
 *  otherwise-flat sections so the site feels designed rather than generic.
 *
 *  The mark is rendered as a tiled SVG `pattern` so it scales crisply and
 *  weighs nothing on the wire. Color follows the brand teal via
 *  `--clinic-teal`; opacity is intentionally very low so it reads as a
 *  watermark behind real content.
 *
 *  Always decorative → aria-hidden, pointer-events-none.
 */

import { useId } from "react";

type Props = {
  className?: string;
  /** 0–1, how visible the watermark is. Default 0.04 (very subtle). */
  opacity?: number;
  /** px size of each tile. Default 120. */
  size?: number;
  /** Brand color CSS var/string for the marks. Default brand teal. */
  color?: string;
};

export default function AglessPattern({
  className = "",
  opacity = 0.04,
  size = 120,
  color = "hsl(var(--clinic-teal))",
}: Props) {
  const rawId = useId();
  const patternId = `ageless-a-${rawId.replace(/[:]/g, "")}`;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(0)"
          >
            {/* Real brand mark — three nested chevrons forming the Ageless "A" */}
            <g
              transform={`translate(${size * 0.22} ${size * 0.22}) scale(${(size * 0.0014).toFixed(4)})`}
              fill={color}
            >
              <polygon points="421.33 389.33 388.89 389.33 211.44 59.44 32 389.33 0 389.33 210.67 0 421.33 389.33" />
              <polygon points="345.78 389.33 313.33 389.33 301.33 365.33 119.56 365.33 108 389.33 74.67 389.33 100 342.22 320.44 342.22 345.78 389.33" />
              <polygon points="304 307.56 115.56 307.56 212.89 128 227.11 155.11 159.44 282.22 291.11 282.22 304 307.56" />
            </g>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
