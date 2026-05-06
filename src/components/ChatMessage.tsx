import type { JSX } from "solid-js";
import { Index, Show } from "solid-js";
import Avatar from "./Avatar";

interface Props {
  role: "user" | "concierge";
  text: string;
  streaming?: boolean;
  authorName?: string;
}

function renderInline(text: string): JSX.Element[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((p) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong class="font-semibold text-primary">{p.slice(2, -2)}</strong>;
    }
    return <>{p}</>;
  });
}

function Cursor() {
  return (
    <span
      class="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-current align-middle"
      aria-hidden="true"
    />
  );
}

export default function ChatMessage(props: Props): JSX.Element {
  const paragraphs = () => {
    const raw = props.text ?? "";
    const parts = raw.split(/\n{2,}/);
    // keep an empty paragraph when streaming starts so the cursor renders
    if (parts.length === 1 && parts[0] === "" && !props.streaming) return [];
    return parts;
  };
  const isUser = () => props.role === "user";

  return (
    <div
      class="flex gap-3 animate-fade-in"
      classList={{ "flex-row-reverse": isUser() }}
    >
      <Show
        when={!isUser()}
        fallback={
          <div class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-white text-micro font-semibold">
            Tú
          </div>
        }
      >
        <Avatar name={props.authorName ?? "Cóndor 4521"} size="sm" />
      </Show>

      <div
        class="max-w-[78%] space-y-2 rounded-lg px-4 py-3 text-body [contain:layout]"
        classList={{
          "bg-primary text-white shadow-card": isUser(),
          "bg-surface-raised text-ink ring-1 ring-primary-100/60 shadow-card": !isUser(),
        }}
      >
        <Index each={paragraphs()}>
          {(p, i) => {
            const isLast = () => i === paragraphs().length - 1;
            const isQuote = () => p().startsWith("> ");
            return (
              <Show
                when={!isQuote()}
                fallback={
                  <blockquote class="legal-quote">
                    {p().slice(2)}
                    <Show when={props.streaming && isLast()}>
                      <Cursor />
                    </Show>
                  </blockquote>
                }
              >
                <p class="whitespace-pre-wrap text-pretty leading-relaxed">
                  {renderInline(p())}
                  <Show when={props.streaming && isLast()}>
                    <Cursor />
                  </Show>
                </p>
              </Show>
            );
          }}
        </Index>
      </div>
    </div>
  );
}
