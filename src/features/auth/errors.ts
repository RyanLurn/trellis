import { BaseError } from "@/utils/error/classes/base";

export class UnauthenticatedError extends BaseError<"UNAUTHENTICATED_ERROR"> {
  readonly name = "UnauthenticatedError";
  readonly code = "UNAUTHENTICATED_ERROR";

  constructor({ message, cause }: { message?: string; cause?: unknown }) {
    super({
      message: message ?? "Unauthenticated request.",
      cause: cause ?? "No valid session.",
    });
  }
}
