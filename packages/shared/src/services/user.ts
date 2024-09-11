import { db } from "../db";
import { eq } from "drizzle-orm";
import { user as userSchema } from "../schemas";

export async function getUserById(id: number) {
  const user = await db.query.user.findFirst({
    where: eq(userSchema.id, id),
  });

  return user;
}

export async function getUsers() {
  const user = await db.query.user.findMany();
  return user;
}
