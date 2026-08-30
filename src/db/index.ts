import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/config/env";
import { relations } from "@/db/schema/relations";

const client = neon(env.NEON_POOLED_CONNECTION_STRING);
export const db = drizzle({ client, relations });
