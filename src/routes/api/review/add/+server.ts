import type { RequestHandler } from "@sveltejs/kit";
import { insertReview } from "$lib/server/queries"
import type { review } from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json() as review
    await insertReview(it)

    return new Response(

    )
}