import type { RequestHandler } from "@sveltejs/kit";
import { insertBlog } from "$lib/server/queries"
import type { blog } from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json() as blog
    await insertBlog(it)

    return new Response(

    )
}