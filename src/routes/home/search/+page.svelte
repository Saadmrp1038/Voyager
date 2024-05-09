<script lang="ts">
	import _ from 'lodash'; // Import lodash library using default export
	const debounce = _.debounce; // Extract debounce function from lodash
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { browser } from '$app/environment';

	// import L from 'leaflet';
	// import 'leaflet/dist/leaflet.css';

	// import { enhance } from '$app/forms';
	// import { goto } from '$app/navigation';
	// import { onMount } from 'svelte';

	export let data: PageData;

	export let form: ActionData;

	let lat = 'Fetching...';
	let lon = 'Fetching...';
	let myLat = 'Fetching...';
	let myLon = 'Fetching...';
	let placeId = 'Fetching...';
	let myPlaceId = 'Fetching...';
	let otherPlaceId = 'Fetching...';
	let otherLat = 'Fetching...';
	let otherLon = 'Fetching...';
	let rng: any;
	let education;
	let commercial;

	let locations: any = [];
	let showMessage = false;
	$: {
		// console.log(form?.success);
		locations = [];
		if (form?.success == 'done') {
			locations = form?.returned.features;
			console.log(locations);
			isLoading = false;
			form = null;
			showMessage = true;
			clearInterval(timerId);
		}
	}
	// async function getAllLocation() {
	// 	const mymap = L.map('Places-Position').setView([23.8103, 90.4125], 7);
	// 	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	// 		attribution: '&copy; OpenStreetMap contributors'
	// 	}).addTo(mymap);

	// 	const customIcon = L.icon({
	// 		iconUrl:
	// 			'https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png',
	// 		iconSize: [30, 30],
	// 		iconAnchor: [15, 40],
	// 		popupAnchor: [0, -40]
	// 	});

	// 	hospitals.forEach((hospital) => {
	// 		L.marker([hospital.latitude, hospital.longitude], {
	// 			icon: customIcon
	// 		})
	// 			.addTo(hospitalMap)
	// 			.bindPopup(
	// 				`<b>${hospital.name}</b><br>Lat: ${hospital.latitude}, Lon: ${hospital.longitude}`
	// 			)
	// 			.openPopup();
	// 	});
	// }
	// let mapElement;
	// let map;

	$: if (locations) {
		if (locations.length > 0) {
			func();
		}
	}
	async function func() {
		if (browser) {
			const leaflet = await import('leaflet');

			const myMap = leaflet.map('mapElement').setView([23.8103, 90.4125], 7);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					// attribution:
					// 	'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					attribution: '&copy; OpenStreetMap contributors'
				})
				.addTo(myMap);

			// import airport from '$lib/images/airport.svg';
			// import entertainment from '$lib/images/entertainment-svgrepo-com.svg';
			// import educational from '$lib/images/educational.png';
			// import heritage from '$lib/images/heritage.png';
			// import hoppital from '$lib/images/hospital.png';
			// import sports from '$lib/images/sports.png';
			// import commercial from '$lib/images/transportation-commercial-svgrepo-com.svg';

			const customIcon_airport = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/airport.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_entertainment = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/entertainment.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_educational = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/education.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_heritage = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/heritage.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_sports = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/sport.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_commercial = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/commercial.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_hoppital = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/healthcare.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_natural = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/natural.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_catering = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/catering.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_activity = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/activity.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});
			const customIcon_accomodation = leaflet.icon({
				iconUrl:
					'https://fcqhfoxwjhdusijowxpj.supabase.co/storage/v1/object/public/static/accomodation.png',
				iconSize: [40, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});

			locations.forEach((location) => {
				if(location.properties.name){
				console.log(location.properties.name, location.properties.lat);
				let myurl = `./details/${location.properties.place_id}`;
				if (location.properties.categories[0] == 'education') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_educational
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'airport') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_airport
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'entertainment') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_entertainment
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'commercial') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_commercial
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'healthcare') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_hoppital
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'sport') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_sports
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'heritage') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_heritage
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'accomodation') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_accomodation
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'natural') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_natural
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'catering') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_catering
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
				if (location.properties.categories[0] == 'activity') {
					leaflet
						.marker([location.properties.lat, location.properties.lon], {
							icon: customIcon_activity
						})
						.addTo(myMap)
						.bindPopup(
							`<a href=${myurl}>Go >></a><b>${location.properties.categories[0]}</b><br><b>${location.properties.name}</b><br>Lat: ${location.properties.lat}, Lon: ${location.properties.lon}`
						)
						.openPopup();
				}
			}
			});

			// leaflet
			// 	.marker([51.5, -0.09])
			// 	.addTo(map)
			// 	.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
			// 	.openPopup();
		}
	}
	onMount(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					myLat = position.coords.latitude;
					myLon = position.coords.longitude;
					getCurrentPlaceId();
				},
				(error) => {
					console.error(error);
					myLat = 'Unable to fetch';
					myLon = 'Unable to fetch';
				}
			);
		} else {
			lat = 'Geolocation is not supported by this browser.';
			lon = 'Geolocation is not supported by this browser.';
		}
	});

	async function getCurrentPlaceId() {
		const ret = await fetch(`/api/geoapify/details-latlon`, {
			method: 'POST',
			body: JSON.stringify({ lat: myLat, lon: myLon })
		});
		const res = await ret.json();

		myPlaceId = res.features[0].properties.place_id;
		console.log(myPlaceId);
	}

	let isLoading = false;
	let timerId: any;
	async function onSubmit() {
		showMessage = false;
		isLoading = true;
		timerId = setTimeout(() => {
			isLoading = false;
		}, 10000);
	}

	let categories = '';
	let isEducationChecked = false;
	let isAccommodationChecked = false;
	let isActivityChecked = false;
	let isAirportChecked = false;
	let isCommercialChecked = false;
	let isCateringChecked = false;
	let isEntertainmentChecked = false;
	let isHealthCareChecked = false;
	let isHeritageChecked = false;
	let isNaturalChecked = false;
	let isSportChecked = false;

	function buildCategories() {
		categories = '';
		isNoneSelected = true;

		if (isEducationChecked) {
			categories += 'education,';
			isNoneSelected = false;
		}
		if (isAccommodationChecked) {
			categories += 'accommodation,';
			isNoneSelected = false;
		}
		if (isActivityChecked) {
			categories += 'activity,';
			isNoneSelected = false;
		}
		if (isAirportChecked) {
			categories += 'airport,';
			isNoneSelected = false;
		}
		if (isCommercialChecked) {
			categories += 'commercial,';
			isNoneSelected = false;
		}
		if (isCateringChecked) {
			categories += 'catering,';
			isNoneSelected = false;
		}
		if (isEntertainmentChecked) {
			categories += 'entertainment,';
			isNoneSelected = false;
		}
		if (isHealthCareChecked) {
			categories += 'healthcare,';
			isNoneSelected = false;
		}
		if (isHeritageChecked) {
			categories += 'heritage,';
			isNoneSelected = false;
		}
		if (isNaturalChecked) {
			categories += 'natural,';
			isNoneSelected = false;
		}
		if (isSportChecked) {
			categories += 'sport,';
			isNoneSelected = false;
		}
		if (categories.length > 0 && categories.endsWith(',')) {
			categories = categories.slice(0, -1);
		}
		console.log(categories);
	}

	function toggleEducationCheckbox() {
		isEducationChecked = !isEducationChecked;
		buildCategories();
	}

	function toggleAccommodationCheckbox() {
		isAccommodationChecked = !isAccommodationChecked;
		buildCategories();
	}

	function toggleActivityCheckbox() {
		isActivityChecked = !isActivityChecked;
		buildCategories();
	}

	function toggleAirportCheckbox() {
		isAirportChecked = !isAirportChecked;
		buildCategories();
	}

	function toggleCommercialCheckbox() {
		isCommercialChecked = !isCommercialChecked;
		buildCategories();
	}

	function toggleCateringCheckbox() {
		isCateringChecked = !isCateringChecked;
		buildCategories();
	}

	function toggleEntertainmentCheckbox() {
		isEntertainmentChecked = !isEntertainmentChecked;
		buildCategories();
	}

	function toggleHealthCareCheckbox() {
		isHealthCareChecked = !isHealthCareChecked;
		buildCategories();
	}

	function toggleHeritageCheckbox() {
		isHeritageChecked = !isHeritageChecked;
		buildCategories();
	}

	function toggleNaturalCheckbox() {
		isNaturalChecked = !isNaturalChecked;
		buildCategories();
	}

	function toggleSportCheckbox() {
		isSportChecked = !isSportChecked;
		buildCategories();
	}

	let address = '';
	$: suggestions = [];
	let showSuggestions = false;

	const debouncedFetchSuggestions = debounce(fetchSuggestions, 1000);
	const debouncedFetchSuggestions2 = debounce(fetchSuggestions2, 1000);

	async function fetchSuggestions() {
		const ret = await fetch(`/api/geoapify/autocomplete`, {
			method: 'POST',
			body: JSON.stringify({ address: address })
		});
		const res = await ret.json();
		suggestions = res.results;
		showSuggestions = true;

		console.log(suggestions);
	}

	async function fetchSuggestions2() {
		const ret = await fetch(`/api/geoapify/autocomplete-city`, {
			method: 'POST',
			body: JSON.stringify({ address: address })
		});
		const res = await ret.json();
		suggestions = res.results;
		showSuggestions = true;

		console.log(suggestions);
	}

	function handleInput(event) {
		address = event.target.value;
		if (isSearchInALocation) {
			debouncedFetchSuggestions2();
		} else {
			debouncedFetchSuggestions();
		}
	}

	function selectSuggestion(suggestion: any) {
		address = suggestion.address_line1;
		otherLat = suggestion.lat;
		otherLon = suggestion.lon;
		otherPlaceId = suggestion.place_id;
		showSuggestions = false;
	}

	let isAutoLocation = false;
	let isSearchInALocation = false;
	let searchType = 'radius';

	$: {
		if (isAutoLocation) {
			lat = myLat;
			lon = myLon;
			placeId = myPlaceId;

			address = null
		} else {
			lat = otherLat;
			lon = otherLon;
			placeId = otherPlaceId;

		}

		if (isSearchInALocation) {
			searchType = 'city';

			rng = null
		} else {
			searchType = 'radius';
		}
	}

	let isNoneSelected = true;

	$: {
		console.log(isNoneSelected);
	}

	let isMap = false;

	const mapfunc = () => {
		func();
		isMap = !isMap;
	};
</script>

<div class="flex flex-col items-center justify-center mt-10">
	<form
		use:enhance={() => {
			return async ({ update, result }) => {
				update({ reset: false, invalidateAll: false });
			};
		}}
		action="?/query"
		method="POST"
		on:submit={() => {
			onSubmit();
		}}
	>
		<div class="dropdown flex flex-col">
			<input
				required
				class="input input-bordered input-primary w-full mb-5"
				name="address"
				bind:value={address}
				on:input={handleInput}
				autocomplete="off"
				disabled={isLoading || isAutoLocation}
				placeholder="Current Address"
			/>
			{#if showSuggestions && suggestions.length > 0}
				<ul>
					{#each suggestions as suggestion}
						<li on:click={() => selectSuggestion(suggestion)}>{suggestion.address_line1}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<input
			required
			class="input input-bordered input-primary w-full"
			type="number"
			id="rng"
			name="rng"
			bind:value={rng}
			disabled={isLoading || isSearchInALocation}
			placeholder="Radius of search (in m)"
		/>

		<input hidden type="text" id="lat" name="lat" bind:value={lat} disabled={isLoading} />
		<input hidden type="text" id="lon" name="lon" bind:value={lon} disabled={isLoading} />
		<input
			hidden
			type="text"
			id="placeId"
			name="placeId"
			bind:value={placeId}
			disabled={isLoading}
		/>
		<input hidden type="text" id="categories" name="categories" bind:value={categories} />
		<input hidden type="text" id="searchType" name="searchType" bind:value={searchType} />

		<div class="flex felx-row justify-around">
			<div class="flex items-center mt-10">
				<!-- First toggle -->
				<div>
					<label for="toggleA" class="flex items-center cursor-pointer">
						<!-- toggle -->
						<div class="relative">
							<!-- input -->
							<input
								type="checkbox"
								id="toggleA"
								class="sr-only"
								on:click={() => (isAutoLocation = !isAutoLocation)}
							/>
							<!-- line -->
							<div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
							<!-- dot -->
							<div
								class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
							></div>
						</div>
						<!-- label -->
						<div class="ml-3 text-gray-700 font-medium">
							{isAutoLocation ? 'Using current location' : 'Enter address'}
						</div>
					</label>
				</div>
			</div>

			<div class="flex items-center mt-10">
				<!-- Second toggle -->
				<div>
					<label for="toggleB" class="flex items-center cursor-pointer">
						<!-- toggle -->
						<div class="relative">
							<!-- input -->
							<input
								type="checkbox"
								id="toggleB"
								class="sr-only"
								on:click={() => (isSearchInALocation = !isSearchInALocation)}
							/>
							<!-- line -->
							<div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
							<!-- dot -->
							<div
								class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
							></div>
						</div>
						<!-- label -->
						<div class="ml-3 text-gray-700 font-medium">
							{!isSearchInALocation ? 'Searching in a radius' : 'Searching in a location'}
						</div>
					</label>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-3 gap-4 mt-5">
			<label>
				<input type="checkbox" on:change={toggleEducationCheckbox} />
				Education
			</label>
			<label>
				<input type="checkbox" on:change={toggleAccommodationCheckbox} />
				Accommodation
			</label>
			<label>
				<input type="checkbox" on:change={toggleActivityCheckbox} />
				Activity
			</label>
			<label>
				<input type="checkbox" on:change={toggleAirportCheckbox} />
				Airport
			</label>
			<label>
				<input type="checkbox" on:change={toggleCommercialCheckbox} />
				Commercial
			</label>
			<label>
				<input type="checkbox" on:change={toggleCateringCheckbox} />
				Catering
			</label>
			<label>
				<input type="checkbox" on:change={toggleEntertainmentCheckbox} />
				Entertainment
			</label>
			<label>
				<input type="checkbox" on:change={toggleHealthCareCheckbox} />
				Health Care
			</label>
			<label>
				<input type="checkbox" on:change={toggleHeritageCheckbox} />
				Heritage
			</label>
			<label>
				<input type="checkbox" on:change={toggleNaturalCheckbox} />
				Natural
			</label>
			<label>
				<input type="checkbox" on:change={toggleSportCheckbox} />
				Sport
			</label>
		</div>

		<div class="flex flex-row justify-center mt-5">
			<span class="text-sm text-gray-500">Pick atleast one category</span>
		</div>
		<div class="flex flex-row justify-center">
			<button
				type="submit"
				class="btn bg-green-500 hover:bg-green-600 rounded-lg text-xl font-semibold mt-2"
				disabled={isLoading || isNoneSelected}
			>
				{#if isLoading}
					<span class="loading loading-spinner loading-xs"></span>
				{/if}
				Submit
			</button>
		</div>
	</form>
</div>

{#if locations}
	{#if locations.length > 0}
		<div class="flex items-center mt-10 ml-10">
			<!-- map toggle -->
			<div>
				<label for="toggleC" class="flex items-center cursor-pointer">
					<!-- toggle -->
					<div class="relative">
						<!-- input -->
						<input type="checkbox" id="toggleC" class="sr-only" on:click={() => mapfunc()} />
						<!-- line -->
						<div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
						<!-- dot -->
						<div
							class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
						></div>
					</div>
					<!-- label -->
					<div class="ml-3 text-gray-700 font-medium">
						{isMap ? 'List View' : 'Map View'}
					</div>
				</label>
			</div>
		</div>

		{#if !isMap}
			<div class="grid grid-cols-3 gap-4 my-5">
				{#each locations as location}
					{#if location.properties.name}
						<a href="./details/{location.properties.place_id}">
							<div
								class="border border-slate-300 border-rounded card w-96 bg-base-100 shadow-xl hover:scale-105 mx-5"
							>
								<div class="card-body">
									<h2 class="card-title">
										{location.properties.name}
									</h2>
									{#if location.properties.street}
										<p>Street: {location.properties.street}</p>
									{/if}
									{#if location.properties.suburb}
										<p>Suburb: {location.properties.suburb}</p>
									{/if}
									{#if location.properties.city}
										<p>City: {location.properties.city}</p>
									{/if}
									{#if location.properties.postcode}
										<p>Postcode: {location.properties.postcode}</p>
									{/if}

									<div class="card-actions justify-end">
										{#each location.properties.categories as category}
											{#if !category.includes('.')}
												<div class="badge badge-outline">{category}</div>
											{/if}
										{/each}
									</div>
								</div>
							</div>
						</a>
					{/if}
				{/each}
			</div>
		{:else}
			<div id="mapElement" style="height: 500px;" class="rounded-lg shadow-md ml-10 mr-10 mt-6" />
			<!-- <div id="hospital-map" style="height: 500px;" class="rounded-lg shadow-md" /> -->
			<!-- <div bind:this={mapElement}>My Map</div> -->
		{/if}
	{:else if showMessage}
		<div class="flex flex-col justify-center items-center">
			<div class="text-xl mt-20 text-red-500 bg-red-200 rounded-xl p-3">
				No items found for these criteria
			</div>
		</div>
	{/if}
{:else if showMessage}
	<div class="flex flex-col justify-center items-center">
		<div class="text-xl mt-20 text-red-500 bg-red-200 rounded-xl p-3">
			No items found for these criteria
		</div>
	</div>
{/if}

<!-- <pre>{JSON.stringify(locations, null, 2)}</pre> -->

<!-- <h1>Your Current Location</h1>
<p>Latitude: {lat}</p>
<p>Longitude: {lon}</p> -->

<!-- 
name, street, suburb, city, postcode, categories(its an array)

-->

<style>
	.toggle {
		position: relative;
		width: 60px;
		height: 30px;
		border-radius: 15px;
		background-color: #ccc;
		cursor: pointer;
	}

	.handle {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background-color: #fff;
		transition: transform 0.3s;
	}

	.toggle.on .handle {
		transform: translateX(30px);
	}
	.dropdown {
		position: relative;
	}

	.dropdown ul {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 1000;
		display: none;
		margin: 0;
		padding: 0;
		list-style: none;
		background-color: #fff;
		border: 1px solid #ccc;
		border-top: none;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.dropdown:hover ul {
		display: block;
	}

	.dropdown ul li {
		padding: 8px 16px;
		cursor: pointer;
	}

	.dropdown ul li:hover {
		background-color: #f4f4f4;
	}

	input:checked ~ .dot {
		transform: translateX(100%);
		background-color: #48bb78;
	}

	.dot {
		transition: transform 0.3s ease-in-out;
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}

	#map {
		width: 100%;
		height: 100%;
	}
</style>
