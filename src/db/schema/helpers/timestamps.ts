import type { PgTimestampConfig } from "drizzle-orm/pg-core";

import { timestamp } from "drizzle-orm/pg-core";

export const timestampConfig = {
  precision: 6,
  withTimezone: true,
  mode: "date",
} satisfies PgTimestampConfig<"date">;

export const timestamps = {
  createdAt: timestamp("created_at", timestampConfig).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", timestampConfig)
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};

export const timestampsWithDelete = {
  ...timestamps,
  deletedAt: timestamp("deleted_at", timestampConfig),
};
