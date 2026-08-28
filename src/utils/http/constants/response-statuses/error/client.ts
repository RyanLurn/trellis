import type { ValueOf } from "@/types/object";

export const HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD = {
  BAD_REQUEST: {
    code: 400,
    text: "Bad Request",
  },
  UNAUTHORIZED: {
    code: 401,
    text: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    text: "Forbidden",
  },
  NOT_FOUND: {
    code: 404,
    text: "Not Found",
  },
  CONFLICT: {
    code: 409,
    text: "Conflict",
  },
  UNPROCESSABLE_CONTENT: {
    code: 422,
    text: "Unprocessable Content",
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    text: "Too Many Requests",
  },
} as const;

export type HttpClientErrorResponseStatusRecord =
  typeof HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD;
export type HttpClientErrorResponseStatusCode =
  ValueOf<HttpClientErrorResponseStatusRecord>["code"];
export type HttpClientErrorResponseStatusText =
  ValueOf<HttpClientErrorResponseStatusRecord>["text"];
