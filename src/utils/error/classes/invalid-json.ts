import { BaseError } from "@/utils/error/classes/base";

export class InvalidJsonError extends BaseError<
  "INVALID_JSON_ERROR",
  SyntaxError
> {
  readonly name = "InvalidJsonError";
  readonly code = "INVALID_JSON_ERROR";

  constructor({ message, cause }: { message?: string; cause: SyntaxError }) {
    super({
      message: message ?? cause.message,
      cause,
    });
  }
}
