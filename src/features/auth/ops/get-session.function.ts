import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import type { UnauthenticatedError } from "@/features/auth/errors";
import type { AuthSession } from "@/features/auth/types";
import type { FlatErrorObject } from "@/types/error";
import type { Result } from "@/types/result";

import { getAuthSessionServerOnlyFn } from "@/features/auth/ops/get-session.server";
import { DefaultError } from "@/utils/error/classes/default";
import { setHttpResponseStatus } from "@/utils/http/set-response-status";
import { err } from "@/utils/result";

export const getAuthSessionServerFn = createServerFn().handler(
  async (): Promise<
    Result<
      AuthSession,
      | FlatErrorObject<UnauthenticatedError["code"]>
      | FlatErrorObject<DefaultError["code"]>
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

    if (error.code === "UNAUTHENTICATED_ERROR") {
      console.error(error.deepSerialize());

      setHttpResponseStatus("UNAUTHORIZED");
      return err(error.shallowSerialize());
    }

    const defaultError = new DefaultError({
      cause: error,
    });
    console.error(defaultError.deepSerialize());

    setHttpResponseStatus("INTERNAL_SERVER_ERROR");
    return err(defaultError.shallowSerialize());
  },
);
