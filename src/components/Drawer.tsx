import type { JSX } from "solid-js";
import { Show, onCleanup, onMount } from "solid-js";
import { Portal } from "solid-js/web";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: JSX.Element;
}

export default function Drawer(props: Props): JSX.Element {
  let panelRef: HTMLDivElement | undefined;

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") props.onClose();
  };

  onMount(() => {
    window.addEventListener("keydown", handleKey);
    onCleanup(() => window.removeEventListener("keydown", handleKey));
  });

  return (
    <Show when={props.open}>
      <Portal>
        <div class="fixed inset-0 z-50">
          <div
            class="absolute inset-0 bg-primary-900/40 backdrop-blur-sm transition-opacity duration-200"
            onClick={props.onClose}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            class="absolute right-0 top-0 h-full w-full max-w-[480px] bg-surface-raised shadow-drawer animate-slide-in-right
                   sm:max-w-[440px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            <header class="flex items-center justify-between border-b border-primary-100/60 px-6 py-4">
              <h2 id="drawer-title" class="text-h3 text-primary">
                {props.title}
              </h2>
              <button
                type="button"
                class="grid h-9 w-9 place-items-center rounded-full text-ink-muted hover:bg-primary-50 hover:text-ink"
                aria-label="Cerrar"
                onClick={props.onClose}
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              </button>
            </header>
            <div class="h-[calc(100%-65px)] overflow-y-auto px-6 py-5">{props.children}</div>
          </div>
        </div>
      </Portal>
    </Show>
  );
}
