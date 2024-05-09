import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export const load = async (event) => {
    const form = await superValidate(event, userSchema);
    return { form }
};

const userSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .min(1, { message: 'Email is required' })
        .max(256, { message: 'Email must be less than 256 characters' })
        .email({ message: 'Email must be a valid email address' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(32, { message: 'Password must be less than 32 characters' })
        .regex(new RegExp('.*[A-Z].*'), 'Password must contain at least one uppercase character')
        .regex(new RegExp('.*[a-z].*'), 'Password must contain at least one lowercase character')
        .regex(new RegExp('.*\\d.*'), 'Password must contain at least one number')
        .regex(
            new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
            'Password must contain at least one special character'
        )
        .trim()
});


const OAUTH_PROVIDERS = ["google", "discord", "github"]

export const actions = {
    login: async (event) => {
        // console.log("backend e aschi");
        const form = await superValidate(event, userSchema);
        console.log(form);

        if (!form.valid) {
            return message(form, 'Invalid form')
        }

        const body = form.data;
        // console.log(body);

        const { data, error: err } = await event.locals.supabase.auth.signInWithPassword({
            email: body.email as string,
            password: body.password as string
        });

        if (err) {
            // console.log(err);
            if (err instanceof AuthApiError && err.status === 400) {
                return message(form, 'Invalid credentials', {
                    status: 400
                })
            }

            return message(form, 'Server error. Try again later', {
                status: 500
            })
        }

        //Add user if not already added 


        throw redirect(303, '/home/search');
    },
    social: async ({ url, request, locals: { supabase, getSession } }) => {
        console.log("ok in server")
        const provider = url.searchParams.get("provider") as Provider
        console.log(provider)
        if (provider) {
            if (!OAUTH_PROVIDERS.includes(provider)) {
                return fail(400, {
                    error: "Provider not supported.",
                })
            }
            const { data, error: err } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: 'http://localhost:5173/home/search'
                },
            })

            if (err) {
                console.log(err)
                return fail(400, {
                    message: "Something went wrong.",
                })
            }
            console.log(data)
            throw redirect(303, data.url)
        }
    }
};