import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";

export const transportationPerAgency = pgTable("transportationPerAgency", {
  transportationId: varchar("TransportationID", { length: 255 }),
  agencyId: varchar("AgencyID", { length: 255 }),
  status: varchar("Status", { length: 50 }) // active, inactive
});
