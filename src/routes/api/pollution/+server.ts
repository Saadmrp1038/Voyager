
import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const apiKey = process.env.airpollutionAPI!

    const lat = data["lat"]
    const lon = data["lon"]

    const airpollutionURL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const pollutionResponse = await fetch(airpollutionURL);
    const pollutionData = await pollutionResponse.json();

    // console.log(weatherData);
    return new Response(

        JSON.stringify(pollutionData)
    )
}