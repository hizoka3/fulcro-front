import { For, Suspense, createResource, Show } from "solid-js";
import { getAlerts } from "~/lib/api";
import LoadingSpinner from "~/components/LoadingSpinner";
import type { Alert } from "~/lib/types";

const ICONS: Record<Alert["icon"], () => any> = {
  rate: () => (
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20L20 4M9 6a3 3 0 1 1 0-.01M18 18a3 3 0 1 1 0-.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  ),
  sernac: () => (
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l8 4v5c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V7l8-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
  ),
  law: () => (
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 8h14M7 8v9h10V8M9 5h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  ),
  consumer: () => (
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16l-2 12H6L4 6zM4 6L3 3H1M9 21a1 1 0 1 1 0-.01M17 21a1 1 0 1 1 0-.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
};

export default function AlertasPage() {
  const [alerts] = createResource(getAlerts);

  return (
    <div class="container-pro space-y-8 py-8 sm:py-10">
      <header class="flex items-end justify-between gap-3">
        <div class="max-w-2xl">
          <p class="text-micro uppercase tracking-wide text-ink-muted">Feed legal</p>
          <h1 class="text-h1 text-primary">Alertas relevantes para ti</h1>
          <p class="mt-2 text-body text-ink-muted text-pretty">
            Cambios normativos, fallos y mediaciones que tocan productos similares a los tuyos.
            Sin spam.
          </p>
        </div>
        <span class="hidden chip bg-success/10 text-success ring-1 ring-success/20 sm:inline-flex">
          Actualizado hoy
        </span>
      </header>

      <Suspense
        fallback={
          <div class="flex justify-center py-10">
            <LoadingSpinner class="text-primary" label="Cargando alertas…" />
          </div>
        }
      >
        <Show when={alerts()}>
          <ul class="grid gap-4">
            <For each={alerts()!}>
              {(a, i) => (
                <li
                  class="surface-card flex gap-4 p-5 animate-fade-in"
                  style={{ "animation-delay": `${i() * 80}ms` }}
                >
                  <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-50 text-primary">
                    {ICONS[a.icon]()}
                  </div>
                  <div class="flex-1 space-y-1">
                    <h3 class="text-h3 text-ink">{a.title}</h3>
                    <p class="text-small text-ink-muted text-pretty">{a.description}</p>
                    <div class="flex flex-wrap items-center gap-3 pt-1 text-micro text-ink-muted">
                      <span class="font-medium uppercase tracking-wide text-primary">
                        {a.source}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{a.date_relative}</span>
                      <a
                        class="btn-link ml-auto"
                        href={a.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Leer fuente
                      </a>
                    </div>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Suspense>
    </div>
  );
}
