import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { id } from "@/db/schema/helpers/id";
import { timestampConfig, timestamps } from "@/db/schema/helpers/timestamps";

export const verificationTable = pgTable(
  "verifications",
  {
    id,
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", timestampConfig).notNull(),
    ...timestamps,
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)],
);
