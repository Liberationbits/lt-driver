<script lang="ts">
	import ndk from '$stores/ndk';
	import { onDestroy, onMount } from 'svelte';
	import '../app.postcss';
	import { NDKNip07Signer } from '@nostr-dev-kit/ndk';
	import { currentUser } from '$stores/current-user';
	import Navbar from '$components/Navbar.svelte';
	import dayjs from 'dayjs';
	import weekOfYear from 'dayjs/plugin/weekOfYear';
	import { Modals } from 'svelte-modals';
	import { LocalStorageKeys } from '$utils/login';

	onMount(async () => {
		try {
			$ndk.connect();

			if (localStorage.getItem(LocalStorageKeys.NostrLogin) === 'nip07') {
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
				localStorage.setItem(LocalStorageKeys.NostrLogin, 'nip07');
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

<Modals>
	<div slot="backdrop" role="none" />
</Modals>

<div class="my-2 text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl">
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

<footer class="footer footer-center my-20 bg-base-100 p-4 text-base-content">
	<aside>
		<p>
			<a
				target="_blank"
				href="https://njump.me/nprofile1qy88wumn8ghj7mn0wvhxcmmv9uq3uamnwvaz7tmwdaehgu3dwp6kytnhv4kxcmmjv3jhytnwv46z7qghwaehxw309a3xjarrda5kuetj9eek7cmfv9kz7qpqw80jzxf36fhwgyfp622m6s7tcl3cy5z7xva4cy75q9kwm92zm8tst5kv8k"
			>
				Mit 💜 gemacht von <span class="link">@rodant </span></a
			>
		</p>
		<p>
			&copy; 2024 - <a
				class="link"
				target="_blank"
				href="https://github.com/Liberationbits/lt-driver?tab=AGPL-3.0-1-ov-file#readme"
				>Open Source AGPL 3.0 Linzenz</a
			>
		</p>
	</aside>
</footer>
