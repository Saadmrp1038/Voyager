CREATE TABLE IF NOT EXISTS "blog_table" (
	"blog_id" serial PRIMARY KEY NOT NULL,
	"writer_id" text NOT NULL,
	"writer_name" text NOT NULL,
	"place_id" text NOT NULL,
	"blog_title" text NOT NULL,
	"blog_content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"tags" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "new_explored" (
	"blog_id" serial PRIMARY KEY NOT NULL,
	"writer_id" text NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"lat" text NOT NULL,
	"lon" text NOT NULL,
	"writer_name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review_table" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"reviewer_id" text NOT NULL,
	"reviewer_name" text NOT NULL,
	"place_id" text NOT NULL,
	"star" integer NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_table" (
	"user_id" text PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"email" text NOT NULL,
	"image_link" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_table" ADD CONSTRAINT "blog_table_writer_id_user_table_user_id_fk" FOREIGN KEY ("writer_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "new_explored" ADD CONSTRAINT "new_explored_writer_id_user_table_user_id_fk" FOREIGN KEY ("writer_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_table" ADD CONSTRAINT "review_table_reviewer_id_user_table_user_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
