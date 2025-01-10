import {
    pgTable,
    varchar,
    integer
} from "drizzle-orm/pg-core";

export const travelCoinsOrganizerRedemption = pgTable("travelCoinsOrganizerRedemption", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  usersPerCoin: integer("UsersPerCoin"),
  newEventCost: integer("NewEventCost"),
  freeEventLimit: integer("FreeEventLimit")
});
