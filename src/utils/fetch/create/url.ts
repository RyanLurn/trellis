import type { Result } from "@/types/result";

import { InvalidUrlError } from "@/utils/fetch/error/classes/invalid-url";
import { err, ok } from "@/utils/result";

export function createUrl({
  url,
  base,
}: {
  url: string | URL;
  base?: string | URL;
}): Result<URL, InvalidUrlError> {
  try {
    const urlInstance = new URL(url, base);
    return ok(urlInstance);
  } catch (error) {
    return err(new InvalidUrlError({ url, base, cause: error as TypeError }));
  }
}
