// shared/src/db.ts

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "../../backend/src/schemas";
import env from "./env";

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

// Create a Drizzle ORM instance
export const db = drizzle(pool, { schema: schemas });

// You might also want to export the pool if direct access is needed
export { pool };
