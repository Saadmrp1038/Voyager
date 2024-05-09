import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ locals:{supabase}, params, fetch }) => {
	let blogId = params.slug;

    async function getBlog(){
		const res = await fetch('/api/unexplored/get', {
			method: 'POST',
			body: JSON.stringify({ blogId: blogId})
		});
		const data = await res.json();
		return data;
	}

    return { currentBlog: getBlog() };
}