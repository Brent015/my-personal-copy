import { 
    pgTable, 
    varchar, 
    timestamp, 
    decimal 
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { blob } from "./blobs";

export const image = pgTable("image", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  eventId: varchar("EventID", { length: 12 }),
  organizerId: varchar("OrganizerID", { length: 12 }),
  author: varchar("Author", { length: 255 }),
  extension: varchar("Extension", { length: 50 }),
  size: decimal("Size"),
  blobId: varchar("BlobID", { length: 12 }),
  type: varchar("Type", { length: 50 }),
  url: varchar("Url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const imageRelations = relations(image, ({ one }) => ({
  blob: one(blob, {
    fields: [image.blobId],
    references: [blob.id]
  })
}));
