import type { JSX } from "solid-js";

export default function LoadingSpinner(props: { class?: string; label?: string }): JSX.Element {
  return (
    <span
      class={`inline-flex items-center gap-2 ${props.class ?? ""}`}
      role="status"
      aria-live="polite"
    >
      <svg class="h-4 w-4 animate-spin text-current" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.2" stroke-width="3" />
        <path
          d="M21 12a9 9 0 0 1-9 9"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
      {props.label && <span class="text-small">{props.label}</span>}
    </span>
  );
}
