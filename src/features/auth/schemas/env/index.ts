import { z } from "zod";

import { AuthSecretSchema } from "@/features/auth/schemas/secret";

export const AuthEnvSchema = z.object({
  AUTH_SECRET: AuthSecretSchema,
});
export type AuthEnv = z.infer<typeof AuthEnvSchema>;
