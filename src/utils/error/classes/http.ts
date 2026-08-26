import type { HttpErrorResponseStatusRecord } from "@/utils/http/constants/response-statuses/error";

import { BaseError } from "@/utils/error/classes/base";
import { DEFAULT_ERROR_MESSAGE } from "@/utils/error/constants";
import { HTTP_ERROR_RESPONSE_STATUS_RECORD } from "@/utils/http/constants/response-statuses/error";

export type HttpErrorCode = keyof HttpErrorResponseStatusRecord;

// oxlint-disable-next-line unicorn/custom-error-definition
export abstract class HttpError<
  Code extends HttpErrorCode,
  Cause = unknown,
> extends BaseError<Code, Cause> {
  abstract override readonly code: Code;
  abstract readonly status: HttpErrorResponseStatusRecord[Code];
}

export class InternalServerError extends HttpError<"INTERNAL_SERVER_ERROR"> {
  readonly name = "InternalServerError";
  readonly code = "INTERNAL_SERVER_ERROR";
  readonly status = HTTP_ERROR_RESPONSE_STATUS_RECORD[this.code];

  constructor({ message, cause }: { message?: string; cause: unknown }) {
    super({ message: message ?? DEFAULT_ERROR_MESSAGE, cause });
  }
}
