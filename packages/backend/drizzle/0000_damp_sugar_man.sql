CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" text DEFAULT 'user',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
