import type { ZodError } from "zod";

import { BaseError } from "@/utils/error/classes/base";

export class InvalidEnvError extends BaseError<
  "INVALID_ENV_ERROR",
  ZodError["issues"]
> {
  readonly name = "InvalidEnvError";
  readonly code = "INVALID_ENV_ERROR";

  constructor({ message, cause }: { message?: string; cause: ZodError }) {
    super({ message: message ?? cause.message, cause: cause.issues });
  }
}
