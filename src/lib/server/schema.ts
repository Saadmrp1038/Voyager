import {
	pgTable,
	serial,
	text,
	boolean,
	integer,
	json,
	timestamp,
	primaryKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export type user = typeof userTable.$inferInsert;
export type review = typeof reviewTable.$inferInsert;
export type blog = typeof blogTable.$inferInsert;
export type newexplored = typeof newexploredTable.$inferInsert;

export const userTable = pgTable('user_table', {
	userId: text('user_id').primaryKey().notNull(),
	userName: text('user_name').notNull(),
	email: text('email').notNull(),
	imageLink: text('image_link')
});

export const reviewTable = pgTable('review_table', {
	reviewId: serial('review_id').primaryKey().notNull(),
	reviewerId: text('reviewer_id').notNull().references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	reviewerName: text('reviewer_name').notNull(),
	placeId: text('place_id').notNull(),
	star: integer('star').notNull(),
	comment: text('comment').notNull(),
	createdAt: timestamp('created_at').defaultNow()
})

export const blogTable = pgTable('blog_table', {
	blogId: serial("blog_id").primaryKey().notNull(),
	writerId: text('writer_id').notNull().references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	writerName: text('writer_name').notNull(),
	placeId: text('place_id').notNull(),
	blogTitle: text('blog_title').notNull(),
	blogContent: text('blog_content').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	tags: text('tags')
})


export const newexploredTable = pgTable('new_explored', {
	blogId: serial("blog_id").primaryKey().notNull(),
	writerId: text('writer_id').notNull().references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	name: text('name').notNull(),
	address: text('address').notNull(),
	lat: text('lat').notNull(),
	lon: text('lon').notNull(),
	writerName: text('writer_name').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	content: text('content').notNull(),
})

