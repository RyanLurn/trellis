import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeaders,
  setResponseStatus,
} from "@tanstack/react-start/server";

import type { AuthSession } from "@/features/auth/types";
import type { FlatErrorObject } from "@/types/error";
import type { Result } from "@/types/result";
import type { UnauthorizedError } from "@/utils/error/classes/http";

import { getAuthSessionServerOnlyFn } from "@/features/auth/ops/get-session.server";
import { InternalServerError } from "@/utils/error/classes/http";
import { err } from "@/utils/result";

export const getAuthSessionServerFn = createServerFn().handler(
  async (): Promise<
    Result<
      AuthSession,
      | FlatErrorObject<UnauthorizedError["code"]>
      | FlatErrorObject<InternalServerError["code"]>
    >
  > => {
    const headers = getRequestHeaders();

    const getAuthSessionResult = await getAuthSessionServerOnlyFn({
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
