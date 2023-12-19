<script lang="ts">
	import ndk from '$stores/ndk';
	import { onDestroy, onMount } from 'svelte';
	import '../app.postcss';
	import { NDKNip07Signer } from '@nostr-dev-kit/ndk';
	import { currentUser } from '$stores/current-user';
	import Navbar from '$components/Navbar.svelte';
	import dayjs from 'dayjs';
	import weekOfYear from 'dayjs/plugin/weekOfYear';

	onMount(async () => {
		try {
			$ndk.connect();

			if (localStorage.getItem('nostr-login') === 'nip07') {
				await login();
			}
		} catch (e) {
			console.error(`layout error`, e);
		}
	});

	dayjs.extend(weekOfYear);
	let currentDate = dayjs();
	const intervalId = setInterval(() => {
		currentDate = dayjs();
	}, 1000);
	$: weekNumber = currentDate.week();

	onDestroy(() => clearInterval(intervalId));

	async function login() {
		$ndk.signer = new NDKNip07Signer();
		try {
			$currentUser = await $ndk.signer?.blockUntilReady();
			if ($currentUser) {
				$currentUser.ndk = $ndk;
				localStorage.setItem('nostr-login', 'nip07');
			}
		} catch (error) {
			console.log('Error during login: ' + error);
			// todo: notify user additionally
		}
	}

	$: if ($currentUser) {
		console.log(`init`);
	}
</script>

<Navbar />

<div class="text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl my-2">
	KW {weekNumber} - {currentDate.format('DD.MM.YYYY HH:mm:ss')}
</div>

<div class="mx-auto">
	<div class="flex flex-col gap-12">
		<section
			class="mx-2 flex flex-col items-center justify-center gap-8 md:h-[50vh] md:flex-row lg:mx-auto"
		>
			<div class="flex w-full flex-col gap-3">
				<slot />
			</div>
		</section>
	</div>
</div>
