import {
    pgTable,
    varchar,
    integer
} from "drizzle-orm/pg-core";

export const travelCoinsReferralRewards = pgTable("travelCoinsReferralRewards", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  userType: varchar("UserType", { length: 50 }), // TRAVELER, ORGANIZER
  referrerCoins: integer("ReferrerCoins"),
  refereeCoins: integer("RefereeCoins")
});
