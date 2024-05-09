import type { RequestHandler } from "@sveltejs/kit";
import { insertNewExplored } from "$lib/server/queries"
import type { newexplored } from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json() as newexplored
    await insertNewExplored(it)

    return new Response(

    )
}