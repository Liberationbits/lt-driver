<script lang="ts">
	import ndk from '$stores/ndk';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import { NDKNip07Signer } from '@nostr-dev-kit/ndk';
	import { currentUser } from '$stores/current-user';
	import Navbar from '$components/Navbar.svelte';

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

<div class="mx-auto">
	<slot />
</div>
