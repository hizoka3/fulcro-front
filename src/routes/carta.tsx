import { createSignal, createMemo, Show } from "solid-js";
import LoadingSpinner from "~/components/LoadingSpinner";
import { generarCarta, loadIngest } from "~/lib/api";

export default function CartaPage() {
  const data = createMemo(() => loadIngest());
  const [generating, setGenerating] = createSignal(false);
  const [downloaded, setDownloaded] = createSignal(false);
  const today = new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const blob = await generarCarta(data().anon_id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reclamo-sernac-${data().anon_id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloaded(true);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div class="container-pro grid gap-8 py-8 sm:py-10 md:grid-cols-12">
      {/* preview */}
      <div class="md:col-span-8">
        <div class="surface-card p-8 sm:p-12 leading-relaxed text-ink animate-fade-in">
          <div class="border-b border-primary-100/60 pb-6">
            <p class="text-micro uppercase tracking-wide text-ink-muted">Documento — borrador</p>
            <h1 class="mt-1 text-h1 text-primary">RECLAMO ANTE SERNAC</h1>
            <p class="mt-2 text-small text-ink-muted">Santiago, {today}</p>
          </div>

          <section class="mt-6 space-y-4 text-body">
            <p>
              <strong class="text-primary">Identificación del consumidor:</strong>{" "}
              {data().avatar.name} (presentado vía Fulcro — concierge anónimo).
            </p>

            <h2 class="text-h3 text-primary">I. Hechos</h2>
            <p>
              El proveedor <em>Retail Sur</em> me cobra una tasa de <strong>33,8% anual</strong>,
              superior a la Tasa Máxima Convencional vigente (32,4%) para créditos de consumo
              de mi tramo. Adicionalmente, en mis estados de cuenta detecto una comisión de
              mantención mensual no informada en el contrato original.
            </p>

            <h2 class="text-h3 text-primary">II. Derecho invocado</h2>
            <ul class="list-disc space-y-2 pl-5">
              <li>
                <strong>Art. 6° Ley 18.010:</strong> prohibición de estipular intereses que
                excedan en más de 50% al interés corriente vigente.
              </li>
              <li>
                <strong>Art. 17 B Ley 19.496:</strong> deber de informar la carga anual
                equivalente y el costo total del crédito.
              </li>
              <li>
                <strong>Art. 16 letra g) Ley 19.496:</strong> nulidad de cláusulas contrarias a
                la buena fe.
              </li>
            </ul>

            <h2 class="text-h3 text-primary">III. Petición</h2>
            <p>Solicito a SERNAC iniciar mediación con el proveedor para:</p>
            <ol class="list-decimal space-y-1 pl-5">
              <li>Recalcular la deuda aplicando la TMC vigente.</li>
              <li>Eliminar la comisión de mantención no informada.</li>
              <li>Restituir las sumas cobradas en exceso.</li>
            </ol>

            <p class="pt-4 italic text-ink-muted">
              {data().avatar.name} — vía Fulcro
            </p>
          </section>
        </div>
      </div>

      {/* actions */}
      <aside class="md:col-span-4">
        <div class="sticky top-24 space-y-4">
          <div class="surface-card p-6">
            <h2 class="text-h3 text-primary">Carta lista para enviar</h2>
            <p class="mt-2 text-small text-ink-muted text-pretty">
              Revisa el borrador. Si corresponde, descárgalo y envíalo por el formulario en
              línea de SERNAC.
            </p>

            <button
              type="button"
              class="btn-accent mt-5 w-full"
              onClick={handleDownload}
              disabled={generating()}
            >
              <Show when={generating()} fallback={<>Descargar carta</>}>
                <LoadingSpinner label="Generando…" />
              </Show>
            </button>

            <Show when={downloaded()}>
              <p class="mt-3 text-micro text-success">
                ✓ Descarga lista. Revisa el archivo en tu equipo.
              </p>
            </Show>

            <a
              class="btn-ghost mt-3 w-full"
              href="https://www.sernac.cl"
              target="_blank"
              rel="noreferrer"
            >
              Ir al portal SERNAC
            </a>
          </div>

          <div class="rounded-lg border border-primary-100/60 bg-primary-50/40 p-5 text-small text-ink-muted">
            <p class="mb-1 font-semibold text-primary">¿Sabías?</p>
            SERNAC media gratis. La empresa tiene 15 días hábiles para responder. Si no hay
            acuerdo, puedes acudir al Juzgado de Policía Local.
          </div>
        </div>
      </aside>
    </div>
  );
}
