import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const apiKey = process.env.GEOAPIFY_API!

    const lat = data["lat"]
    const long = data["lon"]
    const categories = "accommodation"
    const radius = data["rng"]

    const url = `https://api.geoapify.com/v2/places?categories=accommodation&filter=circle:${long},${lat},${radius}&bias=proximity:${long},${lat}&limit=20&apiKey=${apiKey}`
    const ret = await fetch(url)
    const res = await ret.json()
    console.log("OK ami backend")
    console.log(url)

    return new Response(
        JSON.stringify(res)
    )
}