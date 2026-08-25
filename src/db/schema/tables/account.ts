import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { id } from "@/db/schema/helpers/id";
import { timestampConfig, timestamps } from "@/db/schema/helpers/timestamps";
import { userId } from "@/db/schema/tables/user";

export const accountTable = pgTable(
  "accounts",
  {
    id,
    userId,
    issuer: text("issuer").notNull(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", timestampConfig),
    refreshTokenExpiresAt: timestamp(
      "refresh_token_expires_at",
      timestampConfig,
    ),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("accounts_issuer_provider_account_id_uidx").on(
      table.issuer,
      table.accountId,
    ),
    index("accounts_user_id_idx").on(table.userId),
  ],
);
