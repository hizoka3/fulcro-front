import { createSignal, For, Show, createMemo } from "solid-js";
import { A } from "@solidjs/router";
import Avatar from "~/components/Avatar";
import BadgeNivel from "~/components/BadgeNivel";
import Semaforo from "~/components/Semaforo";
import DeudaCard from "~/components/DeudaCard";
import Drawer from "~/components/Drawer";
import { loadIngest } from "~/lib/api";
import { clp } from "~/lib/format";
import type { LegalRef } from "~/lib/types";

export default function DiagnosticoPage() {
  const data = createMemo(() => loadIngest());
  const [legal, setLegal] = createSignal<LegalRef | null>(null);

  return (
    <div class="container-pro space-y-10 py-8 sm:py-10">
      {/* Header */}
      <header class="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
        <Avatar name={data().avatar.name} size="lg" class="animate-scale-in" />
        <div class="space-y-2">
          <p class="text-micro uppercase tracking-wide text-ink-muted">Tu perfil anónimo</p>
          <h1 class="text-h1 text-primary">{data().avatar.name}</h1>
          <BadgeNivel segment={data().segment} />
        </div>
      </header>

      {/* Snapshot row */}
      <section class="grid gap-5 md:grid-cols-3">
        <div class="surface-card md:col-span-2 p-6">
          <Semaforo
            value={data().features.carga_financiera_pct}
            helper={`Tu deuda mensual representa el ${data().features.carga_financiera_pct}% de tu ingreso. Saludable es < 30%.`}
          />
          <dl class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Deuda total" value={clp(data().features.total_debt)} />
            <Stat label="Instituciones" value={String(data().features.num_institutions)} />
            <Stat label="Refinanciamientos" value={String(data().features.num_refinancings)} />
            <Stat
              label="Mora"
              value={`${(data().features.past_due_ratio * 100).toFixed(0)}%`}
              tone={data().features.past_due_ratio > 0.1 ? "danger" : undefined}
            />
          </dl>
        </div>

        <aside class="surface-card p-6">
          <p class="text-micro uppercase tracking-wide text-ink-muted">Próximo objetivo</p>
          <h3 class="mt-1 text-h3 text-primary">Bajar a 35% en 6 meses</h3>
          <Roadmap level={2} />
          <A href="/plan" class="btn-link mt-4 text-small">
            Ver plan de salida
            <Arrow />
          </A>
        </aside>
      </section>

      {/* Problemas */}
      <section class="space-y-4">
        <header class="flex items-end justify-between gap-3">
          <div>
            <h2 class="text-h2 text-primary">
              Detecté {data().recommendations.length} problemas
            </h2>
            <p class="text-small text-ink-muted">
              Cada uno tiene base en una norma vigente. Pulsa para ver la cita.
            </p>
          </div>
          <span class="hidden chip bg-danger/10 text-danger ring-1 ring-danger/20 sm:inline-flex">
            Acción recomendada
          </span>
        </header>

        <div class="grid gap-4">
          <For each={data().recommendations}>
            {(rec, i) => (
              <DeudaCard
                index={i()}
                title={rec.title}
                description={rec.action}
                legal={rec.legal}
                onOpenLegal={(l) => setLegal(l)}
              />
            )}
          </For>
        </div>
      </section>

      {/* CTAs */}
      <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Cta
          href="/concierge"
          tone="primary"
          title="Hablar con Concierge"
          desc="Conversación con citas legales en vivo."
        />
        <Cta
          href="/carta"
          tone="accent"
          title="Generar carta de reclamo"
          desc="SERNAC, lista para revisar y enviar."
        />
        <Cta href="/plan" title="Ver plan de salida" desc="Tus 4 deudas priorizadas." />
        <Cta href="/comparador" title="Ver alternativas" desc="3 productos con menor CAE." />
      </section>

      <Drawer open={legal() !== null} onClose={() => setLegal(null)} title="Fundamento legal">
        <Show when={legal()}>
          {(l) => (
            <div class="space-y-5">
              <div>
                <p class="text-micro uppercase tracking-wide text-ink-muted">{l().ref}</p>
                <h3 class="text-h2 text-primary">{l().title}</h3>
              </div>
              <blockquote class="legal-quote text-body">"{l().quote}"</blockquote>
              <p class="text-small text-ink-muted text-pretty">
                Esta cita aplica directamente a uno de los hallazgos en tu informe. Puedes
                invocarla en una carta de reclamo o en una mediación SERNAC.
              </p>
              <a class="btn-primary w-full" href={l().url} target="_blank" rel="noreferrer">
                Ver ley completa en BCN
                <Arrow class="text-white" />
              </a>
            </div>
          )}
        </Show>
      </Drawer>
    </div>
  );
}

function Stat(props: { label: string; value: string; tone?: "danger" }) {
  return (
    <div>
      <dt class="text-micro uppercase tracking-wide text-ink-muted">{props.label}</dt>
      <dd
        class="mt-0.5 text-h3 tabular-nums"
        classList={{ "text-danger": props.tone === "danger", "text-primary": !props.tone }}
      >
        {props.value}
      </dd>
    </div>
  );
}

function Roadmap(props: { level: number }) {
  const nodes = [
    { n: 0, label: "No bancarizado" },
    { n: 1, label: "Recientemente bancarizado" },
    { n: 2, label: "Vulnerable" },
    { n: 3, label: "Funcional" },
  ];
  return (
    <div class="mt-4">
      <div class="relative flex items-center justify-between">
        <div class="absolute left-0 right-0 top-1/2 -z-0 h-px -translate-y-1/2 bg-primary-100" />
        <For each={nodes}>
          {(node) => (
            <div class="relative flex flex-col items-center gap-1">
              <div
                class="grid h-7 w-7 place-items-center rounded-full text-micro font-semibold ring-1"
                classList={{
                  "bg-primary text-white ring-primary": node.n === props.level,
                  "bg-success text-white ring-success": node.n < props.level,
                  "bg-surface-raised text-ink-muted ring-primary-100": node.n > props.level,
                }}
              >
                {node.n < props.level ? "✓" : node.n}
              </div>
              <span
                class="text-[10px] tracking-wide"
                classList={{
                  "text-primary font-medium": node.n === props.level,
                  "text-ink-muted": node.n !== props.level,
                }}
              >
                {node.label}
              </span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

function Cta(props: { href: string; title: string; desc: string; tone?: "primary" | "accent" }) {
  const isPrimary = props.tone === "primary";
  const isAccent = props.tone === "accent";
  return (
    <A
      href={props.href}
      class="group flex flex-col gap-1 rounded-lg border p-5 text-left transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-card-hover"
      classList={{
        "bg-primary text-white border-primary shadow-card": isPrimary,
        "bg-accent text-white border-accent shadow-card": isAccent,
        "bg-surface-raised text-ink border-primary-100/60 shadow-card": !isPrimary && !isAccent,
      }}
    >
      <span
        class="text-h3 font-semibold"
        classList={{
          "text-white": isPrimary || isAccent,
          "text-primary": !isPrimary && !isAccent,
        }}
      >
        {props.title}
      </span>
      <span
        class="text-small"
        classList={{
          "text-white/85": isPrimary || isAccent,
          "text-ink-muted": !isPrimary && !isAccent,
        }}
      >
        {props.desc}
      </span>
      <span class="mt-3 inline-flex items-center gap-1 text-small opacity-90 group-hover:translate-x-0.5 transition-transform">
        Ir <Arrow />
      </span>
    </A>
  );
}

function Arrow(props: { class?: string }) {
  return (
    <svg class={`h-4 w-4 ${props.class ?? ""}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}
