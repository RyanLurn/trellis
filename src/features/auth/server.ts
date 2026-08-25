import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import type { DB } from "@/db";
import type { AuthBaseUrl } from "@/features/auth/schemas/base-url";
import type { AuthSecret } from "@/features/auth/schemas/secret";

import { accountTable } from "@/db/schema/tables/account";
import { sessionTable } from "@/db/schema/tables/session";
import { userTable } from "@/db/schema/tables/user";
import { verificationTable } from "@/db/schema/tables/verification";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/features/auth/constants";

export function createAuthServer({
  db,
  baseURL,
  secret,
}: {
  db: DB;
  baseURL: AuthBaseUrl;
  secret: AuthSecret;
}) {
  return betterAuth({
    baseURL,
    secret,
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user: userTable,
        session: sessionTable,
        account: accountTable,
        verification: verificationTable,
      },
    }),
    advanced: {
      database: {
        generateId: false,
        joins: true,
      },
    },
    emailAndPassword: {
      enabled: true,
      minPasswordLength: MIN_PASSWORD_LENGTH,
      maxPasswordLength: MAX_PASSWORD_LENGTH,
    },
    // Make sure to keep the tanstackStartCookies plugin at the end of the array.
    plugins: [tanstackStartCookies()],
  });
}
