<script lang="ts">
	import { onMount } from 'svelte';
	import BlogSVG from '$lib/components/blogSVG.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { Circle } from 'svelte-loading-spinners';

	export let data: PageData;

	let allBlogs: any = null;
	onMount(() => {
		data.allBlogs.then((res) => {
			allBlogs = res;
			console.log(allBlogs);
		});
	});
</script>

<div class="mt-6 mx-6">
	<div class="m-2 flex flex-row justify-between">
		<a href="/home/addunexplored" target="_blank">
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
		>
			+ Add an unexplored place
		</button>
	</a>
	</div>
	{#if allBlogs}
		{#if allBlogs.length > 0}
			{#each allBlogs as blog}
				<div class="card card-side bg-base-100 shadow-xl border border-slate-100 p-5">
					<figure><BlogSVG /></figure>
					<div class="card-body">
						<p class="font-bond text-3xl">{blog.name}</p>
						<p><span class="font-medium">Writer:</span> {blog.writerName}</p>
						<p><span class="font-medium">Address:</span> {blog.address}</p>
						<p><span class="font-medium">Created at:</span> {blog.createdAt.split('T')[0]}</p>
						<div class="card-actions justify-end">
							<a href="/home/view/unexplored/{blog.blogId}" target="_blank">
								<button class="btn btn-primary">Read</button>
							</a>
						</div>
					</div>
				</div>
			{/each}
		{:else}
			<div class="flex flex-col justify-center items-center">
				<div class="text-xl mt-20 text-red-500 bg-red-200 rounded-xl p-3">No blogs written yet</div>
			</div>
		{/if}
	{:else}
	<div class="flex h-full w-full items-center justify-center">
		<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
	</div>
	{/if}
</div>
