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
	let features = data.res.features;

	let stars = 0;
	let comment = '';

	function handleStarHover(value) {
		stars = value;
	}

	function handleStarLeave() {
		// Reset the stars to the previous value if the user leaves the star area without clicking
		stars = Math.round(stars);
	}

	function handleSubmit() {
		// You can handle form submission here
		console.log('Stars:', stars);
		console.log('Comment:', comment);
	}
	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
	}

	function gowriteblog() {
		window.open(`/home/blogwrite/${slug}`);
	}

	const reviews = [
		{
			id: 1,
			user: 'Sakib',
			star: 4,
			comment: 'Very Good place. I enjoy a lot'
		},
		{
			id: 1,
			user: 'Sakib',
			star: 5,
			comment: 'Very Good place. I enjoy a lot'
		},
		{
			id: 1,
			user: 'Sakib',
			star: 3,
			comment: 'Very Good place. I enjoy a lot'
		}
	];

	let weatherData: any = null;
	let pollutionData: any = null;
	let allReviews: any = null;
	let allBlogs: any = null;

	onMount(() => {
		data.weatherData.then((res) => {
			weatherData = res;
			console.log(weatherData);
		});

		data.pollutionData.then((res) => {
			pollutionData = res;
		});

		data.allReviews.then((res) => {
			allReviews = res;
		});

		data.allBlogs.then((res) => {
			allBlogs = res;
			console.log(allBlogs);
		});
	});

	// 	let { session, supabase, classNow, studclass } = data;
	// 	$: ({ session, supabase, classNow, studclass } = data);
</script>

<div class="mt-6 mx-6">
	<div class="m-2 flex flex-row justify-between">
		<a href="/home/search">
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				Go Back
			</button>
		</a>
		{#if data.res.features}
			<button
				class="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
				on:click={gowriteblog}
			>
				+ Add an experience here
			</button>
		{/if}
		<a href="/home/travel/{slug}">
			<button class="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded">
				Travel
			</button>
		</a>
	</div>
	<div role="tablist" class="tabs tabs-bordered">
		<input
			type="radio"
			name="my_tabs_1"
			role="tab"
			class="tab"
			aria-label="Place Details"
			checked
		/>
		<div role="tabpanel" class="tab-content p-10">
			<div class="flex justify-center">
				<div class="w-9/10 md:w-4/5 xl:w-4/5">
					{#if data.res.features}
						{#if data.res.features[0].properties.name}
							<h1 class="text-3xl font-extrabold">{data.res.features[0].properties.name}</h1>
						{:else if data.res.features[0].properties.name_international.en}
							<h1 class="text-3xl font-extrabold">
								{data.res.features[0].properties.name_international.en}
							</h1>
						{:else if data.res.features[0].properties.name_international.bn}
							<h1 class="text-3xl font-extrabold">
								{data.res.features[0].properties.name_international.bn}
							</h1>
						{:else}
							<h1 class="text-3xl font-extrabold">Name Not Found</h1>
						{/if}
						<p class="text-xl">GMT {data.res.features[0].properties.timezone.offset_STD}</p>
						<p class="mt-2">{data.res.features[0].properties.address_line2}</p>
						<div class="flex space-x-2 mt-2">
							{#each data.res.features[0].properties.categories as category}
								{#if !category.includes('.')}
									<p class="py-1 px-2 bg-gray-400 text-white rounded">
										{category}
									</p>
								{/if}
							{/each}

							<!-- <p class="py-1 px-2 bg-gray-400 text-white rounded">
							{data.res.features[0].properties.datasource.raw.amenity}
						</p> -->
						</div>
						<!-- Address -->
						<div class="mt-4">
							<h2 class="text-lg font-medium">Address:</h2>
							<div class="ml-3">
								{#if data.res.features[0].properties.street}
									<p>Street: {data.res.features[0].properties.street}</p>
								{/if}
								{#if data.res.features[0].properties.city}
									<p>City: {data.res.features[0].properties.city}</p>
								{/if}
								{#if data.res.features[0].properties.state}
									<p>State: {data.res.features[0].properties.state}</p>
								{/if}
								{#if data.res.features[0].properties.country}
									<p>Country: {data.res.features[0].properties.country}</p>
								{/if}
								{#if data.res.features[0].properties.postal}
									<p>Postal Code: {data.res.features[0].properties.postal}</p>
								{/if}
							</div>
						</div>
					{/if}
					<!-- Weather -->
					{#if weatherData}
						{#if weatherData.current}
							<div class="mt-4">
								<!-- Weather -->
								<div class="mt-2">
									<p class="text-[22px] font-medium">Weather:</p>
									<div class="ml-2">
										<div class="border-2 rounded-lg py-2">
											<div class="flex items-center">
												<img src={weatherData.current.condition.icon} alt="" />
												<p>
													<span class="text-[25px]">{weatherData.current.temp_c}<sup>o</sup></span>
													<span> feels like {weatherData.current.feelslike_c}<sup>o</sup></span>
												</p>
											</div>
											<div class="flex items-center space-x-2 mx-3">
												<img src={wind} alt="" class="w-5" />

												<p>
													<span>{weatherData.current.wind_mph}mile/h</span>
													<span
														>{weatherData.current.wind_degree}<sup>o</sup>
														{weatherData.current.wind_dir}</span
													>
												</p>
											</div>
										</div>
									</div>
								</div>

								<!-- Air pollution -->
							</div>
						{:else}
							<div class="mt-4">
								<h2 class="text-lg font-medium">Weather:</h2>

								<!-- Weather -->
								<div class="mt-2">
									<p class="text-[22px] font-medium">Weather:</p>
									<div class="ml-2">
										<div class="border-2 rounded-lg py-2">
											<div class="flex items-center">
												<img src={missing} alt="" class="w-8 h-8" />
												<p>
													<span class="text-[25px]">API_ERROR</span>
													<!-- <span> feels {weatherData.current.feelslike_c}<sup>o</sup></span> -->
												</p>
											</div>
											<div class="flex items-center space-x-2 mx-3">
												<img src={wind} alt="" class="w-5" />

												<p>
													<span>NO DATA FOUND :</span>
												</p>
											</div>
										</div>
									</div>
								</div>

								<!-- Air pollution -->
							</div>
						{/if}
					{:else}{/if}
					<!-- Air Quality -->
					{#if pollutionData}
						{#if pollutionData.list}
							<div class="mt-4">
								<h2 class="text-lg font-medium">Air Quality:</h2>
								<div class="ml-3">
									<p>
										Air Quality Index: {pollutionData.list[0].main.aqi}
										{#if pollutionData.list[0].main.aqi == 1}
											<span class="badge p-3 bg-green-500">Good</span>
										{:else if pollutionData.list[0].main.aqi == 2}
											<span class="badge p-3 bg-green-300">Fair</span>
										{:else if pollutionData.list[0].main.aqi == 3}
											<span class="badge p-3 bg-orange-300">Moderate</span>
										{:else if pollutionData.list[0].main.aqi == 4}
											<span class="badge p-3 bg-red-300">Poor</span>
										{:else if pollutionData.list[0].main.aqi == 5}
											<span class="badge p-3 bg-red-500">Very Poor</span>
										{/if}
									</p>
								</div>
							</div>
						{:else}
							<div class="mt-4">
								<h2 class="text-lg font-medium">API ERROR</h2>
							</div>
						{/if}
					{:else}{/if}
				</div>
			</div>
		</div>

		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Reviews" />
		<div role="tabpanel" class="tab-content p-10">
			<div class="flex justify-center">
				<div class="mt-[20px] w-9/10 md:w-4/5 xl:w-4/5">
					<p class="text-[30px]">Reviews:</p>
					<form
						use:enhance
						action="?/query"
						method="POST"
						on:submit={() => {
							onSubmit();
						}}
					>
						<div class="max-w-lg">
							<h1 class="text-3xl font-medium mb-6">Leave a Review</h1>

							<div class="flex items-center mb-4">
								<span class="mr-2 text-lg">Stars:</span>
								<div class="flex">
									{#each Array.from({ length: 5 }) as _, index}
										<svg
											class="star h-8 w-8 fill-current {index < stars ? 'star-filled' : ''}"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											on:click={() => handleStarHover(index + 1)}
											on:mouseover={() => handleStarHover(index + 1)}
											on:mouseleave={handleStarLeave}
										>
											<path
												d="M10 0l2.4 7.4H20l-6 4.6 2.3 7.4L10 15l-6 4.4 2.3-7.4-6-4.6h7.6L10 0z"
											/>
										</svg>
									{/each}
								</div>
								<span class="ml-2">{stars}/5</span>
							</div>
							<input
								hidden
								type="number"
								id="star"
								name="star"
								bind:value={stars}
								disabled={isLoading}
							/>

							<div class="mb-4">
								<label for="comment" class="text-lg block mb-2">Comment:</label>
								<textarea
									id="comment"
									name="comment"
									bind:value={comment}
									disabled={isLoading}
									placeholder="Leave a comment"
									class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
									rows="4"
								></textarea>
							</div>

							<button
								type="submit"
								class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors mb-10"
								on:click={handleSubmit}
							>
								Submit
							</button>
						</div>
					</form>
					<div>
						{#if allReviews}
							{#each allReviews as review, index}
								<div class="flex my-5">
									<div class="mr-3 flex-shrink-0">
										<img
											class="mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
											src={deafaultImage}
											alt=""
										/>
									</div>
									<div class="flex-1 rounded-lg border px-4 py-2 leading-relaxed sm:px-6 sm:py-4">
										<strong>{review.reviewerName}</strong>
										<span class="text-xs text-gray-400"
											>{review.createdAt.toString().split('T')[0]}</span
										>
										<span class="flex flex-row">
											{#each Array.from({ length: review.star }) as _, index}
												<svg
													class="star h-4 w-4 fill-current star-filled"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
												>
													<path
														d="M10 0l2.4 7.4H20l-6 4.6 2.3 7.4L10 15l-6 4.4 2.3-7.4-6-4.6h7.6L10 0z"
													/>
												</svg>
											{/each}
											{#each Array.from({ length: 5 - review.star }) as _, index}
												<svg
													class="star h-4 w-4 fill-current star_"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
												>
													<path
														d="M10 0l2.4 7.4H20l-6 4.6 2.3 7.4L10 15l-6 4.4 2.3-7.4-6-4.6h7.6L10 0z"
													/>
												</svg>
											{/each}
										</span>

										<p class="text-sm mt-3">
											{review.comment}
										</p>
									</div>
								</div>
							{/each}
						{:else}
						<div class="flex h-full w-full items-center justify-center">
							<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
						</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Blogs" />
		<div role="tabpanel" class="tab-content p-10">
			{#if allBlogs}
				{#if allBlogs.length > 0}
					{#each allBlogs as blog}
						<div class="card card-side bg-base-100 shadow-xl border border-slate-100 p-5">
							<figure><BlogSVG /></figure>
							<div class="card-body">
								<p class="font-bond text-3xl">{blog.blogTitle}</p>
								<p><span class="font-medium">Writer:</span> {blog.writerName}</p>
								<p><span class="font-medium">Created at:</span> {blog.createdAt.split('T')[0]}</p>
								<p>
									<span class="font-medium">Tags:</span>
									{#each blog.tags.split(',') as tag}
										<span
											class="rounded-full px-2 py-1 text-sm transition-colors bg-gray-200 badge"
										>
											{tag}</span
										>
									{/each}
								</p>
								<div class="card-actions justify-end">
									<a href="./{slug}/{blog.blogId}" target="_blank">
										<button class="btn btn-primary">Read</button>
									</a>
								</div>
							</div>
						</div>
					{/each}
				{:else}
					<div class="flex flex-col justify-center items-center">
						<div class="text-xl mt-20 text-red-500 bg-red-200 rounded-xl p-3">
							No blogs written yet
						</div>
					</div>
				{/if}
			{:else}
			<div class="flex h-full w-full items-center justify-center">
				<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
			</div>
			{/if}
		</div>
	</div>
</div>

<!-- <pre>{JSON.stringify(data.allReviews, null, 2)}</pre> -->

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
