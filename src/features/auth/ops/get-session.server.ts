import { createServerOnlyFn } from "@tanstack/react-start";
import { parseCookies } from "better-auth/cookies/utils";

import type { AuthServer, AuthSession } from "@/features/auth/types";
import type { Result } from "@/types/result";

import {
  DONT_REMEMBER_COOKIE,
  SESSION_DATA_COOKIE,
  SESSION_TOKEN_COOKIE,
} from "@/features/auth/constants";
import { UnauthorizedError } from "@/utils/error/classes/http";
import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { err, ok } from "@/utils/result";

export const getAuthSessionServerOnlyFn = createServerOnlyFn(
  async ({
    authServer,
    headers,
  }: {
    authServer: AuthServer;
    headers: Headers;
  }): Promise<Result<AuthSession, UnauthorizedError | UnexpectedError>> => {
    try {
      const authSession = await authServer.api.getSession({
        headers,
      });

      if (authSession === null) {
        return err(new UnauthorizedError({}));
      }

      return ok(authSession);
    } catch (error) {
      const cookies = parseCookies(headers.get("cookie") ?? "");
      return err(
        new UnexpectedError({
          failedTo: "get auth session",
          cause: error,
          context: {
            hasSessionToken: cookies.has(SESSION_TOKEN_COOKIE),
            hasSessionData: cookies.has(SESSION_DATA_COOKIE),
            hasDontRemember: cookies.has(DONT_REMEMBER_COOKIE),
          },
        }),
      );
    }
  },
);
