<script lang="ts">
	import { pickupHubs } from '$lib/stores/pickup-hubs';
	import { currentUser } from '$stores/current-user';
	import { CaretDoubleLeft, CaretDoubleRight } from 'phosphor-svelte';
	import PickupHubInput from '$components/PickupHubInput.svelte';

	// view model
	$: currentHubIndx = 0;
	$: currentHub = $pickupHubs[currentHubIndx];

	function prevHub() {
		if (currentHubIndx > 0) currentHubIndx = (currentHubIndx - 1) % $pickupHubs.length;
		else currentHubIndx = $pickupHubs.length - currentHubIndx - 1;
	}

	function nextHub() {
		currentHubIndx = (currentHubIndx + 1) % $pickupHubs.length;
	}
</script>

<svelte:head>
	<title>LT Fahrer - App für den Liefertour-Fahrer</title>
</svelte:head>

{#if $currentUser}
	<div
		class="flex flex-row gap-3 self-center text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl"
	>
		<button on:click={prevHub}><CaretDoubleLeft size={28} color="#18cda9" /></button>
		{currentHub.code} ({currentHub.membersCount} | {currentHub.portions})
		<button on:click={nextHub}><CaretDoubleRight size={28} color="#18cda9" /></button>
	</div>

	<PickupHubInput currentHubId={currentHub.id} postHook={nextHub} />
{:else}
	<p class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
		Bitte einloggen!
	</p>
{/if}
