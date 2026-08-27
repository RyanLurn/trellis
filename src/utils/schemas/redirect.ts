import { z } from "zod";

export const SafeRedirectUrlSchema = z
  .string()
  .trim()
  .refine((value) => value.startsWith("/") && !value.startsWith("//"), {
    error: "Invalid redirect target.",
  });
export type SafeRedirectUrl = z.infer<typeof SafeRedirectUrlSchema>;

export const RedirectSearchParamSchema = z.object({
  redirect: SafeRedirectUrlSchema.optional().catch(undefined),
});
export type RedirectSearchParam = z.infer<typeof RedirectSearchParamSchema>;
