import type { JSX } from "solid-js";
import { Show } from "solid-js";

type Variant = "seal" | "wordmark" | "horizontal" | "lockup";

interface SealProps {
  size?: number;
  fg?: string;
  accent?: string;
  withRing?: boolean;
  class?: string;
}

export function FulcroSeal(props: SealProps): JSX.Element {
  const size = () => props.size ?? 32;
  const fg = () => props.fg ?? "currentColor";
  const accent = () => props.accent ?? "oklch(0.50 0.16 28)";
  const ring = () => props.withRing ?? size() >= 50;

  return (
    <svg
      width={size()}
      height={size()}
      viewBox="0 0 100 100"
      class={`block shrink-0 ${props.class ?? ""}`}
      aria-hidden="true"
    >
      <Show when={ring()}>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={fg()}
          stroke-width="0.6"
          stroke-dasharray="1 2.2"
          opacity="0.55"
        />
      </Show>
      <polygon
        points="50,10 84,30 84,70 50,90 16,70 16,30"
        fill="none"
        stroke={fg()}
        stroke-width="2"
      />
      <polygon
        points="50,22 74,36 74,64 50,78 26,64 26,36"
        fill="none"
        stroke={fg()}
        stroke-width="0.8"
        opacity="0.45"
      />
      <line
        x1="22"
        y1="55"
        x2="78"
        y2="48"
        stroke={fg()}
        stroke-width="2.4"
        stroke-linecap="square"
      />
      <polygon points="50,52 41,72 59,72" fill={fg()} />
      <circle cx="26" cy="56" r="2.2" fill={accent()} />
    </svg>
  );
}

interface WordmarkProps {
  size?: number;
  weight?: number;
  color?: string;
  class?: string;
}

export function Wordmark(props: WordmarkProps): JSX.Element {
  return (
    <span
      class={`font-serif leading-[0.95] ${props.class ?? ""}`}
      style={{
        "font-weight": String(props.weight ?? 500),
        "font-size": `${props.size ?? 28}px`,
        "letter-spacing": "-0.02em",
        color: props.color ?? "currentColor",
        "font-variation-settings": "'opsz' 144, 'SOFT' 30",
      }}
    >
      Fulcro
    </span>
  );
}

interface LogoProps {
  variant?: Variant;
  size?: number;
  fg?: string;
  accent?: string;
  withRing?: boolean;
  tagline?: boolean;
  class?: string;
  /** Back-compat: render mark only (equivalent to variant="seal"). */
  mark?: boolean;
}

export default function Logo(props: LogoProps): JSX.Element {
  const variant = (): Variant => {
    if (props.mark) return "seal";
    return props.variant ?? "horizontal";
  };
  const size = () => props.size ?? 28;
  const sealSize = () => Math.round(size() * 1.15);

  return (
    <Show
      when={variant() !== "seal"}
      fallback={
        <FulcroSeal
          size={size()}
          fg={props.fg}
          accent={props.accent}
          withRing={props.withRing}
          class={props.class}
        />
      }
    >
      <Show
        when={variant() !== "wordmark"}
        fallback={
          <Wordmark size={size() * 1.6} color={props.fg} class={props.class} />
        }
      >
        <Show
          when={variant() !== "lockup"}
          fallback={
            <span
              class={`inline-flex flex-col items-center gap-3 ${props.class ?? ""}`}
            >
              <FulcroSeal
                size={sealSize() * 1.6}
                fg={props.fg}
                accent={props.accent}
                withRing={props.withRing}
              />
              <Wordmark size={size() * 2.4} color={props.fg} />
              <Show when={props.tagline ?? true}>
                <span
                  class="font-serif italic text-ink-soft"
                  style={{
                    "font-size": `${Math.max(11, size() * 0.5)}px`,
                    "letter-spacing": "0.01em",
                  }}
                >
                  Da mihi punctum firmum, et terram movebo.
                </span>
              </Show>
            </span>
          }
        >
          {/* horizontal */}
          <span class={`inline-flex items-center gap-2.5 ${props.class ?? ""}`}>
            <FulcroSeal
              size={sealSize()}
              fg={props.fg}
              accent={props.accent}
              withRing={props.withRing}
            />
            <span class="flex flex-col gap-0.5">
              <Wordmark size={size() * 1.4} color={props.fg} />
              <Show when={props.tagline}>
                <span class="font-mono text-[8px] uppercase tracking-[0.24em] text-ink-muted">
                  Concierge financiero
                </span>
              </Show>
            </span>
          </span>
        </Show>
      </Show>
    </Show>
  );
}
