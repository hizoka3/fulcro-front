import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Logo from "~/components/Logo";
import DropZone from "~/components/DropZone";
import { ingest } from "~/lib/api";

export default function LandingPage() {
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const handleFile = async (f: File) => {
    setLoading(true);
    try {
      await ingest(f);
      navigate("/diagnostico");
    } catch {
      setLoading(false);
    }
  };

  return (
    <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-surface to-surface-sunken">
      <div class="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* ambient orbs */}
      <div
        class="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #FF7A59, transparent)" }}
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -bottom-32 -left-32 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #0A2540, transparent)" }}
        aria-hidden="true"
      />

      <header class="relative z-10">
        <div class="container-pro flex h-16 items-center justify-between">
          <Logo />
          <div class="hidden items-center gap-3 text-small text-ink-muted sm:flex">
            <span class="chip bg-surface-raised ring-1 ring-primary-100/60 text-ink-muted">
              Sin venta · Sin registro
            </span>
          </div>
        </div>
      </header>

      <section class="relative z-10">
        <div class="container-pro grid gap-10 py-10 sm:py-16 md:grid-cols-12 md:gap-12 md:py-24">
          <div class="md:col-span-7 lg:col-span-7">
            <p class="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-100/60 bg-surface-raised/70 px-3 py-1 text-micro text-ink-muted backdrop-blur">
              <span class="h-1.5 w-1.5 rounded-full bg-accent" />
              Concierge financiero anónimo · Chile
            </p>
            <h1 class="text-balance text-[40px] font-semibold leading-[1.05] tracking-tight text-primary sm:text-[56px]">
              Tu deuda no te define.
              <span class="block text-ink"> Conoce tus derechos antes de pagar el próximo peso.</span>
            </h1>
            <p class="mt-5 max-w-xl text-pretty text-body text-ink-muted sm:text-[18px]">
              Sube tu informe de deudas CMF y recibe un diagnóstico claro, con citas a la
              <strong class="text-primary"> ley chilena</strong>. Sin venta. Sin registro.
              Privacidad por arquitectura.
            </p>

            <ul class="mt-7 grid gap-3 text-small text-ink-muted sm:grid-cols-3">
              <li class="flex items-center gap-2">
                <DotCheck /> Citas con artículo
              </li>
              <li class="flex items-center gap-2">
                <DotCheck /> Carta de reclamo SERNAC
              </li>
              <li class="flex items-center gap-2">
                <DotCheck /> Plan de salida priorizado
              </li>
            </ul>
          </div>

          <div class="md:col-span-5 lg:col-span-5">
            <DropZone onFile={handleFile} loading={loading()} />
            <p class="mt-3 text-center text-micro text-ink-subtle">
              ¿No tienes el informe? <a class="btn-link" href="https://conocetudeuda.cmfchile.cl/informe-deudas/629/w4-contents.html" target="_blank" rel="noreferrer">Cómo obtenerlo en CMF</a>
            </p>
          </div>
        </div>
      </section>

      <section class="relative z-10 border-t border-primary-100/60 bg-surface-raised/60 backdrop-blur">
        <div class="container-pro grid gap-6 py-10 md:grid-cols-3">
          <Trust
            title="Anónimo por defecto"
            body="Trabajamos con un pseudónimo (ej. ‘Cóndor 4521’). Tu RUT no se almacena."
          />
          <Trust
            title="Citas verificables"
            body="Cada recomendación incluye el artículo de ley, con link a la fuente oficial."
          />
          <Trust
            title="Sin conflicto de interés"
            body="No vendemos productos financieros. No cobramos comisiones a bancos."
          />
        </div>
      </section>

      <footer class="relative z-10 border-t border-primary-100/60 py-6">
        <div class="container-pro flex flex-col items-start justify-between gap-2 text-micro text-ink-muted sm:flex-row">
          <span>© 2026 Fulcro — Sin venta. Sin registro. Privacidad por arquitectura.</span>
          <span>Hecho en Chile · Datos públicos CMF · Ley 19.496 / 18.010</span>
        </div>
      </footer>
    </div>
  );
}

function DotCheck() {
  return (
    <span class="grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
      <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  );
}

function Trust(props: { title: string; body: string }) {
  return (
    <div>
      <h3 class="text-h3 text-primary">{props.title}</h3>
      <p class="mt-1 text-small text-ink-muted text-pretty">{props.body}</p>
    </div>
  );
}
