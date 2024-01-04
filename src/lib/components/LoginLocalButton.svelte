<script lang="ts">
	import ndk from '$lib/stores/ndk';
	import { LocalStorageKeys, login } from '$lib/utils/login';
	import { currentUser } from '$stores/current-user';
	import SubtleButton from '$lib/components/buttons/SubtleButton.svelte';

	const localPK = localStorage.getItem(LocalStorageKeys.NostrKey);

	async function loginLocalPK() {
		const user = await login($ndk, undefined, 'pk');

		if (!user) {
			alert('Login failed');
		} else {
			$currentUser = user;
			localStorage.setItem(LocalStorageKeys.NostrKeyMethod, 'pk');
			localStorage.setItem(LocalStorageKeys.CurrentUserNpub, $currentUser.npub);
			localStorage.setItem(LocalStorageKeys.NostrTargetNpub, $currentUser.npub);
		}
	}
</script>

{#if localPK}
	<SubtleButton handleClick={loginLocalPK} class="w-full">
		<span slot="btn-content">Mit Schlüssel von dieser App</span>
	</SubtleButton>
{/if}
