import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { z } from "zod";

import { relations } from "@/db/schema/relations";

export const DbEnvSchema = z.object({
  NEON_POOLED_CONNECTION_STRING: z.templateLiteral([
    "postgresql://",
    z.string().min(1),
    ":",
    z.string().min(1),
    "@",
    z.string().min(1),
    "-pooler.",
    z.string().min(1),
    ".neon.tech/",
    z.string().min(1),
  ]),
});
export type NeonPooledConnectionString = z.infer<
  typeof DbEnvSchema
>["NEON_POOLED_CONNECTION_STRING"];

export function createDb(connectionString: NeonPooledConnectionString) {
  const client = neon(connectionString);
  const db = drizzle({ client, relations });
  return db;
}
export type DB = ReturnType<typeof createDb>;
