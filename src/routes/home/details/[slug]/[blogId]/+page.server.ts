import type { Actions } from './$types';

export const load = async ({ locals:{supabase}, params, fetch }) => {
	let blogId = params.blogId;
	
	// let email = (await supabase.auth.getUser()).data.user?.email;
	// async function getUserId(email: string){
	// 	const res = await fetch('/api/user/get-user-id', {
	// 		method: 'POST',
	// 		body: JSON.stringify({ email: email })
	// 	});
	// 	const data = await res.json();
	// 	return data;
	// }

	// async function getComments() {
	// 	const res = await fetch('/api/blog/get-comment', {
	// 		method: 'POST',
	// 		body: JSON.stringify({ blogId: blogId })
	// 	});
	// 	const data = await res.json();
	// 	return data;
	// }
	
	async function getBlog(){
		const res = await fetch('/api/blog/get-spec-blog', {
			method: 'POST',
			body: JSON.stringify({ blogId: blogId})
		});
		const data = await res.json();
		return data;
	}

	return {
		currentBlog: getBlog()
	};
};
