import { createFileRoute } from "@tanstack/react-router";

import { createDb } from "@/db";
import { AuthEnvSchema } from "@/features/auth/schemas/env";
import { createAuthServer } from "@/features/auth/server";
import { InternalServerError } from "@/utils/error/classes/http";
import { InvalidEnvError } from "@/utils/error/classes/invalid-env";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        const parseEnvResult = AuthEnvSchema.safeParse(process.env);
        if (!parseEnvResult.success) {
          const invalidEnvError = new InvalidEnvError({
            cause: parseEnvResult.error,
          });
          const internalServerError = new InternalServerError({
            cause: invalidEnvError,
          });
          return Response.json(internalServerError.shallowSerialize(), {
            status: internalServerError.status.code,
            statusText: internalServerError.status.text,
          });
        }

        const env = parseEnvResult.data;
        const db = createDb(env.NEON_POOLED_CONNECTION_STRING);
        const authServer = createAuthServer({
          db,
          baseURL: import.meta.env.VITE_AUTH_BASE_URL,
          secret: env.AUTH_SECRET,
        });

        try {
          return await authServer.handler(request);
        } catch (error) {
          const internalServerError = new InternalServerError({ cause: error });
          return Response.json(internalServerError.shallowSerialize(), {
            status: internalServerError.status.code,
            statusText: internalServerError.status.text,
          });
        }
      },
    },
  },
});
