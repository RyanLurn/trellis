import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeaders,
  setResponseStatus,
} from "@tanstack/react-start/server";

import type { AuthSession } from "@/features/auth/types";
import type { FlatErrorObject } from "@/types/error";
import type { Result } from "@/types/result";
import type { UnauthorizedError } from "@/utils/error/classes/http";

import { createDb } from "@/db";
import { getAuthSessionServerOnlyFn } from "@/features/auth/ops/get-session.server";
import { AuthEnvSchema } from "@/features/auth/schemas/env";
import { createAuthServer } from "@/features/auth/server";
import { InternalServerError } from "@/utils/error/classes/http";
import { InvalidEnvError } from "@/utils/error/classes/invalid-env";
import { err } from "@/utils/result";

export const getAuthSessionServerFn = createServerFn().handler(
  async (): Promise<
    Result<
      AuthSession,
      | FlatErrorObject<UnauthorizedError["code"]>
      | FlatErrorObject<InternalServerError["code"]>
    >
  > => {
    const parseEnvResult = AuthEnvSchema.safeParse(process.env);

    if (!parseEnvResult.success) {
      const invalidEnvError = new InvalidEnvError({
        cause: parseEnvResult.error,
      });
      const internalServerError = new InternalServerError({
        cause: invalidEnvError,
      });
      console.error(internalServerError.deepSerialize());
      setResponseStatus(
        internalServerError.status.code,
        internalServerError.status.text,
      );
      return err(internalServerError.shallowSerialize());
    }

    const env = parseEnvResult.data;
    const db = createDb(env.NEON_POOLED_CONNECTION_STRING);

    const authServer = createAuthServer({
      db,
      baseURL: import.meta.env.VITE_AUTH_BASE_URL,
      secret: env.AUTH_SECRET,
    });
    const headers = getRequestHeaders();

    const getAuthSessionResult = await getAuthSessionServerOnlyFn({
      authServer,
      headers,
    });

    if (getAuthSessionResult.ok) {
      return getAuthSessionResult;
    }

    const error = getAuthSessionResult.error;

    if (error.code === "UNAUTHORIZED") {
      console.error(error.deepSerialize());
      setResponseStatus(error.status.code, error.status.text);
      return err(error.shallowSerialize());
    }

    const internalServerError = new InternalServerError({
      cause: error,
    });
    console.error(internalServerError.deepSerialize());
    setResponseStatus(
      internalServerError.status.code,
      internalServerError.status.text,
    );
    return err(internalServerError.shallowSerialize());
  },
);
