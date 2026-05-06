import type { JSX } from "solid-js";
import type { Segment } from "~/lib/types";

const META: Record<Segment, { label: string; level: string; bg: string; text: string; ring: string }> = {
  unbanked: {
    label: "Sin productos formales",
    level: "Nivel 0",
    bg: "bg-ink/5",
    text: "text-ink",
    ring: "ring-ink/15",
  },
  recently_banked: {
    label: "Recientemente bancarizado",
    level: "Nivel 1",
    bg: "bg-warning/10",
    text: "text-warning",
    ring: "ring-warning/30",
  },
  vulnerable: {
    label: "Bancarizado vulnerable",
    level: "Nivel 2",
    bg: "bg-danger/10",
    text: "text-danger",
    ring: "ring-danger/30",
  },
  functional: {
    label: "Funcional",
    level: "Nivel 3",
    bg: "bg-success/10",
    text: "text-success",
    ring: "ring-success/30",
  },
};

export default function BadgeNivel(props: { segment: Segment }): JSX.Element {
  const m = () => META[props.segment];
  return (
    <span
      class={`chip ${m().bg} ${m().text} ring-1 ${m().ring}`}
      aria-label={`${m().level} - ${m().label}`}
    >
      <span class="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {m().level} · {m().label}
    </span>
  );
}
