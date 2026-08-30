import type { ErrorObject } from "serialize-error";

import { createServerFn } from "@tanstack/react-start";

import type { FlatErrorObject } from "@/types/error";
import type { Result } from "@/types/result";

import { ValidationError } from "@/utils/error/classes/validation";
import { ErrorObjectSchema } from "@/utils/error/schemas";
import { setHttpResponseStatus } from "@/utils/http/set-response-status";
import { err, ok } from "@/utils/result";

export const reportErrorServerFn = createServerFn({ method: "POST" })
  .validator((data: ErrorObject) => data)
  .handler(
    ({ data }): Result<undefined, FlatErrorObject<ValidationError["code"]>> => {
      const parseResult = ErrorObjectSchema.safeParse(data);

      if (parseResult.success) {
        console.error(parseResult.data);
        return ok(undefined);
      }

      const validationError = new ValidationError({ cause: parseResult.error });
      console.error(validationError.deepSerialize());

      setHttpResponseStatus("BAD_REQUEST");
      return err(validationError.shallowSerialize());
    },
  );
