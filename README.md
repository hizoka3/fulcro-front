# Fulcro — Frontend

Concierge financiero anónimo para Chile. SolidStart + Tailwind + TypeScript.

## Stack
- SolidJS 1.9 / SolidStart 1.0 (vinxi)
- TypeScript 5.7 (strict)
- TailwindCSS 3.4

## Quickstart

```bash
npm install
npm run dev   # http://localhost:3000
```

Build / start:

```bash
npm run build
npm run start
```

## Scripts
- `dev` — vinxi dev server
- `build` — production build
- `start` — run built app
- `typecheck` — `tsc --noEmit`

## Estructura

```
src/
  app.tsx              Router + meta
  app.css              Tailwind + tokens
  entry-client.tsx     hydration
  entry-server.tsx     SSR document
  components/          AppShell, Avatar, DropZone, Drawer, DeudaCard, …
  fixtures/personas/   maria.json (3 fixtures pendientes: carlos, pedro)
  lib/api.ts           Mocks de ingest / chat / generarCarta / getAlerts
  lib/types.ts         Contratos de API
  lib/format.ts        clp, pct, hashName
  routes/
    index.tsx          Landing + upload
    diagnostico.tsx    Wow moment (carga financiera, problemas, citas legales)
    concierge.tsx      Chat con streaming simulado
    carta.tsx          Borrador de reclamo SERNAC
    plan.tsx           Plan de salida (avalancha)
    comparador.tsx     Alternativas con menor CAE
    alertas.tsx        Feed de alertas legales
```

## Estado
- FE-1 (mock flow) — ✅
- FE-2 (componentes + polish) — parcial (componentes ya extraídos)
- FE-3 (backend real) — pendiente
- FE-4 (animaciones avanzadas) — base lista
- FE-5 (multi-fixture, video, deck) — pendiente
