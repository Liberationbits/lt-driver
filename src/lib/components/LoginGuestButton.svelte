<script lang="ts">
	import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
	import ndk from '$lib/stores/ndk';
	import { currentUser } from '$stores/current-user';
	// import { setupPlaceholderProfile } from './LoginModal/placeholder-profile';
	import KeyIcon from '$lib/icons/Key.svelte';
	import AttentionButton from '$lib/components/buttons/AttentionButton.svelte';

	async function loginAsGuest() {
		const pk = NDKPrivateKeySigner.generate();
		$ndk.signer = pk;
		try {
			$currentUser = await $ndk.signer?.user();

			if ($currentUser) {
				localStorage.setItem('nostr-key-method', 'pk');
				localStorage.setItem('nostr-key', pk.privateKey!);
				localStorage.setItem('nostr-target-npub', $currentUser.npub);

				// setupPlaceholderProfile();
			}
		} catch (error) {
			console.log('Error creating new user: ' + error);
			// todo notify user additionally
		}
	}
</script>

<AttentionButton handleClick={loginAsGuest}>
	<div class="flex items-center gap-2">
		<KeyIcon />
		<span>Neue Schlüssel generieren</span>
	</div>
</AttentionButton>
