import type { JSX } from "solid-js";

export default function Logo(props: { class?: string; mark?: boolean }): JSX.Element {
  return (
    <div class={`flex items-center gap-2.5 ${props.class ?? ""}`}>
      <svg
        viewBox="0 0 32 32"
        class="h-7 w-7 shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0A2540" />
            <stop offset="100%" stop-color="#1E436B" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#lg)" />
        <path
          d="M10 21V11l5-2 5 2v10c0 .8-.5 1.4-1.2 1.6l-3.8 1.2-3.8-1.2A1.7 1.7 0 0 1 10 21z"
          fill="#FF7A59"
          opacity="0.95"
        />
        <path
          d="M15 9.5V23"
          stroke="#FFF"
          stroke-width="0.8"
          stroke-opacity="0.55"
        />
      </svg>
      {!props.mark && (
        <span class="font-semibold text-primary tracking-tight text-[17px]">
          Defensor
        </span>
      )}
    </div>
  );
}
