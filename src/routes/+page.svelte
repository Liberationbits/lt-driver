<script lang="ts">
	import { pickupHubs } from '$lib/stores/pickup-hubs';
	import { currentUser } from '$stores/current-user';
	import { CaretDoubleLeft, CaretDoubleRight, CheckCircle } from 'phosphor-svelte';
	import OrderShipping, { ShippingState } from '$lib/model/order-shipping';
	import { orderShippingsStore } from '$stores/order-shippings';
	import type PickupHub from '$lib/model/pickup-hub';
	import { storeOrderShipping } from '$utils/order-shipping';

	// view model
	let currentHubIndx = 0;
	let currentHub = $pickupHubs[currentHubIndx];
	let currentShipping = findCurrentShipping(currentHub, $orderShippingsStore);
	let shippingState = currentShipping.state;
	let packingBoxes = currentShipping.packingBoxes;
	let returnedBoxes = currentShipping.returnedBoxes;
	let comment = currentShipping.comment;

	$: updateViewModel(currentHubIndx, $orderShippingsStore);

	function updateViewModel(hubIdx: number, oss: OrderShipping[]) {
		currentHub = $pickupHubs[hubIdx];
		currentShipping = findCurrentShipping(currentHub, oss);
		shippingState = currentShipping.state;
		packingBoxes = currentShipping.packingBoxes;
		returnedBoxes = currentShipping.returnedBoxes;
		comment = currentShipping.comment;
	}

	function findCurrentShipping(hub: PickupHub, oss: OrderShipping[]) {
		const foundShipping = oss.find((os) => os.customerId == hub.id);
		if (foundShipping) return foundShipping;
		else {
			const freshOrderShipping = new OrderShipping(hub.id);
			return freshOrderShipping;
		}
	}

	function prevHub() {
		if (currentHubIndx > 0) currentHubIndx = (currentHubIndx - 1) % $pickupHubs.length;
		else currentHubIndx = $pickupHubs.length - currentHubIndx - 1;
	}

	function nextHub() {
		currentHubIndx = (currentHubIndx + 1) % $pickupHubs.length;
	}

	async function storeState() {
		const newShipping = new OrderShipping(currentShipping.customerId, currentShipping.id);
		newShipping.packingBoxes = packingBoxes;
		newShipping.returnedBoxes = returnedBoxes;
		newShipping.comment = comment;
		await storeOrderShipping(newShipping, shippingState);
		nextHub();
	}
</script>

<svelte:head>
	<title>LT Fahrer - App für den Liefertour-Fahrer</title>
</svelte:head>

{#if $currentUser}
	<div class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
		{ShippingState[shippingState]}
	</div>
	<div
		class="flex flex-row gap-3 self-center text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl"
	>
		<button on:click={prevHub}><CaretDoubleLeft size={28} color="#18cda9" /></button>
		{currentHub.code} ({currentHub.membersCount} | {currentHub.portions})
		<button on:click={nextHub}><CaretDoubleRight size={28} color="#18cda9" /></button>
	</div>
	<div class="mx-2 flex gap-2">
		<label for="boxes" class="text-accent-content">Kisten:</label>
		{#if shippingState == ShippingState.Packen}
			<input
				id="boxes"
				type="number"
				min="0"
				max="99"
				bind:value={packingBoxes}
				class="xs:w-3 input-xs"
			/>
		{:else}
			<div>{packingBoxes}</div>
		{/if}

		<label
			for="returned-boxes"
			class="text-accent-content"
			hidden={shippingState < ShippingState.Liefern}>Kisten zurück:</label
		>
		{#if shippingState == ShippingState.Liefern}
			<input
				id="returned-boxes"
				type="number"
				min="0"
				max="99"
				bind:value={returnedBoxes}
				class="xs:w-3 input-xs"
			/>
		{:else if shippingState > ShippingState.Liefern}
			<div>{returnedBoxes}</div>
		{/if}
	</div>
	<div class="m-2 flex items-center gap-3">
		{#if shippingState != ShippingState.Geliefert}
			<textarea
				rows="3"
				placeholder="Kommentar..."
				bind:value={comment}
				class="textarea-bordered textarea-xs w-full"
			/>
			<button on:click={storeState}><CheckCircle size={32} color="#18cda9" /></button>
		{:else}
			<pre class="min-h-16 w-full text-sm text-accent-content">{comment}</pre>
		{/if}
	</div>
{:else}
	<p class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
		Bitte einloggen!
	</p>
{/if}
