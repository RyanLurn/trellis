import { createFileRoute } from "@tanstack/react-router";

import { authServer } from "@/features/auth/server";
import { InternalServerError } from "@/utils/error/classes/http";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        try {
          return await authServer.handler(request);
        } catch (error) {
          const internalServerError = new InternalServerError({ cause: error });

          console.error(internalServerError.deepSerialize());

          return Response.json(internalServerError.shallowSerialize(), {
            status: internalServerError.status.code,
            statusText: internalServerError.status.text,
          });
        }
      },
    },
  },
});
