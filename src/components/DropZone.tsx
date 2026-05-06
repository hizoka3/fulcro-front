import type { JSX } from "solid-js";
import { createSignal, Show } from "solid-js";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  onFile: (f: File) => void;
  loading?: boolean;
  loadingLabel?: string;
}

export default function DropZone(props: Props): JSX.Element {
  const [drag, setDrag] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;

  const handle = (f?: File | null) => {
    if (!f) return;
    props.onFile(f);
  };

  return (
    <div
      class="relative rounded-xl border-2 border-dashed bg-surface-raised p-8 transition-colors duration-200 ease-out-soft sm:p-12"
      classList={{
        "border-primary-200 hover:border-primary-300": !drag() && !props.loading,
        "border-accent bg-accent-50/50": drag(),
        "border-primary-200 cursor-progress": props.loading,
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        if (props.loading) return;
        const f = e.dataTransfer?.files?.[0];
        handle(f);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        class="sr-only"
        onChange={(e) => handle(e.currentTarget.files?.[0])}
        disabled={props.loading}
      />

      <Show
        when={!props.loading}
        fallback={
          <div class="flex flex-col items-center gap-4 text-center">
            <LoadingSpinner class="text-primary" />
            <div>
              <p class="text-h3 text-primary">Analizando tu informe…</p>
              <p class="text-small text-ink-muted">
                {props.loadingLabel ?? "Calculando carga financiera y detectando señales legales."}
              </p>
            </div>
            <div class="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-primary-50">
              <div class="h-full w-1/3 animate-[shimmer_1.6s_linear_infinite] rounded-full bg-gradient-to-r from-primary-200 via-primary to-primary-200 bg-[length:400px_100%]" />
            </div>
          </div>
        }
      >
        <div class="flex flex-col items-center gap-4 text-center">
          <div class="grid h-14 w-14 place-items-center rounded-full bg-primary-50 text-primary">
            <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 4v12m0-12l-4 4m4-4l4 4M5 20h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="space-y-1">
            <p class="text-h3 text-ink">Arrastra tu informe CMF aquí</p>
            <p class="text-small text-ink-muted">PDF — máximo 10 MB. Procesado de forma anónima.</p>
          </div>
          <button
            type="button"
            class="btn-primary"
            onClick={() => inputRef?.click()}
          >
            O selecciona un archivo
          </button>
          <p class="max-w-md text-micro text-ink-subtle">
            Tu informe nunca se almacena con tu identidad. Procesamos sólo los datos financieros y los descartamos al cerrar la sesión.
          </p>
        </div>
      </Show>
    </div>
  );
}
