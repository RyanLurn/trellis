import type { ValueOf } from "@/types/object";

export const HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD = {
  INTERNAL_SERVER_ERROR: {
    code: 500,
    text: "Internal Server Error",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    text: "Service Unavailable",
  },
} as const;

export type HttpServerErrorResponseStatusRecord =
  typeof HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD;
export type HttpServerErrorResponseStatusCode =
  ValueOf<HttpServerErrorResponseStatusRecord>["code"];
export type HttpServerErrorResponseStatusText =
  ValueOf<HttpServerErrorResponseStatusRecord>["text"];
