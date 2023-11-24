<script lang="ts">
	import ndk from '$lib/stores/ndk';
	import LoginNip07Button from './LoginNip07Button.svelte';
	import LoginGuestButton from './LoginGuestButton.svelte';
	// import LoginNip46Button from './LoginNip46Button.svelte';
	import CollapsableDropdown from '$lib/components/CollapsableDropdown.svelte';
</script>

{#if !$ndk.signer}
	<CollapsableDropdown>
		<!-- dropdown-button can not be <button> element. Issue with daisyUI dropdown -->
		<div
			slot="dropdown-button"
			class="text-base-100-content btn btn-rounded-full btn-outline btn-sm rounded-full border-accent2 bg-transparent text-sm
            normal-case hover:text-base-100-content hover:border-accent2 hover:bg-accent2 hover:bg-opacity-20 md:text-base"
		>
			<span class="px-0 md:px-4 lg:px-9"> Einloggen </span>
		</div>

		<ul class="menu rounded-box w-60 divide-y divide-neutral-800 p-0">
			<div>
				<div class="menu-title flex justify-center">
					<div class="text-base-100-content p-1 text-center text-base font-medium">Einloggen</div>
				</div>
			</div>
			<div class="p-4">
				<div class="flex flex-col items-start px-4">
					<div class="text-base text-xs">
						Diese App ist auf dem <span class="text-accent2">Nostr-Protokoll</span> gebaut. Das heißt,
						du kannst dich mit eigenen kryptografischen Schlüsseln statt mit einem zentralisierten Provider
						anmelden.
					</div>
				</div>
			</div>
			<div class="p-4">
				<div class="flex justify-center">
					<div class="flex w-full flex-col gap-2">
						<div class="text-center text-xs font-normal">Noch keine Schlüssel?</div>
						<LoginGuestButton />
					</div>
				</div>
			</div>
			<div class="p-4">
				<div class="flex justify-center">
					<div class="flex w-full flex-col gap-2">
						<div class="text-center text-xs font-normal">Schon auf Nostr?</div>
						<LoginNip07Button />
					</div>
				</div>
			</div>
		</ul>
	</CollapsableDropdown>
{/if}
