import type { ZodType } from "zod";

import { InvalidJsonError } from "@/utils/error/classes/invalid-json";
import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { ValidationError } from "@/utils/error/classes/validation";
import { err, ok } from "@/utils/result";

export async function parseResponse<T extends ZodType>({
  response,
  schema,
}: {
  response: Response;
  schema: T;
}) {
  try {
    const data = await response.json();
    const result = await schema.safeParseAsync(data);
    if (result.success) {
      return ok(data);
    }
    return err(new ValidationError({ cause: result.error }));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return err(new InvalidJsonError({ cause: error }), {
        contentType: response.headers.get("content-type"),
      });
    }
    return err(
      new UnexpectedError({ failedTo: "parse response", cause: error }),
    );
  }
}
