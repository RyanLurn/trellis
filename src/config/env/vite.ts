import { z } from "zod";

export const VITE_ENV_KEY_PREFIX = "VITE_";

export const ViteEnvVarsSchema = z.object({
  [`${VITE_ENV_KEY_PREFIX}AUTH_BASE_URL`]: z.url(),
});
