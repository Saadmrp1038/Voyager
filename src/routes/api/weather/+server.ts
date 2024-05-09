import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const apiKey = process.env.WeatherAPI!

    const lat = data["lat"]
    const lon = data["lon"]

    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes&alerts=yes`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // console.log(weatherData);
    return new Response(

        JSON.stringify(weatherData)
    )
}