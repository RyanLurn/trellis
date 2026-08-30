import { StartClient } from "@tanstack/react-start/client";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import { DefaultErrorPage } from "@/components/default-pages/error";
import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { reportErrorServerFn } from "@/utils/error/report.function";

hydrateRoot(
  document,
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <DefaultErrorPage error={error} reset={resetErrorBoundary} />
      )}
      onError={async (error, info) => {
        const unexpectedError = new UnexpectedError({
          failedTo: "render client",
          cause: error,
          context: { info },
        });
        await reportErrorServerFn({ data: unexpectedError.deepSerialize() });
      }}
    >
      <StartClient />
    </ErrorBoundary>
  </StrictMode>,
);
