import type { RequestParams } from "@/utils/fetch/types";

import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { createRequest } from "@/utils/fetch/create-request";
import { err, ok } from "@/utils/result";

export async function safeFetch({ input, init }: RequestParams) {
  const result = createRequest({
    input,
    init,
  });
  if (!result.ok) {
    return result;
  }
  const request = result.data;

  try {
    const response = await fetch(request);
    return ok(response);
  } catch (error) {
    return err(
      new UnexpectedError({
        failedTo: "fetch",
        cause: error,
        context: { input, init },
      }),
    );
  }
}
