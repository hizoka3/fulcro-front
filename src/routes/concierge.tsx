import { createSignal, For, onMount, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import ChatMessage from "~/components/ChatMessage";
import Avatar from "~/components/Avatar";
import { chat, loadIngest } from "~/lib/api";

interface Msg {
  id: number;
  role: "user" | "concierge";
  text: string;
  streaming?: boolean;
}

export default function ConciergePage() {
  const data = createMemo(() => loadIngest());
  const [messages, setMessages] = createStore<Msg[]>([]);
  const [input, setInput] = createSignal("");
  const [sending, setSending] = createSignal(false);
  let nextId = 0;

  onMount(() => {
    setMessages([
      {
        id: nextId++,
        role: "concierge",
        text: data().concierge_intro ?? "Hola.",
      },
    ]);
  });

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: document.documentElement.scrollHeight });
    });
  };

  const send = async (e?: Event) => {
    e?.preventDefault();
    const text = input().trim();
    if (!text || sending()) return;
    setInput("");
    setSending(true);

    setMessages(messages.length, { id: nextId++, role: "user", text });
    scrollToBottom();

    const replyIdx = messages.length;
    setMessages(replyIdx, { id: nextId++, role: "concierge", text: "", streaming: true });
    scrollToBottom();

    try {
      for await (const tok of chat(data().anon_id, text)) {
        setMessages(replyIdx, "text", (t) => t + tok);
        scrollToBottom();
      }
      setMessages(replyIdx, "streaming", false);
    } finally {
      setSending(false);
    }
  };

  const suggested = ["¿Por qué mi tasa es tan alta?", "Quiero refinanciar", "Genera la carta SERNAC"];

  return (
    <div class="mx-auto flex min-h-[calc(100svh-9rem)] max-w-3xl flex-col px-4 sm:min-h-[calc(100svh-4rem)] sm:px-6">
      <header class="flex items-center gap-3 border-b border-primary-100/60 py-4">
        <Avatar name={data().avatar.name} size="md" />
        <div>
          <h1 class="text-h3 text-primary">Concierge de {data().avatar.name}</h1>
          <p class="text-small text-ink-muted">Anónimo · Citas con artículo · Sin venta</p>
        </div>
      </header>

      <div class="flex-1 space-y-4 py-6">
        <For each={messages}>
          {(m) => (
            <ChatMessage
              role={m.role}
              text={m.text}
              streaming={m.streaming}
              authorName={data().avatar.name}
            />
          )}
        </For>
      </div>

      <div class="sticky bottom-0 space-y-3 border-t border-primary-100/60 bg-surface/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div class="flex flex-wrap gap-2">
          <For each={suggested}>
            {(s) => (
              <button
                type="button"
                class="chip bg-surface-raised text-ink-muted ring-1 ring-primary-100/60 hover:bg-primary-50 hover:text-primary transition-colors"
                onClick={() => {
                  setInput(s);
                  void send();
                }}
                disabled={sending()}
              >
                {s}
              </button>
            )}
          </For>
        </div>
        <form onSubmit={send} class="flex items-end gap-2">
          <label class="sr-only" for="msg">
            Mensaje
          </label>
          <textarea
            id="msg"
            class="flex-1 resize-none rounded-md border border-primary-100/80 bg-surface-raised px-4 py-3 text-body shadow-card focus:border-primary focus:outline-none"
            rows="1"
            placeholder="Escríbele a tu concierge…"
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            disabled={sending()}
          />
          <button type="submit" class="btn-primary h-12 px-5" disabled={sending() || !input().trim()}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
