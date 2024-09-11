import { z } from "zod";

// Define schema for environment variables
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().regex(/^\d+$/).transform(Number).optional().default("3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  // Add other environment variables as needed
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

// Create a type from the schema
type Env = z.infer<typeof envSchema>;

// Export the validated environment variables
export default env as Env;
