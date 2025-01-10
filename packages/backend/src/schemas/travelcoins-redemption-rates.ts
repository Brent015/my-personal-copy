import {
    pgTable,
    varchar,
    decimal,
    integer
} from "drizzle-orm/pg-core";

export const travelCoinsRedemptionRates = pgTable("travelCoinsRedemptionRates", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  discountRate: decimal("DiscountRate"),
  minimumRedemption: integer("MinimumRedemption")
});
