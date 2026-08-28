import type { Result } from "@/types/result";

import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { err, ok } from "@/utils/result";

export function createUrl({
  url,
  base,
}: {
  url: string | URL;
  base?: string | URL;
}): Result<URL, UnexpectedError> {
  try {
    return ok(new URL(url, base));
  } catch (error) {
    return err(
      new UnexpectedError({
        failedTo: "create URL",
        cause: error,
        context: { url, base },
      }),
    );
  }
}
