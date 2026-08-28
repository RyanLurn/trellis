import { BaseError } from "@/utils/error/classes/base";

export class InvalidUrlError extends BaseError<"INVALID_URL_ERROR", TypeError> {
  readonly name = "InvalidUrlError";
  readonly code = "INVALID_URL_ERROR";
  readonly url: string | URL;
  readonly base?: string | URL;

  constructor({
    message,
    url,
    base,
    cause,
  }: {
    message?: string;
    url: string | URL;
    base?: string | URL;
    cause: TypeError;
  }) {
    super({ message: message ?? cause.message, cause });
    this.url = url;
    this.base = base;
  }
}
