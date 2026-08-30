import { z } from "zod";

export const EnvVarsSchema = z.object({
  NEON_POOLED_CONNECTION_STRING: z.templateLiteral(
    [
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
    ],
    { error: "Invalid or missing Neon pooled connection string." },
  ),
  AUTH_SECRET: z.string().min(32),
});

export const envVars = EnvVarsSchema.parse(process.env);
