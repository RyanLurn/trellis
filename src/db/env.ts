import { z } from "zod";

export const DbEnvSchema = z.object({
  NEON_POOLED_CONNECTION_STRING: z.templateLiteral([
    "postgresql://",
    z.string().min(1),
    ":",
    z.string().min(1),
    "@",
    z.string().min(1),
    "-pooler.",
    z.string().min(1),
    ".neon.tech/",
    z.string().min(1),
  ]),
});
export type NeonPooledConnectionString = z.infer<
  typeof DbEnvSchema
>["NEON_POOLED_CONNECTION_STRING"];
