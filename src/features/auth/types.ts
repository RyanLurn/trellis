import type { authServer } from "@/features/auth/server";

export type AuthErrorCode = keyof typeof authServer.$ERROR_CODES;

export type AuthSession = typeof authServer.$Infer.Session;
export type AuthUser = typeof authServer.$Infer.Session.user;
