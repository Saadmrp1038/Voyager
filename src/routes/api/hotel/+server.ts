import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const token = process.env.token!

    const lat = data["lat"]
    const lon = data["lon"]
    const rad = data["rad"]

    const hotelURL = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}&radius=${rad}&radiusUnit=KM&hotelSource=ALL`;
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