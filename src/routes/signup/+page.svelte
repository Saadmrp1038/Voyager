<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { z } from 'zod';
	export let data: PageData;

	const userSchema = z.object({
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(256, { message: 'Email must be less than 256 characters' })
			.email({ message: 'Email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.regex(new RegExp('.*[A-Z].*'), 'Password must contain at least one uppercase character')
			.regex(new RegExp('.*[a-z].*'), 'Password must contain at least one lowercase character')
			.regex(new RegExp('.*\\d.*'), 'Password must contain at least one number')
			.regex(
				new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
				'Password must contain at least one special character'
			)
			.trim()
	});

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		validators: userSchema
	});

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 5000);
		// $form.email = '';
		// $form.password = '';
	}
</script>

<section class="h-screen ml-10 mr-10">
	<div class="h-full">
		<!-- Left column container with background-->
		<div class="flex h-full flex-wrap items-center justify-center lg:justify-between">
			<div
				class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12"
			>
				<img
					src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
					class="w-full"
					alt="Sample image"
				/>
			</div>

			<!-- Right column container -->
			<div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
				<form
					use:enhance
					action="?/register"
					method="post"
					class="mt-6"
					on:submit={() => {
						onSubmit();
					}}
				>
					<!-- Separator between social media sign in and email/password sign in -->
					<div
						class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"
					>
						<p class="mx-4 mb-0 text-center font-semibold dark:text-white">Sign Up</p>
					</div>

					{#if $message}
						{#if $message === 'Signup Successful. Please check mail'}
							<div
								class="text-green-400 border-green-400 border-2 bg-green-100 py-2 px-2 rounded-sm text-base mt-4 mb-6"
							>
								{$message}
							</div>
						{:else}
							<div
								class="text-red-500 border-red-500 border-2 bg-red-100 py-2 px-2 rounded-sm text-base mt-4 mb-6"
							>
								{$message}
							</div>
						{/if}
					{/if}

					<!-- Email input -->
					<div class="relative mb-6" data-twe-input-wrapper-init>
						<label class="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="w-4 h-4 opacity-70"
								><path
									d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
								/></svg
							>
							<input
								class="flex-grow"
								required
								type="email"
								placeholder="name@domain.com"
								name="email"
								id="email"
								disabled={isLoading}
								bind:value={$form.email}
							/>
						</label>
						{#if $errors.email}
							<small class="text-red-500">{$errors.email[0]}</small>
						{/if}
					</div>

					<!-- Password input -->
					<div class="relative mb-6" data-twe-input-wrapper-init>
						<label class="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="w-4 h-4 opacity-70"
								><path
									fill-rule="evenodd"
									d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
									clip-rule="evenodd"
								/></svg
							>
							<input
								class="flex-grow"
								required
								type="password"
								name="password"
								id="password"
								disabled={isLoading}
								bind:value={$form.password}
							/>
						</label>
						{#if $errors.password}
							<small class="text-red-500">{$errors.password[0]}</small>
						{/if}
					</div>

					<div class="mb-6 flex items-center justify-between">
						<!-- Remember me checkbox -->
						<!-- <div class="flex items-center justify-between">
							<div class="flex items-center">
								<input
									id="remember_me"
									name="remember_me"
									type="checkbox"
									class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label for="remember_me" class="ml-2 block text-sm text-gray-900">
									Remember me
								</label>
							</div>
						</div> -->

						<!--Forgot password link-->
						<div class="font-medium text-black">
							Alread have an account? <a href="/login" class="text-sky-600 hover:underline">Log In</a>
						</div>
					</div>

					<!-- Login button -->
					<div class="text-center lg:text-left">
						<button
							type="submit"
							class="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{#if isLoading}
							<span class="loading loading-spinner loading-xs"></span>
							{/if}
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<!-- <style>
	input:not(:placeholder-shown) + label {
		transform: translate(-0.75rem, -1.15rem) scale(0.8);
	}

	/* When the input is focused or valid */
	input:focus:not(:placeholder-shown) + label,
	input:valid + label {
		transform: translate(-0.75rem, -1.15rem) scale(0.8);
	}
</style> -->
