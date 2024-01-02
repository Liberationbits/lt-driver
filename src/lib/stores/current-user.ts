import type { NDKUser } from '@nostr-dev-kit/ndk';
import { derived, writable } from 'svelte/store';

export const currentUser = writable<NDKUser | undefined>(undefined);

export type ProfileData = {
	name: string;
	imageUrl: string;
}

const defaultProfle: ProfileData = { name: '', imageUrl: ''}

export const profileData = derived(
	currentUser,
	($currentUser, set) => {
		if ($currentUser) {
			$currentUser
				.fetchProfile()
				.then(() => {
					const name = $currentUser?.profile?.name;
					const image = $currentUser?.profile?.image;
					set({
						name: name ? ' - ' + name : '',
						imageUrl: image ? image : ''
				});
				})
				.catch((error) => {
					console.error('Error fetching user profile: ' + error);
					set(defaultProfle);
					// todo: additionally show error to user
				});
		} else {
			set(defaultProfle);
		}
	},
	defaultProfle
);
