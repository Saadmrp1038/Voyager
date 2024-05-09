
import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const apiKey = process.env.currencyfreak!

    const from = data["from"]
    const to = data["to"]
    console.log("in backend", from, to)
    const currencyURL = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=${to}&base=${from}`;
    const currencyResponce = await fetch(currencyURL);
    const currencyData = await currencyResponce.json();

    // console.log(weatherData);
    return new Response(

        JSON.stringify(currencyData)
    )
}