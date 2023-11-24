import type { NDKUser } from '@nostr-dev-kit/ndk';
import { derived, writable } from 'svelte/store';

export const currentUser = writable<NDKUser | undefined>(undefined);

export const profileName = derived(currentUser, async ($currentUser, set) => {
	try {
		await $currentUser?.fetchProfile();
		const name = $currentUser?.profile?.name;
		set(name ? ' - ' + name : '');
	} catch (error) {
		console.error('Error fetching user profile: ' + error);
		set('');
		// todo: additionally show error to user
	}
});
