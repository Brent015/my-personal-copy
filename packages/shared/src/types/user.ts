import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "../schemas/user";

export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
