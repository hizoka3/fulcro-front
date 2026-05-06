# Backend `fulcro` — capacidad técnica e integración con este FE

> Evaluación realizada el 2026-05-06. Estado del repo backend: skeleton inicial, megaprompt 00 ejecutado, BE-1 y BE-2 sin ejecutar.
> Ruta del repo backend: `/Users/dariomunoz/Desktop/Incandenza/fulcro`

---

## 1. Stack del backend

- **Framework:** FastAPI 0.110.0 + Uvicorn 0.27.0
- **Python:** 3.12.4 (`backend/.python-version`)
- **DB:** SQLite (`sqlite:///./defensor.db`) + SQLAlchemy 2.0.25
- **Validación:** Pydantic 2.6.0
- **PDF:** pdfplumber 0.10.3 + python-multipart 0.0.9
- **IA:** anthropic 0.34.0 + chromadb 0.4.22 + sentence-transformers 2.3.0 (RAG)
- **Tests:** pytest 8.0.0
- **CORS:** middleware activo, `allow_origins=["http://localhost:3000"]`, credentials true, methods/headers `*`

Setup completo, dependencias fijas y versionadas. Listo para desarrollo.

---

## 2. Endpoints — implementados vs. esperados por este FE

| Endpoint | Método | Lo llama el FE | Backend hoy |
|---|---|---|---|
| `/ingest` | POST | sí (multipart PDF) | **stub vacío** — router montado, archivo `app/api/ingest.py` con sólo comentario "Implemented in BE1-1" |
| `/chat/{anon_id}` | POST (SSE) | sí | **stub vacío** — "Owned by BE-2" |
| `/carta/{anon_id}` | POST → blob PDF | sí | **stub vacío** |
| `/alerts` | GET | sí | **stub vacío** |
| `/health` | GET | — | ✅ funciona — retorna `{"ok": true, "version": "0.1.0"}` |
| `/profile/{anon_id}` | GET | — | ❌ no existe (mencionado en `docs/API_CONTRACT.md` pero no creado) |

Resultado neto: **cualquier llamada del FE a un endpoint real fallaría con 404/405**.

---

## 3. Compatibilidad de schemas (FE ↔ BE)

`backend/app/models/schemas.py` está perfectamente alineado con `defensor/src/lib/types.ts`:

- `Segment` enum coincide: `unbanked` | `recently_banked` | `vulnerable` | `functional`.
- `Avatar { name, image_url }` coincide.
- `Features` con: `total_debt`, `consumo_ratio`, `past_due_ratio`, `num_institutions`, `num_refinancings`, `has_mortgage`, `carga_financiera_pct`, `dominant_signal` — coincide.
- `Recommendation { id, title, trigger, action, priority, explanation_short?, articulos_referencia? }` — encaja con el del FE (FE usa `legal?` con `ref/title/quote/url`, BE usa `articulos_referencia` — pequeño desajuste de nombres aquí; ver §6).
- `IngestResult` shape correcta.

Fixtures `fixtures/personas/{maria,carlos,pedro}.json` existen pero `recommendations` viene vacía. `fixtures/recommendations.json` es `[]`.

---

## 4. CORS

`backend/app/main.py` permite sólo `http://localhost:3000`. Este FE (vinxi) suele caer en **3010** porque el 3000 está ocupado en la máquina del usuario.

**Acción requerida:** añadir el puerto real al `allow_origins` (cambio de 1 línea). Sin esto, el navegador bloqueará todas las llamadas reales.

---

## 5. Streaming / SSE en `/chat`

No implementado. Plan declarado (megaprompt BE2-3):
- `StreamingResponse` con SSE
- Cliente Anthropic (Sonnet)
- MCP RAG para citas legales — **no citar de memoria**

Hoy: ni el cliente Anthropic ni el servidor MCP existen.

---

## 6. Desajustes detectados (no bloqueantes, pero requieren decisión)

1. **Nombres de campos legales**: FE espera `recommendation.legal = { ref, title, quote, url }`. BE usa `articulos_referencia` (lista). Hay que decidir un solo formato y propagarlo.
2. **`/profile/{anon_id}`** está en el contrato pero no en el código BE. El FE actual no lo usa, pero si lo usa después necesita implementación.
3. **`carga_financiera_pct`**: el FE lo trata como entero 0-100 (52). El fixture de María en `fulcro` lo guarda como 0.52. Hay que normalizar.
4. **`recommendations.json` vacío**: BE2-1 debe poblar el catálogo (≥20 entradas curadas con artículo de ley).

---

## 7. Estado de madurez (resumen)

| Pieza | Estado |
|---|---|
| Estructura del repo | ✅ |
| `pyproject.toml` / requirements | ✅ |
| Schemas Pydantic | ✅ |
| `/health` | ✅ |
| CORS middleware | ✅ (puerto a ajustar) |
| Schema DB | ❌ vacío |
| Parser PDF CMF | ❌ no existe |
| Classifier de segmento | ❌ no existe |
| Anonymizer (RUT → Cóndor 4521) | ❌ no existe |
| `/ingest` lógica | ❌ stub |
| `/alerts` lógica | ❌ stub |
| `/carta` generador PDF | ❌ stub |
| MCP RAG server | ❌ no existe |
| `/chat` SSE + Anthropic | ❌ stub |
| Catálogo de recomendaciones | ❌ vacío |

**Fase actual:** "skeleton inicial" — hora 0 del cronograma del hackathon.

---

## 8. Plan declarado en `fulcro/plan/`

El repo `fulcro` trae los mismos megaprompts que `Incandenza/01_FE_frontend.md`:

- `plan/00_PRINCIPAL_setup_repo.md` — ✅ ejecutado
- `plan/01_FE_frontend.md` — copia del que tenemos en Incandenza (ya ejecutado FE-1 acá)
- `plan/02_BE1_pipeline.md` — 5 megaprompts BE-1 (parser, /ingest, /alerts, /carta stub, integración FE, fixtures, deploy). **0% ejecutado**.
- `plan/03_BE2_ia_pitch.md` — 6 megaprompts BE-2 (catálogo, MCP RAG, concierge SSE, carta real, verificación, pitch). **0% ejecutado** (sólo el scaffold de fixtures existe).

---

## 9. ¿Puede este FE SolidStart conectarse hoy?

**No.** Razones:

1. Los 4 endpoints reales que `src/lib/api.ts` debería llamar están vacíos.
2. CORS sólo permite :3000; vinxi suele usar :3010.
3. No hay LLM ni RAG; `/chat` no puede streamear nada.
4. `/carta` no genera PDF.
5. Catálogo de recomendaciones vacío.

**Lo que sí está bien hecho:** el contrato. Los schemas Pydantic ya hablan el mismo idioma que `IngestResult` del FE. Cuando el BE empiece a llenar los stubs, no habrá fricción de tipos.

---

## 10. Camino crítico para integración real end-to-end (estimado)

Asumiendo ejecución limpia de los megaprompts:

| Tarea | Tiempo | Bloquea a |
|---|---|---|
| BE1-1: parser CMF + classifier + `/ingest` | ~2 h | FE-3, BE1-2 |
| BE2-1 (paralelo): catálogo + corpus normativo | ~1.5 h | BE2-2 |
| BE1-2: `/alerts` + `/carta` stub + DB init | ~1.5 h | — |
| BE2-2: MCP server + RAG con citas legales | ~2 h | BE2-3 |
| BE2-3: `/chat` SSE + Anthropic + MCP | ~2 h | FE-3 chat |
| BE2-4: generador PDF de carta | ~1 h | FE-3 carta |
| FE-3: cambiar `src/lib/api.ts` a `http://localhost:8000` | ~1 h | — |
| Bug bash + testing E2E | ~1 h | — |
| **Total** | **~12 h** | |

Camino más corto a un demo reducido (sólo `/ingest` real, resto mock):
**BE1-1 + ajuste CORS + FE-3 parcial** → ~3 h.

---

## 11. Acciones inmediatas si se quiere conectar pronto

1. En `fulcro/backend/app/main.py`, añadir el puerto del FE a `allow_origins` (`http://localhost:3010` además de `:3000`), o usar `["http://localhost:*"]` con regex.
2. Ejecutar megaprompt **BE1-1** (parser + classifier + `/ingest`) — desbloquea la primera ruta real.
3. En paralelo, **BE2-1** (poblar `recommendations.json` con ≥20 entradas y crear corpus para RAG) — es trabajo de contenido sin dependencias.
4. Decidir formato canónico para citas legales (FE `legal { ref, title, quote, url }` vs BE `articulos_referencia`) y unificar antes de FE-3.
5. Normalizar `carga_financiera_pct` (entero 0-100 vs decimal 0-1) en fixtures.
6. Cuando `/ingest` esté listo: ejecutar **FE-3** apuntando `src/lib/api.ts` a `http://localhost:8000`.

---

## 12. Veredicto en una línea

> **Sí, son técnicamente compatibles** (mismo contrato, schemas alineados). **Pero hoy no se pueden conectar** porque el backend está en hora 0: 4 stubs vacíos y un `/health`. Estimación: ~12 h de BE bien ejecutado para integración real end-to-end; ~3 h para un demo parcial con sólo `/ingest`.
