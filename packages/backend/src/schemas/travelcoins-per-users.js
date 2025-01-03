import {
    pgTable,
    varchar,
    integer,
    datetime
} from "drizzle-orm/pg-core";

export const travelCoinsPerUser = pgTable("travelCoinsPerUser", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  userId: varchar("UserID", { length: 12 }),
  totalAvailable: integer("TotalAvailable"),
  totalAmount: integer("TotalAmount"),
  totalUsed: integer("TotalUsed"),
  expiryDate: datetime("ExpiryDate"),
  tier: varchar("Tier", { length: 50 }) // bronze, silver, gold, platinum
});
