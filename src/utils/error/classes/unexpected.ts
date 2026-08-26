import { BaseError } from "@/utils/error/classes/base";

export class UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  readonly name = "UnexpectedError";
  readonly code = "UNEXPECTED_ERROR";
  readonly context?: Record<string, unknown>;

  constructor({
    failedTo,
    cause,
    context,
  }: {
    failedTo: string;
    cause: unknown;
    context?: Record<string, unknown>;
  }) {
    super({
      message: `Failed to ${failedTo} due to some unexpected error.`,
      cause,
    });
    this.context = context;
  }
}
