import {
    pgTable,
    varchar,
    integer
} from "drizzle-orm/pg-core";

export const travelCoinsOrganizerEarnings = pgTable("travelCoinsOrganizerEarnings", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  coinsPerParticipant: integer("CoinsPerParticipant")
});
