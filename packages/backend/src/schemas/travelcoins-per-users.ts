import {
  pgTable,
  varchar,
  integer,
  date
} from "drizzle-orm/pg-core";

export const travelCoinsPerUser = pgTable("travelCoinsPerUser", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  userId: varchar("UserID", { length: 12 }),
  totalAvailable: integer("TotalAvailable"),
  totalAmount: integer("TotalAmount"),
  totalUsed: integer("TotalUsed"),
  expiryDate: date("ExpiryDate"),
  tier: varchar("Tier", { length: 50 }) // bronze, silver, gold, platinum
});
