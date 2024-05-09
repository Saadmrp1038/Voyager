<script>
	// @ts-nocheck
	import explore from '$lib/images/explore.jpg'
	import { onDestroy, onMount } from 'svelte';
	import saveTime from '$lib/images/adventure.gif';

	import genie from '$lib/images/voyager.png';
	import bulb from '$lib/images/voyager.png';

	import { writable } from 'svelte/store';
	import Footer from '$lib/components/Footer.svelte';
	import ShortFooter from '$lib/components/shortFooter.svelte';

	let screenSize = writable('');

	function updateScreenSize() {
		const width = window.innerWidth;
		if (width < 640) {
			screenSize.set('small'); // Set screen size to 'small' for widths less than 640px
		} else if (width >= 640 && width < 1024) {
			screenSize.set('medium'); // Set screen size to 'medium' for widths between 640px and 1024px
		} else {
			screenSize.set('large'); // Set screen size to 'large' for widths greater than or equal to 1024px
		}
	}
	let drop = 0;
	const handleClick = () => {
		drop = !drop;
		if (!drop) {
			const elem = document.activeElement;
			if (elem) {
				elem?.blur();
			}
		}
	};
	onMount(updateScreenSize);
	if (typeof window !== 'undefined') {
		window.addEventListener('resize', updateScreenSize);
	}
	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', updateScreenSize);
		}
	});
	// @ts-ignore
	let screenSizeSub;
	// @ts-ignore
	const unsubscribe = screenSize.subscribe((value) => {
		screenSizeSub = value;
	});
</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<div class="titleSection">
	<div class="navbar z-10 fixed bg-[#ffffff8f]">
		<div class="flex-1">
			<a class=" text-xl flex items-center" href="/">
				<img src={bulb} alt="logo" class="h-12" />
				<!-- <p class="text-[28px] ml-2">YOSO</p> -->
			</a>
		</div>
		{#if screenSizeSub === 'small'}
			<div class="flex-none">
				<button class="btn btn-square btn-ghost"> </button>
			</div>
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn m-1 on:click={handleClick}">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-5 h-5 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path></svg
					>
				</div>
				<ul
					tabindex="0"
					class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li on:click={handleClick}><a href="/about">About</a></li>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li on:click={handleClick}><a href="/login">Get Started</a></li>
				</ul>
			</div>
		{:else}
			<div>
				<div class="flex items-center justify-between px-4 mr-5 font-bold text-[22px]">
					<div class="flex space-x-4">
						<a href="/about" class=" hover:text-[#1a1919] hover:scale-105">About</a>

						<a href="/login" class=" hover:text-[#1d1d1d] hover:scale-105">Get Started</a>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div class="h-[100vh]">
		<div class=" w-full h-[100%]">
			<div class="flex items-center justify-center h-[100%]">
				<div class="grid grid-flow-row text-center w-[100%]">
					<div class="flex items-center justify-center welcome-animation mb-14">
						<p class="font-serif text-4xl font-extrabold">Welcome To</p>
					</div>
					<div class=" animated-element flex items-center justify-center">
						<!-- <p class=" md:text-[140px] lg:text-[150px] text-[90px] text-bold font-bold secondPhase">
							Ask-Titas
						</p> -->
						<img src={genie} alt="logo" class="w-64 h-48 secondPhase align-middle" />
					</div>
					<div class=" flex items-center justify-center text-[20px] thirdPhase opacity-0">
						<p class="font-sans md:w-1/2 p-2">Voyager is an application about your surroundings. Explore and enlighten world about your area </p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="md:min-h-[70vh] bg-[#88ddff] explore flex items-center">
		<div class="md:grid lg:grid grid-cols-[50%_auto] h-full">
			<div class="flex items-center justify-center">
			</div>
			<div class="m-4 p-3 flex items-center justify-center">
				<div class="save text-[#252525]">
					<p class="md:text-[84px] text-[60px] font-bold leading-tight ">
						Know about <br> your <span>City</span> 
					</p>
					<p class="text-[24px] md:w-3/4">
						Understanding your city isn't just about knowing its streets; it's about discovering its vibrant places and hidden gems. Whether you're a longtime resident or a newcomer, embracing these places enriches your connection to your city
					</p>
				</div>
			</div>
		</div>
	</div>
	
	<div class="md:h-[70vh] bg-[#fffd88] share">
		<div class="md:grid lg:grid grid-cols-[50%_auto] h-full">
			<div class="m-4 p-3 flex items-center justify-center">
				<div class="save">
					<p class="md:text-[80px] text-[60px] font-bold leading-tight">
						Share your experience
					</p>
					<p class="text-[24px] md:w-3/4">
						Living in my city is like being part of a bustling mosaic of cultures, flavors, and experiences. Each day brings new discoveries and adventures. Share your experience with the world.
					</p>
				</div>
			</div>
			<div class="flex items-center justify-center">
			</div>
			
		</div>
	</div>



	<Footer />
	<ShortFooter />
</div>

<style>
	@keyframes slideIn {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(0);
		}
	}
	.animated-element {
		animation: slideIn 1.5s ease-in-out forwards;
	}

	@keyframes welcome {
		0% {
			margin-top: 0;
			font-size: 80px;
		}
		100% {
			margin-top: -75px;
			font-size: 40px;
		}
	}
	.welcome-animation {
		animation: welcome 1.5s linear forwards;
	}

	@keyframes comeToLight {
		0% {
			margin-top: 0;
			font-size: 150px;
		}
		100% {
			margin-top: -50px;
			font-size: 100px;
		}
	}
	.secondPhase {
		animation: comeToLight 1.5s ease-in-out forwards;
		animation-delay: 1.5s;
	}

	@keyframes comeToLight3 {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	.thirdPhase {
		animation: comeToLight3 1.5s ease-in-out forwards;
		animation-delay: 3s;
	}

	@keyframes saveTime {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(0);
		}
	}
	.save {
		animation: saveTime 1.5s ease-in-out forwards;
		animation-timeline: view();
		animation-range-start: 100px;
		animation-range-end: 400px;
	}
	.explore{
		background-repeat: no-repeat;
		background-size: cover; /* Cover the entire background */
        background-position: center; 
		background-image: url("https://bsmedia.business-standard.com/_media/bs/img/article/2015-09/02/full/1441188813-5141.jpg?im=FeatureCrop,size=(826,465)") ;
	}
	.share{
		background-repeat: no-repeat;
		background-size: cover; /* Cover the entire background */
        background-position: center; 
		background-image: url("");
	}
	.titleSection {
		background-attachment: fixed;
		background-color: #f0e7c0;
		/* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)' %3E%3Cstop offset='0' stop-color='%23ffffff' /%3E%3Cstop offset='1' stop-color='%234FE' /%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900' %3E%3Cg fill-opacity='0.1' %3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300' /%3E%3Cpolygon points='90 150 180 0 0 0' /%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0' /%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300' /%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0' /%3E%3Cpolygon points='630 150 540 300 720 300' /%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0' /%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300' /%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0' /%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300' /%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0' /%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600' /%3E%3Cpolygon points='90 450 180 300 0 300' /%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600' /%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300' /%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600' /%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300' /%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600' /%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300' /%3E%3Cpolygon points='810 450 720 600 900 600' /%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300' /%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600' /%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300' /%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900' /%3E%3Cpolygon points='270 750 180 900 360 900' /%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600' /%3E%3Cpolygon points='450 750 540 600 360 600' /%3E%3Cpolygon points='630 750 540 900 720 900' /%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600' /%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900' /%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600' /%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900' /%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150' /%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150' /%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150' /%3E%3Cpolygon points='900 0 810 150 990 150' /%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450' /%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150' /%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450' /%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150' /%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450' /%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150' /%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450' /%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150' /%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450' /%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150' /%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450' /%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150' /%3E%3Cpolygon points='0 600 -90 750 90 750' /%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450' /%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750' /%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450' /%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750' /%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450' /%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450' /%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750' /%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750' /%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450' /%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750' /%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750' /%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750' /%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750' /%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750' /%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750' /%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450' /%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150' /%3E%3Cpolygon points='1080 600 990 750 1170 750' /%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450' /%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750' /%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25' /%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25' /%3E%3C/svg%3E"); */
	}
</style>
