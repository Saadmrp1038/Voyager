import type { RequestHandler } from "@sveltejs/kit";
import {insertUser} from "$lib/server/queries"
// import { supabase } from "$lib/supabaseClient";
import type {user} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const user = await event.request.json() as user
    console.log(user)
    await insertUser(user)

    return new Response(

    )
}