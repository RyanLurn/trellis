import { z } from "zod";

import { VITE_ENV_KEY_PREFIX } from "@/config/constants";
import { AuthBaseUrlSchema } from "@/features/auth/schemas/base-url";

export const AuthViteEnvSchema = z.object({
  [`${VITE_ENV_KEY_PREFIX}AUTH_BASE_URL`]: AuthBaseUrlSchema,
});
export type AuthViteEnv = z.infer<typeof AuthViteEnvSchema>;
