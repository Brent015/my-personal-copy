import {
    pgTable,
    varchar,
    timestamp,
    decimal,
    boolean
} from "drizzle-orm/pg-core";

export const eventPackagePaymentConfig = pgTable("eventPackagePaymentConfig", {
  eventPackageId: varchar("EventPackageID", { length: 12 }),
  downpayment: decimal("Downpayment"),
  allowFullPayment: boolean("AllowFullPayment"),
  guestType: varchar("GuestType", { length: 50 }), // senior or regular
  description: varchar("Description", { length: 255 }),
  adminFeeValue: decimal("AdminFeeValue"),
  paymentFeeValue: decimal("PaymentFeeValue"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
