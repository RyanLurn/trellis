import { z } from "zod";

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/features/auth/constants";

export const NameSchema = z
  .string()
  .trim()
  .normalize("NFC")
  .min(1, "Name is required.")
  .max(100, "Name is too long.");

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .normalize("NFC")
  .pipe(z.email("Invalid email.").max(254, "Email is too long."));

export const PasswordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, "Password is too short.")
  .max(MAX_PASSWORD_LENGTH, "Password is too long.");

export const ConfirmPasswordSchema = z
  .string()
  .min(1, "Please confirm your password.");

export const RememberMeSchema = z.boolean();

export const SignInParamsSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  rememberMe: RememberMeSchema,
});
export type SignInParams = z.infer<typeof SignInParamsSchema>;

export const SignUpParamsSchema = z
  .object({
    name: NameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .refine((arg) => arg.confirmPassword === arg.password, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type SignUpParams = z.infer<typeof SignUpParamsSchema>;
