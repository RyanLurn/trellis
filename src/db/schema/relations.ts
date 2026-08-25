import { defineRelations } from "drizzle-orm";

import { accountTable } from "@/db/schema/tables/account";
import { sessionTable } from "@/db/schema/tables/session";
import { userTable } from "@/db/schema/tables/user";
import { verificationTable } from "@/db/schema/tables/verification";

export const relations = defineRelations(
  {
    userTable,
    sessionTable,
    accountTable,
    verificationTable,
  },
  ({ many, one, userTable, sessionTable, accountTable }) => ({
    userTable: {
      sessions: many.sessionTable({
        from: userTable.id,
        to: sessionTable.userId,
      }),
      accounts: many.accountTable({
        from: userTable.id,
        to: accountTable.userId,
      }),
    },
    sessionTable: {
      user: one.userTable({
        from: sessionTable.userId,
        to: userTable.id,
      }),
    },
    accountTable: {
      user: one.userTable({
        from: accountTable.userId,
        to: userTable.id,
      }),
    },
  }),
);
