import type { ZodError } from "zod";

import { BaseError } from "@/utils/error/classes/base";

export class ValidationError extends BaseError<
  "VALIDATION_ERROR",
  ZodError["issues"]
> {
  readonly name = "ValidationError";
  readonly code = "VALIDATION_ERROR";

  constructor({ message, cause }: { message?: string; cause: ZodError }) {
    super({
      message: message ?? cause.message,
      cause: cause.issues,
    });
  }
}
