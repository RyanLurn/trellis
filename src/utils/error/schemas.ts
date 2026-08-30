import { z } from "zod";

export const ErrorObjectSchema = z
  .object({
    name: z.string(),
    message: z.string(),
    code: z.string(),
    cause: z.string(),
    stack: z.string(),
  })
  .partial()
  .catchall(z.json());
