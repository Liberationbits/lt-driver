<script lang="ts">
	import CollapsableDropdown from '$lib/components/CollapsableDropdown.svelte';
	import Avatar from './Avatar.svelte';
	import { currentUser, profileData } from '$stores/current-user';
	import ndk from '$lib/stores/ndk';
	import GearIcon from '$lib/icons/Gear.svelte';
	import Notification from './Notification.svelte';
	import { Name } from '@nostr-dev-kit/ndk-svelte-components';
	import SubtleButton from './buttons/SubtleButton.svelte';
	import { get as getStore } from 'svelte/store';
	import { openModal } from 'svelte-modals';
	import UserProfileEditorModal from './modals/UserProfileEditorModal.svelte';

	export function logout(): void {
		const $ndk = getStore(ndk);
		$ndk.signer = undefined;
		currentUser.set(undefined);
		localStorage.removeItem('currentUserFollowPubkeysStore');
		localStorage.removeItem('currentUserStore');
		localStorage.removeItem('user-follows');
		localStorage.removeItem('network-follows');
		localStorage.removeItem('network-follows-updated-t');
		localStorage.removeItem('currentUserNpub');
		localStorage.removeItem('nostr-target-npub');

		// explicitly prevent auto-login with NIP-07
		localStorage.setItem('nostr-key-method', 'none');
	}
</script>

<CollapsableDropdown>
	<div slot="dropdown-button" class="btn-circle avatar hover:border hover:border-accent2">
		<Avatar ndk={$ndk} user={$currentUser} />
	</div>

	<ul class="menu rounded-box w-[245px] divide-y divide-neutral-800 p-0">
		<div>
			<div class="menu-title flex items-center justify-between gap-2 px-[22px] py-[19px]">
				<div class="flex w-0 flex-grow flex-row items-center gap-4">
					<Avatar
						ndk={$ndk}
						user={$currentUser}
						class="
                                h-8 w-8 rounded-full border-2 border-base-300
                            "
					/>
					<div
						class="text-base-100-content truncate text-center text-base font-medium"
						style="width: 70%"
					>
						<Name
							ndk={$ndk}
							user={$currentUser}
							class="
                                "
						/>
					</div>
				</div>
				<button
					on:click={() =>
						openModal(
							UserProfileEditorModal,
							{ userName: $profileData.name, imageURL: $profileData.imageUrl },
							{ replace: true }
						)}
				>
					<GearIcon />
				</button>
			</div>
		</div>
		<div class="hidden px-5 py-4">
			<span class="text-[10px] font-semibold tracking-widest"> NOTIFICATIONS </span>
			<div class="flex flex-row justify-between py-3">
				<!-- TODO UPDATE FUNCTIONAL NOTIFICATIONS COMPONENT -->
				<Notification title={'Zaps'} notifications={6} />
				<Notification title={'Likes'} />
				<Notification title={'Comments'} />
				<Notification title={'Unknown'} />
			</div>
		</div>
		<div class="p-[22px]">
			<SubtleButton handleClick={logout} class="w-full">
				<span slot="btn-content">Ausloggen</span>
			</SubtleButton>
		</div>
	</ul>
</CollapsableDropdown>
