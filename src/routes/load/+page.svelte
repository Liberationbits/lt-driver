<script lang="ts">
	import { pickupHubs } from '$stores/pickup-hubs';
	import PickupHubInputModal from '$components/modals/PickupHubInputModal.svelte';
	import { currentUser } from '$stores/current-user';
	import { openModal } from 'svelte-modals';
	import type PickupHub from '$lib/model/pickup-hub';

	function pickupHubInput(hub: PickupHub): () => void {
		return () => {
			openModal(PickupHubInputModal, { currentHub: hub });
		};
	}
</script>

<svelte:head>
	<title>LT Fahrer - App für den Liefertour-Fahrer</title>
</svelte:head>

{#if $currentUser}
	<div class="mt-10 grid grid-cols-6 gap-4 px-2">
		{#each $pickupHubs as hub}
			<button class="btn btn-primary" on:click={pickupHubInput(hub)}>{hub.code}</button>
		{/each}
	</div>
{:else}
	<p class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
		Bitte einloggen!
	</p>
{/if}
