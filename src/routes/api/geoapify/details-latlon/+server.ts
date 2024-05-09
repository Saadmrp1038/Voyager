// https://api.geoapify.com/v2/place-details?lat=23.791438113010443&lon=90.41393626060449&apiKey=YOUR_API_KEY

import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const apiKey = process.env.GEOAPIFY_API!
    // console.log(data)
    const lat = data["lat"]
    const lon = data["lon"]

    // console.log("ok asche holo")
    const url = `https://api.geoapify.com/v2/place-details?lat=${lat}&lon=${lon}&apiKey=${apiKey}`
    const ret = await fetch(url)
    const res = await ret.json()
    // console.log(res)

    return new Response(
        JSON.stringify(res)
    )
}