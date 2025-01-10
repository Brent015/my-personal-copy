import {
    pgTable,
    varchar,
    integer,
    decimal
} from "drizzle-orm/pg-core";

export const voucherConversion = pgTable("voucherConversion", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  coinsPerBatch: integer("CoinsPerBatch"),
  voucherValue: decimal("VoucherValue"),
  vouchersPerBatch: integer("VouchersPerBatch")
});
