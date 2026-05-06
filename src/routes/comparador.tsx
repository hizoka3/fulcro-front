import { For, createMemo } from "solid-js";
import { loadIngest } from "~/lib/api";
import { clp } from "~/lib/format";

export default function ComparadorPage() {
  const data = createMemo(() => loadIngest());
  const alts = () => data().alternatives ?? [];

  return (
    <div class="container-pro space-y-8 py-8 sm:py-10">
      <header class="max-w-2xl">
        <p class="text-micro uppercase tracking-wide text-ink-muted">Alternativas mejores</p>
        <h1 class="text-h1 text-primary">3 productos con menor CAE</h1>
        <p class="mt-2 text-body text-ink-muted text-pretty">
          Productos abiertos al público en Chile con condiciones más favorables que tus actuales.
          Fulcro no recibe comisión por estas recomendaciones.
        </p>
      </header>

      <section class="grid gap-4 md:grid-cols-3">
        <For each={alts()}>
          {(a, i) => (
            <article
              class="surface-card flex flex-col gap-4 p-6"
              classList={{ "ring-1 ring-accent/40 bg-accent/[0.03]": i() === 0 }}
            >
              {i() === 0 && (
                <span class="chip self-start bg-accent/15 text-accent ring-1 ring-accent/30">
                  Mayor ahorro
                </span>
              )}
              <div>
                <p class="text-micro uppercase tracking-wide text-ink-muted">{a.institution}</p>
                <h3 class="text-h3 text-primary">{a.product}</h3>
              </div>

              <dl class="grid grid-cols-2 gap-3 text-small">
                <div>
                  <dt class="text-micro text-ink-muted">CAE</dt>
                  <dd class="text-h3 tabular-nums text-primary">{a.cae.toFixed(1)}%</dd>
                </div>
                <div>
                  <dt class="text-micro text-ink-muted">Plazo</dt>
                  <dd class="text-h3 tabular-nums text-primary">{a.term_months} m</dd>
                </div>
              </dl>

              <div class="rounded-md bg-success/10 px-3 py-2.5 text-small text-success">
                Ahorro estimado:{" "}
                <strong class="tabular-nums">{clp(a.monthly_savings)}/mes</strong>
              </div>

              <button type="button" class="btn-ghost mt-auto w-full">
                Simular consolidación
              </button>
            </article>
          )}
        </For>
      </section>

      <p class="text-micro text-ink-subtle text-pretty">
        * Condiciones referenciales. CAE depende de evaluación crediticia y monto. Consulta en
        la institución antes de decidir.
      </p>
    </div>
  );
}
