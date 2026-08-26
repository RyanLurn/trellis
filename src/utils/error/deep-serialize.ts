import type { Options } from "serialize-error";

import { serializeError } from "serialize-error";

export function deepSerializeError(error: unknown, options: Options = {}) {
  const { maxDepth = 50, useToJSON } = options;
  return serializeError(error, { maxDepth, useToJSON });
}
