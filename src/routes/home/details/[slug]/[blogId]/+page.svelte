<script lang="ts">
    import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { Circle } from 'svelte-loading-spinners';

	export let data: PageData;

	let currentBlog: any = null;
    let blogId = $page.params.blogId
    let placeId = $page.params.slug

	onMount(() => {
		data.currentBlog.then((res) => {
			currentBlog = res[0];
			// console.log(currentBlog);
		});
	});

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
</script>

<div class="m-2 flex flex-row justify-between">
    <a href="/home/details/{placeId}">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go Back
        </button>
    </a>
</div>
{#if currentBlog}
	<div
		class="mx-auto w-full max-w-screen-lg rounded-md border border-gray-300 bg-white p-10 shadow-md m-10"
	>
	<div class="flex flex-col ml-4 mr-4 mt-10 items-center">
		<h1 class="font-extrabold text-5xl">
			{currentBlog.blogTitle}
		</h1>
		<h1 class="font-semibold text-lg">
			{currentBlog.writerName}
		</h1>

		<div class="flex flex-row mt-4 space-x-12 text-left">
			<div class="flex flex-row space-x-3">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/299092_calendar_icon.svg"
					alt="User "
					class="w-5 h-5 mt-1 hover:scale-105 hover:rotate-12"
				/>
				<p class="text-base">
					{formatDate(currentBlog.createdAt)}
				</p>
			</div>
		</div>
		<div class="flex flex-row space-x-6 mt-5">
			{#each currentBlog.tags.split(',') as tag}
				<span class="rounded-full bg-gray-200 px-2 py-1 text-xs">{tag}</span>
			{/each}
		</div>
	</div>
	<div class="mt-16 ml-24 mr-24">
		{@html currentBlog.blogContent}
	</div>
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center">
		<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
	</div>
{/if}
