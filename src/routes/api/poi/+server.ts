import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const token = process.env.token!
    console.log(data)
    const lat = data["lat"]
    const lon = data["lon"]
    const rad = data["rad"]

    const hotelURL = `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${lat}&longitude=${lon}&radius=${rad}&page%5Blimit%5D=5&page%5Boffset%5D=0`;
    const hotelResponse = await fetch(hotelURL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });


    const nearbyHotel = await hotelResponse.json();

    // console.log(weatherData);
    return new Response(

        JSON.stringify(nearbyHotel)
    )
}