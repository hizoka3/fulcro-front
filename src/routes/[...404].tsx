import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <div class="container-pro flex min-h-[60vh] flex-col items-center justify-center gap-3 py-16 text-center">
      <p class="text-micro uppercase tracking-wide text-ink-muted">404</p>
      <h1 class="text-h1 text-primary">Esta página no existe</h1>
      <p class="text-body text-ink-muted text-pretty">
        Pero tu diagnóstico sí. Vuelve al inicio para empezar.
      </p>
      <A href="/" class="btn-primary mt-3">
        Ir al inicio
      </A>
    </div>
  );
}
