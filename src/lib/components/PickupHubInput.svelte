<script lang="ts">
	import OrderShipping, { ShippingState } from '$lib/model/order-shipping';
	import { orderShippingsStore } from '$stores/order-shippings';
	import { storeOrderShipping } from '$utils/order-shipping';
	import { textColorFor } from '$utils/ui-helpers';

	export let currentHubId: string;
	export let postHook: () => void = () => {};
	// view model
	let currentShipping = findCurrentShipping(currentHubId, $orderShippingsStore);
	let shippingState = currentShipping.state;
	let packingBoxes = currentShipping.packingBoxes;
	let returnedBoxes = currentShipping.returnedBoxes;
	let comment = currentShipping.comment;

	$: updateViewModel(currentHubId, $orderShippingsStore);

	function updateViewModel(hubId: string, oss: OrderShipping[]) {
		currentShipping = findCurrentShipping(hubId, oss);
		shippingState = currentShipping.state;
		packingBoxes = currentShipping.packingBoxes;
		returnedBoxes = currentShipping.returnedBoxes;
		comment = currentShipping.comment;
	}

	function findCurrentShipping(hubId: string, oss: OrderShipping[]) {
		const foundShipping = oss.find((os) => os.customerId == hubId);
		if (foundShipping) return foundShipping;
		else {
			const freshOrderShipping = new OrderShipping(hubId);
			return freshOrderShipping;
		}
	}

	function storeState(newState: ShippingState): () => void {
		return () => {
			const newShipping = new OrderShipping(currentShipping.customerId, currentShipping.id);
			newShipping.packingBoxes = packingBoxes;
			newShipping.returnedBoxes = returnedBoxes;
			newShipping.comment = comment;
			newShipping.state = newState;
			storeOrderShipping(newShipping, shippingState);
			postHook();
		};
	}
</script>

<div
	class="text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl {textColorFor(
		shippingState
	)}"
>
	{ShippingState[shippingState]}
</div>

<div class="mx-2 flex gap-2">
	<label for="boxes" class="text-center">Kisten:</label>
	{#if shippingState <= ShippingState.Liefern}
		<input
			id="boxes"
			type="number"
			min="1"
			max="99"
			bind:value={packingBoxes}
			class="xs:w-3 input-xs rounded"
		/>
	{:else}
		<div class="xs:w-3 w-16">{packingBoxes}</div>
	{/if}

	<label for="returned-boxes" class="text-center" hidden={shippingState < ShippingState.Liefern}
		>Kisten zurück:</label
	>
	{#if shippingState > ShippingState.Laden}
		<input
			id="returned-boxes"
			type="number"
			min="0"
			max="99"
			bind:value={returnedBoxes}
			class="xs:w-3 input-xs rounded"
		/>
	{/if}
</div>
<div class="m-2 flex items-center">
	<textarea
		rows="3"
		placeholder="Kommentar..."
		bind:value={comment}
		class="textarea-bordered textarea-xs w-full rounded"
	/>
	<div>
		{#if shippingState <= ShippingState.Liefern}
			<button
				class="btn btn-warning btn-xs m-2"
				on:click={storeState(ShippingState.Liefern)}
				disabled={packingBoxes <= 0 || (!!returnedBoxes && returnedBoxes > 0)}>Packen</button
			>
		{/if}
		{#if shippingState > ShippingState.Laden}
			<button
				class="btn btn-success btn-xs m-2"
				on:click={storeState(ShippingState.Geliefert)}
				disabled={packingBoxes <= 0 || !returnedBoxes || returnedBoxes < 0}>Liefern</button
			>
		{/if}
	</div>
</div>
