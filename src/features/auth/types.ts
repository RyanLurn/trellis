import type { createAuthServer } from "@/features/auth/server";

export type AuthServer = ReturnType<typeof createAuthServer>;

export type AuthErrorCode = keyof AuthServer["$ERROR_CODES"];

export type AuthSession = AuthServer["$Infer"]["Session"];
export type AuthUser = AuthServer["$Infer"]["Session"]["user"];
