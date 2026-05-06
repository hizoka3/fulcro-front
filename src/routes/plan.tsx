import { For, createMemo } from "solid-js";
import { loadIngest } from "~/lib/api";
import { clp } from "~/lib/format";

export default function PlanPage() {
  const data = createMemo(() => loadIngest());
  const debts = () => (data().debts ?? []).slice().sort((a, b) => a.priority - b.priority);

  return (
    <div class="container-pro space-y-8 py-8 sm:py-10">
      <header class="max-w-2xl">
        <p class="text-micro uppercase tracking-wide text-ink-muted">Estrategia recomendada</p>
        <h1 class="text-h1 text-primary">Avalancha</h1>
        <p class="mt-2 text-body text-ink-muted text-pretty">
          Paga primero la deuda con la <strong class="text-primary">tasa más alta</strong>,
          mientras pagas el mínimo en el resto. Es la estrategia que más reduce el costo total
          del crédito.
        </p>
      </header>

      <section class="surface-card overflow-hidden">
        {/* desktop table */}
        <div class="hidden md:block">
          <table class="min-w-full divide-y divide-primary-100/60 text-small">
            <thead class="bg-primary-50/60 text-ink-muted">
              <tr>
                <Th>Prioridad</Th>
                <Th>Institución</Th>
                <Th>Saldo</Th>
                <Th>Tasa</Th>
                <Th>Pago mensual</Th>
                <Th>Acción</Th>
              </tr>
            </thead>
            <tbody class="divide-y divide-primary-100/40">
              <For each={debts()}>
                {(d) => (
                  <tr class="hover:bg-primary-50/40">
                    <td class="px-4 py-4">
                      <span
                        class="grid h-7 w-7 place-items-center rounded-full text-micro font-semibold"
                        classList={{
                          "bg-danger text-white": d.priority === 1,
                          "bg-accent/15 text-accent": d.priority === 2,
                          "bg-primary-50 text-primary": d.priority > 2,
                        }}
                      >
                        {d.priority}
                      </span>
                    </td>
                    <td class="px-4 py-4">
                      <div class="font-medium text-ink">{d.institution}</div>
                      <div class="text-micro text-ink-muted">{d.product}</div>
                    </td>
                    <td class="px-4 py-4 tabular-nums">{clp(d.balance)}</td>
                    <td class="px-4 py-4 tabular-nums">
                      <span
                        classList={{
                          "text-danger font-semibold": d.interest_rate >= 32,
                          "text-ink": d.interest_rate < 32,
                        }}
                      >
                        {d.interest_rate.toFixed(1)}%
                      </span>
                    </td>
                    <td class="px-4 py-4 tabular-nums">{clp(d.monthly_payment)}</td>
                    <td class="px-4 py-4 text-ink-muted">{d.action}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>

        {/* mobile cards */}
        <div class="space-y-3 p-4 md:hidden">
          <For each={debts()}>
            {(d) => (
              <article class="rounded-md border border-primary-100/60 bg-surface-raised p-4">
                <header class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-h3 text-ink">{d.institution}</p>
                    <p class="text-micro text-ink-muted">{d.product}</p>
                  </div>
                  <span
                    class="grid h-7 w-7 place-items-center rounded-full text-micro font-semibold"
                    classList={{
                      "bg-danger text-white": d.priority === 1,
                      "bg-accent/15 text-accent": d.priority === 2,
                      "bg-primary-50 text-primary": d.priority > 2,
                    }}
                  >
                    {d.priority}
                  </span>
                </header>
                <dl class="mt-3 grid grid-cols-3 gap-2 text-small">
                  <div>
                    <dt class="text-micro text-ink-muted">Saldo</dt>
                    <dd class="tabular-nums">{clp(d.balance)}</dd>
                  </div>
                  <div>
                    <dt class="text-micro text-ink-muted">Tasa</dt>
                    <dd
                      class="tabular-nums"
                      classList={{ "text-danger font-semibold": d.interest_rate >= 32 }}
                    >
                      {d.interest_rate.toFixed(1)}%
                    </dd>
                  </div>
                  <div>
                    <dt class="text-micro text-ink-muted">Pago</dt>
                    <dd class="tabular-nums">{clp(d.monthly_payment)}</dd>
                  </div>
                </dl>
                <p class="mt-3 text-small text-ink-muted">{d.action}</p>
              </article>
            )}
          </For>
        </div>
      </section>
    </div>
  );
}

function Th(props: { children: any }) {
  return (
    <th class="px-4 py-3 text-left text-micro font-semibold uppercase tracking-wide">
      {props.children}
    </th>
  );
}
