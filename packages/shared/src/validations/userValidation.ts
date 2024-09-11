import { z } from "zod";
import { insertUserSchema } from "../types/user";

export const extendedInsertUserSchema = insertUserSchema.extend({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(["user", "admin"]).default("user"),
});

export type ExtendedNewUser = z.infer<typeof extendedInsertUserSchema>;
