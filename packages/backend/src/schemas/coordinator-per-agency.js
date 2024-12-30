
import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";

export const coordinatorPerAgency = pgTable("coordinatorPerAgency", {
  coordinatorId: varchar("CoordinatorID", { length: 12 }),
  agencyId: varchar("AgencyID", { length: 12 }),
  status: varchar("Status", { length: 50 }) // active, inactive
});
