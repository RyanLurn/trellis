import { z } from "zod";

import { DbEnvSchema } from "@/db/env";
import { AuthSecretSchema } from "@/features/auth/schemas/secret";

export const AuthEnvSchema = z.object({
  ...DbEnvSchema.shape,
  AUTH_SECRET: AuthSecretSchema,
});
export type AuthEnv = z.infer<typeof AuthEnvSchema>;
