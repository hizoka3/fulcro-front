import type { JSX } from "solid-js";
import { createSignal, Show } from "solid-js";
import type { LegalRef } from "~/lib/types";

interface Props {
  index: number;
  title: string;
  description: string;
  legal?: LegalRef;
  onOpenLegal?: (legal: LegalRef) => void;
}

export default function DeudaCard(props: Props): JSX.Element {
  const [open, setOpen] = createSignal(false);

  return (
    <article
      class="surface-card overflow-hidden transition-shadow duration-200 ease-out-soft hover:shadow-card-hover"
      style={{ "animation-delay": `${200 + props.index * 120}ms` }}
      classList={{ "animate-fade-in": true }}
    >
      <button
        type="button"
        class="flex w-full items-start gap-4 p-5 text-left"
        aria-expanded={open()}
        onClick={() => setOpen((o) => !o)}
      >
        <div class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-danger/10 text-danger">
          <span class="text-small font-semibold">{props.index + 1}</span>
        </div>
        <div class="flex-1 space-y-1">
          <h3 class="text-h3 text-ink">{props.title}</h3>
          <p class="text-small text-ink-muted">
            {open() ? props.description : props.description.slice(0, 120) + (props.description.length > 120 ? "…" : "")}
          </p>
        </div>
        <svg
          class={`mt-1 h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 ${open() ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <Show when={open() && props.legal}>
        <div class="border-t border-primary-100/60 bg-primary-50/40 p-5">
          <div class="legal-quote">
            <div class="flex items-center justify-between gap-3 not-italic">
              <span class="text-micro font-semibold uppercase tracking-wide text-primary">
                {props.legal!.ref}
              </span>
              <span class="text-micro text-ink-muted">{props.legal!.title}</span>
            </div>
            <p class="mt-2">"{props.legal!.quote}"</p>
          </div>
          <div class="mt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              class="btn-link text-small"
              onClick={() => props.onOpenLegal?.(props.legal!)}
            >
              Ver fundamento legal
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Show>
    </article>
  );
}
