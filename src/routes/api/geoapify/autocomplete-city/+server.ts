import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const searchText = encodeURIComponent(data["address"])
    const apiKey = process.env.GEOAPIFY_API!
    console.log(searchText)

    const ret = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&type=city&format=json&apiKey=${apiKey}`)
    const res = await ret.json()

    return new Response(
        JSON.stringify(res)
    )
}