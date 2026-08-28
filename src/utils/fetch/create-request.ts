import type { Result } from "@/types/result";
import type { RequestParams } from "@/utils/fetch/types";

import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { err, ok } from "@/utils/result";

export function createRequest({
  input,
  init,
}: RequestParams): Result<Request, UnexpectedError> {
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
