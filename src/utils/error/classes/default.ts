import { BaseError } from "@/utils/error/classes/base";
import { DEFAULT_ERROR_MESSAGE } from "@/utils/error/constants";

export class DefaultError extends BaseError<"DEFAULT_ERROR"> {
  readonly name = "DefaultError";
  readonly code = "DEFAULT_ERROR";

  constructor({ message, cause }: { message?: string; cause: unknown }) {
    super({ message: message ?? DEFAULT_ERROR_MESSAGE, cause });
  }
}
