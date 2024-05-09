const countryToCurrency = new Map([
    ['US', 'USD'], // United States
    ['CA', 'CAD'], // Canada
    ['GB', 'GBP'], // United Kingdom
    ['EU', 'EUR'], // Eurozone
    ['JP', 'JPY'], // Japan
    ['CN', 'CNY'], // China
    ['IN', 'INR'], // India
    ['RU', 'RUB'], // Russia
    ['AU', 'AUD'], // Australia
    ['NZ', 'NZD'], // New Zealand
    ['CH', 'CHF'], // Switzerland
    ['SE', 'SEK'], // Sweden
    ['NO', 'NOK'], // Norway
    ['DK', 'DKK'], // Denmark
    ['BR', 'BRL'], // Brazil
    ['MX', 'MXN'], // Mexico
    ['ZA', 'ZAR'], // South Africa
    ['NG', 'NGN'], // Nigeria
    ['EG', 'EGP'], // Egypt
    ['TR', 'TRY'], // Turkey
    ['KR', 'KRW'], // South Korea
    ['SG', 'SGD'], // Singapore
    ['MY', 'MYR'], // Malaysia
    ['TH', 'THB'], // Thailand
    ['ID', 'IDR'], // Indonesia
    ['PK', 'PKR'], // Pakistan
    ['BD', 'BDT'], // Bangladesh
    ['SA', 'SAR'], // Saudi Arabia
    ['AE', 'AED'], // United Arab Emirates
    ['PH', 'PHP'], // Philippines
    // Add more countries as needed
]);
export const load = async ({ locals: { supabase }, params, fetch }) => {
    const place_id = params.slug;

    // console.log(place_id)
    const ret = await fetch('/api/geoapify/details', {
        method: 'POST',
        body: JSON.stringify({ place_id: place_id })
    });
    const res = await ret.json()
    // console.log(res)

    const lat = res.features[0].properties.lat
    const lon = res.features[0].properties.lon
    const rng = 2000;

    console.log(res)

    const ret1 = await fetch('/api/geoapify/hotel', {
        method: 'POST',
        body: JSON.stringify({ lat: lat, lon: lon, rng: rng })
    });
    const res1 = await ret1.json()

    console.log(res1.features[0].properties.country_code)

    console.log(countryToCurrency.get(res1.features[0].properties.country_code));
    const qq = countryToCurrency.get(res1.features[0].properties.country_code.toUpperCase());
    console.log("amiz", qq)

    const ret2 = await fetch('/api/currency', {
        method: 'POST',
        body: JSON.stringify({ from: "BDT", to: qq })
    });
    const res2 = await ret2.json()

    return { res, res1, res2 }
}