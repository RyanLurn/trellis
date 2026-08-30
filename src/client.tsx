import { StartClient } from "@tanstack/react-start/client";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import { DefaultErrorPage } from "@/components/default-pages/error";

hydrateRoot(
  document,
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <DefaultErrorPage error={error} reset={resetErrorBoundary} />
      )}
    >
      <StartClient />
    </ErrorBoundary>
  </StrictMode>,
);
