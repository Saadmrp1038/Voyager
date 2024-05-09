import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { user } from '$lib/server/schema';

let userNow: user;
let place_id;
export const load = async ({ locals: { supabase }, params, fetch }) => {

    place_id = params.slug;
    // console.log("Place Id: ", place_id);
    let email = (await supabase.auth.getUser()).data.user?.email;

    // console.log("Amar email hoilo")
    // console.log(email)



    const ret0 = await fetch('/api/user/get', {
        method: 'POST',
        body: JSON.stringify({ email: email })
    });
    const res0 = await ret0.json()
    userNow = res0[0];


    // return { res, weatherData, pollutionData, allReviews };
}

export const actions = {
    create: async (event) => {
        console.log("Form ACtions Details");
        const data = await event.request.formData();
        data.append('writerId', userNow.userId);
        data.append('writerName', userNow.userName)
        // data.append('reviewerName', userNow.userName)
        data.append('placeId', place_id)

        let queryData = Object.fromEntries(data.entries()) as any;


        console.log("QueryData: ", queryData)

        await event.fetch('/api/blog/add', {
            method: 'POST',
            body: JSON.stringify(queryData)
        })

        // return {
        //     success: 'done',
        // };


        throw redirect(303, `/home/details/${place_id}`);

    },
} satisfies Actions