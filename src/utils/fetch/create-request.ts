import type { Result } from "@/types/result";

import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { err, ok } from "@/utils/result";

export function createRequest({
  input,
  init,
}: {
  input: RequestInfo | URL;
  init?: RequestInit;
}): Result<Request, UnexpectedError> {
  try {
    return ok(new Request(input, init));
  } catch (error) {
    return err(
      new UnexpectedError({
        failedTo: "create request",
        cause: error,
        context: { input, init },
      }),
    );
  }
}
