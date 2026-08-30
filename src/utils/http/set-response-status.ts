import { setResponseStatus } from "@tanstack/react-start/server";

import type { HttpErrorResponseStatusRecord } from "@/utils/http/constants/response-statuses/error";

import { HTTP_ERROR_RESPONSE_STATUS_RECORD } from "@/utils/http/constants/response-statuses/error";

export function setHttpResponseStatus(
  code: keyof HttpErrorResponseStatusRecord,
) {
  const error = HTTP_ERROR_RESPONSE_STATUS_RECORD[code];
  setResponseStatus(error.code, error.text);
}
