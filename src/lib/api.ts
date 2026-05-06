import type { IngestResult, Alert } from "./types";
import maria from "~/fixtures/personas/maria.json";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

let lastIngest: IngestResult | null = null;

export function getCachedIngest(): IngestResult | null {
  return lastIngest;
}

export async function ingest(_file: File): Promise<IngestResult> {
  await sleep(2800);
  lastIngest = maria as IngestResult;
  if (typeof window !== "undefined") {
    sessionStorage.setItem("fulcro:ingest", JSON.stringify(lastIngest));
  }
  return lastIngest;
}

export function loadIngest(): IngestResult {
  if (lastIngest) return lastIngest;
  if (typeof window !== "undefined") {
    const cached = sessionStorage.getItem("fulcro:ingest");
    if (cached) {
      lastIngest = JSON.parse(cached) as IngestResult;
      return lastIngest;
    }
  }
  lastIngest = maria as IngestResult;
  return lastIngest;
}

const SCRIPTED: Record<string, string[]> = {
  default: [
    "Buena pregunta. Déjame revisar tu informe…",
    "Lo que veo en tus datos sugiere atacar primero la deuda más cara: tu tarjeta de Retail Sur al 33,8%.",
    "Esa tasa está al filo de la **Tasa Máxima Convencional**. Te conviene pedir revisión.",
  ],
  tasa: [
    "Tu tasa con Retail Sur es 33,8%. La TMC vigente para tu tramo es 32,4%.",
    "Según el **Art. 6° de la Ley 18.010**, no puede pactarse interés que exceda en más de 50% al interés corriente vigente.",
    "Te puedo ayudar a redactar una solicitud formal de revisión y, si no responden, un reclamo SERNAC.",
  ],
  refinanciar: [
    "Has refinanciado 3 veces en 18 meses. Cada refinanciamiento suele renovar capital sin reducirlo realmente.",
    "Pide a Banco Andes la cartola histórica completa y el cuadro de amortización original.",
    "Si detectamos costos no informados, aplica el **Art. 17 B de la Ley 19.496**.",
  ],
  carta: [
    "Puedo generar una carta de reclamo SERNAC ahora mismo.",
    "Incluiré los artículos invocados y los hechos detectados en tu informe. Tú la revisas y decides si la envías.",
    "Pulsa **Generar carta** cuando estés lista.",
  ],
};

function pickScript(message: string): string[] {
  const m = message.toLowerCase();
  if (m.includes("tasa") || m.includes("interes") || m.includes("interés")) return SCRIPTED.tasa;
  if (m.includes("refinan")) return SCRIPTED.refinanciar;
  if (m.includes("carta") || m.includes("reclamo") || m.includes("sernac")) return SCRIPTED.carta;
  return SCRIPTED.default;
}

export async function* chat(_anonId: string, message: string): AsyncGenerator<string, void, unknown> {
  const lines = pickScript(message);
  for (const line of lines) {
    const tokens = line.split(/(\s+)/);
    for (const tok of tokens) {
      await sleep(28 + Math.random() * 40);
      yield tok;
    }
    yield "\n\n";
  }
}

export async function generarCarta(anonId: string): Promise<Blob> {
  await sleep(900);
  const today = new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
  const body = `RECLAMO ANTE EL SERVICIO NACIONAL DEL CONSUMIDOR (SERNAC)

Santiago, ${today}

Identificación del consumidor: ${anonId} (presentado vía Fulcro — concierge anónimo).

I. Hechos
El proveedor Retail Sur me cobra una tasa de 33,8% anual, superior a la Tasa Máxima Convencional vigente (32,4%) para créditos de consumo de mi tramo. Adicionalmente, en mis estados de cuenta detecto una comisión de mantención mensual no informada en el contrato original.

II. Derecho invocado
- Art. 6° Ley 18.010: prohibición de estipular intereses que excedan en más de 50% al interés corriente vigente.
- Art. 17 B Ley 19.496: deber de informar la carga anual equivalente y el costo total del crédito.
- Art. 16 letra g) Ley 19.496: nulidad de cláusulas contrarias a la buena fe.

III. Petición
Solicito a SERNAC iniciar mediación con el proveedor para:
1) Recalcular la deuda aplicando la TMC vigente.
2) Eliminar la comisión de mantención no informada.
3) Restituir las sumas cobradas en exceso desde la celebración del contrato.

Atentamente,
${anonId} — vía Fulcro`;
  return new Blob([body], { type: "text/plain;charset=utf-8" });
}

export async function getAlerts(): Promise<Alert[]> {
  await sleep(180);
  return (maria as IngestResult).alerts ?? [];
}
