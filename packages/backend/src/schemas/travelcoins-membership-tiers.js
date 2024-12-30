import {
    pgTable,
    varchar,
    integer,
    decimal
} from "drizzle-orm/pg-core";

export const travelCoinsMembershipTiers = pgTable("travelCoinsMembershipTiers", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  name: varchar("Name", { length: 50 }),
  minCoins: integer("MinCoins"),
  maxCoins: integer("MaxCoins"),
  minEvents: integer("MinEvents"),
  maxEvents: integer("MaxEvents"),
  bonusRate: decimal("BonusRate")
});
