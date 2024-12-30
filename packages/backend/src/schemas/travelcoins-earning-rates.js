import {
    pgTable,
    varchar,
    decimal,
    integer
} from "drizzle-orm/pg-core";

export const travelCoinsEarningRates = pgTable("travelCoinsEarningRates", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  spendingRate: decimal("SpendingRate"),
  coinsPerRate: integer("CoinsPerRate")
});
