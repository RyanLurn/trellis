import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { id } from "@/db/schema/helpers/id";
import { timestamps } from "@/db/schema/helpers/timestamps";

export const userTable = pgTable("users", {
  id,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  ...timestamps,
});

export const userId = uuid("user_id")
  .notNull()
  .references(() => userTable.id, { onDelete: "cascade" });
