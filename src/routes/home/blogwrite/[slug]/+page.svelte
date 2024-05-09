<script>
	// @ts-nocheck

	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';
	import { page } from '$app/stores';
	const { slug } = $page.params;

	let quill;
	let editor;

	let title;

	let content;

	let tags;

	export let data;
	let { session, supabase } = data;
	$: ({ session, supabase } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};

	function formatDate(dateString) {
		const dateObj = new Date(dateString);
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
	}
	onMount(async () => {
		const Quill = await import('quill');
		quill = new Quill.default(editor, {
			theme: 'snow',
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block', 'link']
				]
			},
			placeholder: 'Body of the article goes here...'
		});
	});
	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
	}
	function makeStrong() {
		content = quill.root.innerHTML;
		console.log(content);
	}
</script>

<div class="min-h-screen mt-6 ml-16 mr-16">
	<a href="/home/details/{slug}" class="mt-6 mb-6 text-left">
		<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
			Go Back
		</button>
	</a>
	<h1 class="text-2xl font-extrabold">Creating a New Blog</h1>
	<form
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		action="?/create"
		method="POST"
		class="mt-6"
		on:submit={() => {
			onSubmit();
		}}
	>
		<label for="title" class="label text-left mb-3 flex flex-row font-semibold">
			<span>Blog Title</span>
		</label>
		<input
			class="input mb-4 w-full border border-slate-400"
			type="text"
			id="blogTitle"
			name="blogTitle"
			bind:value={title}
			placeholder="Enter The Title of the Blog"
		/>

		<label for="tags" class="label text-left mb-3 font-semibold">
			<span>Tags</span>
		</label>
		<input
			class="input mb-4 w-full border border-slate-400"
			type="text"
			id="tags"
			name="tags"
			bind:value={tags}
			placeholder="Tags (separate by comma)"
		/>
		<input hidden id="blogContent" name="blogContent" bind:value={content} />
		<div class="grid gap-2 mt-4">
			<label for="content" class="font-semibold">Blog Content</label>
			<div bind:this={editor} id="editor" />
		</div>
		<button
			type="submit"
			class="btn btn-accent mt-8 w-full"
			disabled={isLoading}
			on:click={makeStrong}
		>
			{#if isLoading}
				<span class="loading loading-spinner loading-xs"></span>
			{/if}
			Submit
		</button>
	</form>
</div>
