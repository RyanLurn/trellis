import type { ValueOf } from "@/types/object";

export const HTTP_SUCCESSFUL_RESPONSE_STATUS_RECORD = {
  OK: {
    code: 200,
    text: "OK",
  },
  CREATED: {
    code: 201,
    text: "Created",
  },
  NO_CONTENT: {
    code: 204,
    text: "No Content",
  },
} as const;

export type HttpSuccessfulResponseStatusRecord =
  typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_RECORD;
export type HttpSuccessfulResponseStatusCode =
  ValueOf<HttpSuccessfulResponseStatusRecord>["code"];
export type HttpSuccessfulResponseStatusText =
  ValueOf<HttpSuccessfulResponseStatusRecord>["text"];
