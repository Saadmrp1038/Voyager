import type { RequestHandler } from "@sveltejs/kit";
import { getNewExploredBlog } from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    // console.log("Ami time paile");
    // console.log(data.placeId)
    const res = await getNewExploredBlog()

    // console.log(res);
    return new Response(
        JSON.stringify(res)
    )
}