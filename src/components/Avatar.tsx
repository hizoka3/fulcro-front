import type { JSX } from "solid-js";
import { hashName } from "~/lib/format";

interface Props {
  name: string;
  size?: "sm" | "md" | "lg";
  class?: string;
}

const SIZE = { sm: 32, md: 64, lg: 128 } as const;

export default function Avatar(props: Props): JSX.Element {
  const size = () => SIZE[props.size ?? "md"];
  const seed = () => hashName(props.name);
  const hue = () => seed() % 360;
  const accentHue = () => (hue() + 28) % 360;
  const id = () => `av-${seed()}`;

  return (
    <div
      class={`relative inline-flex shrink-0 items-center justify-center ${props.class ?? ""}`}
      style={{ width: `${size()}px`, height: `${size()}px` }}
      aria-label={`Avatar de ${props.name}`}
    >
      <svg viewBox="0 0 128 128" class="h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id={`${id()}-bg`} cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color={`hsl(${hue()} 65% 96%)`} />
            <stop offset="100%" stop-color={`hsl(${hue()} 50% 86%)`} />
          </radialGradient>
          <linearGradient id={`${id()}-feather`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color={`hsl(${hue()} 70% 38%)`} />
            <stop offset="100%" stop-color={`hsl(${accentHue()} 75% 28%)`} />
          </linearGradient>
        </defs>

        <circle cx="64" cy="64" r="62" fill={`url(#${id()}-bg)`} />
        <circle cx="64" cy="64" r="61.5" fill="none" stroke={`hsl(${hue()} 40% 70% / 0.35)`} stroke-width="1" />

        {/* Stylized condor silhouette */}
        <g transform="translate(64 70)">
          {/* wings */}
          <path
            d="M-44 -2 C -34 -16, -18 -22, -10 -16 C -16 -10, -22 -4, -28 4 Z"
            fill={`url(#${id()}-feather)`}
            opacity="0.9"
          />
          <path
            d="M44 -2 C 34 -16, 18 -22, 10 -16 C 16 -10, 22 -4, 28 4 Z"
            fill={`url(#${id()}-feather)`}
            opacity="0.9"
          />
          {/* body */}
          <ellipse cx="0" cy="0" rx="13" ry="18" fill={`url(#${id()}-feather)`} />
          {/* head */}
          <circle cx="0" cy="-22" r="9" fill={`hsl(${hue()} 40% 22%)`} />
          {/* collar */}
          <path d="M-9 -16 Q 0 -10, 9 -16" stroke={`hsl(${accentHue()} 75% 60%)`} stroke-width="2.5" fill="none" stroke-linecap="round" />
          {/* beak */}
          <path d="M0 -22 L 6 -19 L 0 -17 Z" fill={`hsl(${accentHue()} 70% 45%)`} />
          {/* eye */}
          <circle cx="-2" cy="-24" r="1.4" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
