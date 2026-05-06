import type { JSX } from "solid-js";
import { useLocation, A } from "@solidjs/router";
import { Show } from "solid-js";
import Logo from "./Logo";

interface Props {
  children: JSX.Element;
}

const NAV = [
  { href: "/diagnostico", label: "Diagnóstico", icon: "chart" },
  { href: "/concierge", label: "Concierge", icon: "chat" },
  { href: "/carta", label: "Carta", icon: "doc" },
  { href: "/plan", label: "Plan", icon: "list" },
  { href: "/comparador", label: "Alternativas", icon: "swap" },
  { href: "/alertas", label: "Alertas", icon: "bell" },
];

function Icon(props: { name: string; class?: string }) {
  const cls = `h-5 w-5 ${props.class ?? ""}`;
  switch (props.name) {
    case "chart":
      return (
        <svg class={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 20V10m6 10V4m6 16v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      );
    case "chat":
      return (
        <svg class={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
        </svg>
      );
    case "doc":
      return (
        <svg class={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
          <path d="M14 3v6h5" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
        </svg>
      );
    case "list":
      return (
        <svg class={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      );
    case "swap":
      return (
        <svg class={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 7h13l-3-3M17 17H4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      );
    case "bell":
      return (
        <svg class={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
          <path d="M10 21h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AppShell(props: Props): JSX.Element {
  const loc = useLocation();
  const isLanding = () => loc.pathname === "/";

  return (
    <div class="min-h-screen flex flex-col">
      <Show when={!isLanding()}>
        {/* Cabecera institucional · gov-style */}
        <header class="sticky top-0 z-30 bg-ink text-paper">
          <div class="container-pro flex h-16 items-center justify-between">
            <A href="/" aria-label="Volver al inicio" class="flex items-center gap-3.5">
              <Logo
                variant="horizontal"
                size={20}
                fg="oklch(0.975 0.005 85)"
                accent="oklch(0.65 0.12 28)"
                withRing={false}
              />
              <span class="hidden h-[18px] w-px bg-paper/25 md:block" />
              <span class="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-paper/70 md:inline">
                Concierge financiero
              </span>
            </A>

            <nav class="hidden items-center gap-1 md:flex">
              {NAV.map((item) => (
                <A
                  href={item.href}
                  class="flex items-center gap-2 rounded-sm px-3 py-2 text-small text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
                  activeClass="text-paper font-medium bg-paper/10"
                  end={false}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </A>
              ))}
            </nav>

            <div class="hidden md:block">
              <span class="font-mono text-[9px] uppercase tracking-[0.22em] text-paper/70">
                <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success align-middle" />
                Sesión anónima
              </span>
            </div>
          </div>

          {/* Banda institucional (paperWarm) */}
          <div class="hidden border-y border-rule bg-paper-warm md:block">
            <div class="container-pro flex justify-between py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted">
              <span>Servicio público · Sin venta · Anónimo</span>
              <span>Cumplimiento Ley 21.719 · No constituye asesoría legal</span>
            </div>
          </div>
        </header>
      </Show>

      <main class="flex-1">{props.children}</main>

      <Show when={!isLanding()}>
        <nav class="sticky bottom-0 z-30 border-t border-rule bg-paper-raised/95 backdrop-blur md:hidden">
          <div class="grid grid-cols-6">
            {NAV.map((item) => (
              <A
                href={item.href}
                class="flex flex-col items-center justify-center gap-1 py-2 text-[11px] text-ink-muted"
                activeClass="text-ink font-medium"
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </A>
            ))}
          </div>
        </nav>
      </Show>
    </div>
  );
}
