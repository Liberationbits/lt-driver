<script lang="ts">
	import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
	import ndk from '$lib/stores/ndk';
	import { currentUser } from '$stores/current-user';
	import KeyIcon from '$lib/icons/Key.svelte';
	import AttentionButton from '$lib/components/buttons/AttentionButton.svelte';
	import { LocalStorageKeys } from '$utils/login';

	async function loginAsGuest() {
		const pk = NDKPrivateKeySigner.generate();
		$ndk.signer = pk;
		try {
			$currentUser = await $ndk.signer?.user();

			if ($currentUser) {
				localStorage.setItem(LocalStorageKeys.NostrKeyMethod, 'pk');
				localStorage.setItem(LocalStorageKeys.NostrKey, pk.privateKey!);
				localStorage.setItem(LocalStorageKeys.NostrTargetNpub, $currentUser.npub);
				localStorage.setItem(LocalStorageKeys.CurrentUserNpub, $currentUser.npub);
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
