import { z } from "zod";

export const AuthSecretSchema = z.string().min(32).brand<"AuthSecret">();
export type AuthSecret = z.infer<typeof AuthSecretSchema>;

export const AuthEnvSchema = z.object({
  AUTH_SECRET: AuthSecretSchema,
});
export type AuthEnv = z.infer<typeof AuthEnvSchema>;
