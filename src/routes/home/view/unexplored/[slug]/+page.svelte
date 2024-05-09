<script lang="ts">
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import type { PageData } from '../$types';
	import 'leaflet/dist/leaflet.css';
	import { browser } from '$app/environment';
	export let data: PageData;

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

	function formatTimestamp(timestamp: string): string {
		const date = new Date(timestamp);
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false // Use 24-hour clock
		};

		return new Intl.DateTimeFormat('en-US', options).format(date);
	}

	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/trainerlogin', '_self');
	};
	// let values = res.tags.split(',');

	let currentBlog: any = null;

	$: if (currentBlog) {
		lat = currentBlog.lat;
		lon = currentBlog.lon;
		console.log(lat," ",lon)
		func();
	}

	onMount(() => {
		data.currentBlog.then((res) => {
			currentBlog = res[0];
			// console.log(res)
		});
	});

	let lat = '';
	let lon = '';

	async function func() {
		if (browser) {
			const leaflet = await import('leaflet');

			const myMap = leaflet.map('mapElement').setView([parseFloat(lat), parseFloat(lon)], 7);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					// attribution:
					// 	'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					attribution: '&copy; OpenStreetMap contributors'
				})
				.addTo(myMap);

			const marker = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/marker.svg?t=2024-04-27T03%3A10%3A35.817Z',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});

			leaflet
				.marker([lat, lon], {
					icon: marker
				})
				.addTo(myMap)
				.bindPopup(`<b>${currentBlog.address}</b><br>Lat: ${lat}, Lon: ${lon}`)
				.openPopup();
		}
	}
</script>

<div class="m-2 flex flex-row justify-between">
	<a href="/home/unexplored">
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
				{currentBlog.name}
			</h1>
			<h1 class="font-semibold text-xl">
				{currentBlog.address}
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
			<div class="flex flex-row space-x-6">
				<p>
					Latitude: {currentBlog.lat}
				</p>
				<p>
					Longitude: {currentBlog.lon}
				</p>
			</div>
		</div>
		<div class="mt-16 ml-24 mr-24">
			{@html currentBlog.content}
		</div>
	</div>

	<div id="mapElement" style="height: 500px;" class="rounded-lg shadow-md ml-10 mr-10 my-6" />
	<style>
		.chipi {
			background-color: #c1d4e3;

			padding: 0.5rem;
			margin-right: 0.5rem;
			border-radius: 0.25rem;
			display: flex;
			align-items: center;
		}
	</style>
{:else}
	<div class="flex h-full w-full items-center justify-center">
		<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
	</div>
{/if}
