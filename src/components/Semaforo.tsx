import type { JSX } from "solid-js";
import { createMemo } from "solid-js";

interface Props {
  value: number;
  label?: string;
  helper?: string;
  ideal?: string;
}

export default function Semaforo(props: Props): JSX.Element {
  const clamped = () => Math.max(0, Math.min(100, props.value));
  const tone = createMemo(() => {
    const v = clamped();
    if (v < 30) return { fill: "bg-success", text: "text-success", label: "Saludable" };
    if (v < 50) return { fill: "bg-warning", text: "text-warning", label: "Atención" };
    return { fill: "bg-danger", text: "text-danger", label: "Riesgo alto" };
  });

  return (
    <div class="space-y-2">
      <div class="flex items-baseline justify-between gap-3">
        <span class="text-small text-ink-muted">{props.label ?? "Carga financiera"}</span>
        <span class={`font-semibold tabular-nums text-h2 ${tone().text}`}>
          {clamped()}%
        </span>
      </div>

      <div class="relative h-3 w-full overflow-hidden rounded-full bg-primary-50 ring-1 ring-primary-100/60">
        {/* threshold marker at 30% */}
        <div
          class="absolute top-0 bottom-0 w-px bg-primary-200/80"
          style={{ left: "30%" }}
          aria-hidden="true"
        />
        <div
          class={`h-full rounded-full ${tone().fill} transition-[width] duration-700 ease-out-soft`}
          style={{ width: `${clamped()}%` }}
        />
      </div>

      <div class="flex items-center justify-between text-small">
        <span class={tone().text + " font-medium"}>{tone().label}</span>
        <span class="text-ink-muted">{props.ideal ?? "Ideal: <30%"}</span>
      </div>

      {props.helper && (
        <p class="text-small text-ink-muted text-pretty">{props.helper}</p>
      )}
    </div>
  );
}
