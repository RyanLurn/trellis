import type { ErrorObject, Options } from "serialize-error";

import type { AppError, FlatErrorObject } from "@/types/error";

import { deepSerializeError } from "@/utils/error/deep-serialize";

export abstract class BaseError<Code extends string, Cause = unknown>
  extends Error
  implements AppError<Code>
{
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  abstract readonly code: Code;
  declare cause: Cause;

  constructor({ message, cause }: { message: string; cause: Cause }) {
    super(message, { cause });
  }

  shallowSerialize(): FlatErrorObject<Code> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
    };
  }

  deepSerialize(options: Options = {}): ErrorObject {
    return deepSerializeError(this, options);
  }
}
