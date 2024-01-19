<script lang="ts">
	import { pickupHubs } from '$stores/pickup-hubs';
	import PickupHubInputModal from '$components/modals/PickupHubInputModal.svelte';
	import { currentUser } from '$stores/current-user';
	import { openModal } from 'svelte-modals';
	import type PickupHub from '$lib/model/pickup-hub';
	import { colorFor } from '$utils/ui-helpers';
	import OrderShipping, { ShippingState } from '$lib/model/order-shipping';
	import { orderShippingsStore } from '$stores/order-shippings';

	type PickupHubAndState = [PickupHub, ShippingState];

	$: hubAndStates = $pickupHubs.map<PickupHubAndState>((h) => [
		h,
		stateOf(h, $orderShippingsStore)
	]);

	function stateOf(hub: PickupHub, oss: OrderShipping[]): ShippingState {
		const orderShipping = oss.find((os) => os.customerId == hub.id);
		return orderShipping ? orderShipping.state : ShippingState.Laden;
	}

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
		{#each hubAndStates as hs}
			<button class="btn btn-{colorFor(hs[1])}" on:click={pickupHubInput(hs[0])}
				>{hs[0].code}</button
			>
		{/each}
	</div>
{:else}
	<p class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
		Bitte einloggen!
	</p>
{/if}
