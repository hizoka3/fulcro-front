// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="es-CL">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#0A2540" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          {assets}
        </head>
        <body class="bg-surface text-ink antialiased">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
