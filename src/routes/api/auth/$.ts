import { createFileRoute } from "@tanstack/react-router";
import { parseCookies } from "better-auth/cookies/utils";

import {
  DONT_REMEMBER_COOKIE,
  SESSION_DATA_COOKIE,
  SESSION_TOKEN_COOKIE,
} from "@/features/auth/constants";
import { authServer } from "@/features/auth/server";
import { DefaultError } from "@/utils/error/classes/default";
import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD } from "@/utils/http/constants/response-statuses/error/server";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        try {
          return await authServer.handler(request);
        } catch (error) {
          const cookies = parseCookies(request.headers.get("cookie") ?? "");
          const unexpectedError = new UnexpectedError({
            failedTo: "handle auth request",
            cause: error,
            context: {
              url: request.url,
              method: request.method,
              hasSessionToken: cookies.has(SESSION_TOKEN_COOKIE),
              hasSessionData: cookies.has(SESSION_DATA_COOKIE),
              hasDontRemember: cookies.has(DONT_REMEMBER_COOKIE),
            },
          });

          const defaultError = new DefaultError({ cause: unexpectedError });
          console.error(defaultError.deepSerialize());

          const httpStatus =
            HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD["INTERNAL_SERVER_ERROR"];
          return Response.json(defaultError.shallowSerialize(), {
            status: httpStatus.code,
            statusText: httpStatus.text,
          });
        }
      },
    },
  },
});
