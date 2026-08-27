import { createServerOnlyFn } from "@tanstack/react-start";

import type { AuthServer, AuthSession } from "@/features/auth/types";
import type { Result } from "@/types/result";

import { UnauthenticatedError } from "@/features/auth/utils/error/classes/unauthenticated";
import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { err, ok } from "@/utils/result";

export const getAuthSessionServerOnlyFn = createServerOnlyFn(
  async ({
    authServer,
    headers,
  }: {
    authServer: AuthServer;
    headers: Headers;
  }): Promise<Result<AuthSession, UnauthenticatedError | UnexpectedError>> => {
    try {
      const authSession = await authServer.api.getSession({
        headers,
      });

      if (authSession === null) {
        return err(new UnauthenticatedError({}));
      }

      return ok(authSession);
    } catch (error) {
      return err(
        new UnexpectedError({ failedTo: "get auth session", cause: error }),
      );
    }
  },
);
