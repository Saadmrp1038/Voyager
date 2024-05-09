<script lang="ts">
	// import Message from './Message.svelte';
	import wind from '$lib/images/wind.png';
	import { enhance } from '$app/forms';
	import missing from '$lib/images/missing-svgrepo-com.svg';
	import { page } from '$app/stores';
	const { slug } = $page.params;
	import type { ActionData, PageData } from './$types';
	import deafaultImage from '$lib/images/default.jpg';
	import { onMount } from 'svelte';
	import BlogSVG from '$lib/components/blogSVG.svelte';
	import { Circle } from 'svelte-loading-spinners';

	export let data: PageData;
</script>

<div class="grid grid-cols-3 gap-4 mt-5">
	{#each data.res1.features as feature}
		<div class="card rounded-md shadow-md hover:shadow-xl p-3">
			<h1 class="font-bold text-2xl">
				<i>{feature.properties.name}</i>
			</h1>
			<p class="font-semibold">
				{feature.properties.state}
			</p>
			<div class="flex flex-row space-x-2">
				<img
					src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/location.svg"
					alt="Location Icon"
				/>
				<p class="font-semibold">
					{feature.properties.street}
				</p>
			</div>
		</div>
	{/each}
</div>

<!-- <pre>{JSON.stringify(data.res, null, 2)}</pre> -->
<pre>{JSON.stringify(data.res1, null, 2)}</pre>

<pre>{JSON.stringify(data.res2, null, 2)}</pre>

<style>
	.chipi {
		background-color: #c1d4e3;

		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}
	.star {
		color: #fff8d2;
		cursor: pointer;
		transition: color 0.2s;
	}
	.star_ {
		color: #d8ce94;
	}

	.star:hover {
		color: #f7b900;
	}

	.star-filled {
		color: #f7b900;
	}
</style>
