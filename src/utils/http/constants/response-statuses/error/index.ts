import type { ValueOf } from "@/types/object";

import { HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD } from "@/utils/http/constants/response-statuses/error/client";
import { HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD } from "@/utils/http/constants/response-statuses/error/server";

export const HTTP_ERROR_RESPONSE_STATUS_RECORD = {
  ...HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD,
  ...HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD,
} as const;

export type HttpErrorResponseStatusRecord =
  typeof HTTP_ERROR_RESPONSE_STATUS_RECORD;
export type HttpErrorResponseStatusCode =
  ValueOf<HttpErrorResponseStatusRecord>["code"];
export type HttpErrorResponseStatusText =
  ValueOf<HttpErrorResponseStatusRecord>["text"];
