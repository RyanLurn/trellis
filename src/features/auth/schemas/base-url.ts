import { z } from "zod";

export const AuthBaseUrlSchema = z.url().brand<"AuthBaseUrl">();
export type AuthBaseUrl = z.infer<typeof AuthBaseUrlSchema>;
