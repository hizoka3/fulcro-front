import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";
import AppShell from "~/components/AppShell";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Defensor — Concierge financiero anónimo</Title>
          <Meta
            name="description"
            content="Sube tu informe CMF y recibe un diagnóstico claro, con citas a la ley chilena. Sin venta. Sin registro."
          />
          <Meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <Meta name="theme-color" content="#0A2540" />
          <Link rel="preconnect" href="https://rsms.me" />
          <Link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <AppShell>
            <Suspense>{props.children}</Suspense>
          </AppShell>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
