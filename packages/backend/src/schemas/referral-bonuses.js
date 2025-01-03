import {
    pgTable,
    integer,
    datetime
} from "drizzle-orm/pg-core";

export const referralBonus = pgTable("referralBonus", {
  oReferred: integer("OReferred"),
  oReferrer: integer("OReferrer"),
  tReferred: integer("TReffered"),
  tRefferer: integer("TRefferer"),
  createdAt: datetime("created_at").defaultNow()
});
