import db from './db';
import { userTable, reviewTable, blogTable, newexploredTable } from './schema';

import type { user, review, blog, newexplored } from './schema';
import { eq, lt, gte, ne, inArray, and, or, sql } from 'drizzle-orm';

export async function insertUser(newUser: user) {
	await db.insert(userTable).values(newUser);
}

export async function insertReview(newReview: review) {
	await db.insert(reviewTable).values(newReview)
}

export async function getPlaceReview(placeId: string) {
	return await db.select().from(reviewTable).where(eq(reviewTable.placeId, placeId))
}
export async function getUser(email: string) {
	return await db.select().from(userTable).where(eq(userTable.email, email))
}

export async function insertBlog(newBlog: blog) {
	await db.insert(blogTable).values(newBlog)
}

export async function getPlaceBlog(placeId: string) {
	return await db.select({
		blogId: blogTable.blogId,
		writerName: blogTable.writerName,
		tags: blogTable.tags,
		createdAt: blogTable.createdAt,
		blogTitle: blogTable.blogTitle
	}).from(blogTable).where(eq(blogTable.placeId, placeId))
}

export async function getSpecBlog(blogid: number) {
	return await db.select().from(blogTable).where(eq(blogTable.blogId, blogid))
}

export async function insertNewExplored(newexplored: newexplored) {
	await db.insert(newexploredTable).values(newexplored)
}

export async function getNewExploredBlog() {
	return await db.select({
		blogId: newexploredTable.blogId,
		writerName: newexploredTable.writerName,
		createdAt: newexploredTable.createdAt,
		name: newexploredTable.name,
		address: newexploredTable.address,
		lat: newexploredTable.lat,
		lon: newexploredTable.lon

	}).from(newexploredTable)
}

export async function getSpecExplored(blogid: number) {
	return await db.select().from(newexploredTable).where(eq(newexploredTable.blogId, blogid))
}