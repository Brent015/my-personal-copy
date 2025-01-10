import {
  pgTable,
  varchar,
  timestamp,
  decimal,
  date
} from "drizzle-orm/pg-core";

export const eventPackageDiscount = pgTable("eventPackageDiscount", {
  eventPackageId: varchar("EventPackageID", { length: 12 }),
  discountName: varchar("DiscountName", { length: 255 }),
  discountType: varchar("DiscountType", { length: 50 }),
  discountValue: decimal("DiscountValue"),
  validity: date("Validity"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
