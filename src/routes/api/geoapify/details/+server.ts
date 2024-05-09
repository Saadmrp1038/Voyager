import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const apiKey = process.env.GEOAPIFY_API!
    // console.log(data)
    const place_id = data["place_id"]
    // https://api.geoapify.com/v2/place-details?id=513ccffe854798564059838200b1a5f23740f00102f90178170c200000000092035ae0a687e0a6b8e0a6b2e0a6bee0a6aee0a6bfe0a69520e0a687e0a689e0a6a8e0a6bfe0a6ade0a6bee0a6b0e0a78de0a6b8e0a6bfe0a69fe0a6bf20e0a685e0a6ac20e0a69fe0a787e0a695e0a6a8e0a78be0a6b2e0a69ce0a6bf&features=details,details.names&apiKey=YOUR_API_KEY
    // console.log("ok asche holo")
    // console.log(place_id)
    const url = `https://api.geoapify.com/v2/place-details?id=${place_id}&apiKey=${apiKey}`
    const ret = await fetch(url)
    const res = await ret.json()
    // console.log(res)

    return new Response(
        JSON.stringify(res)
    )
}