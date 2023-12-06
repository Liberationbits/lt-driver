<script lang="ts">
	import { pickupHubs } from '$lib/stores/pickup-hubs';
	import { currentUser } from '$stores/current-user';
	import { CaretDoubleLeft, CaretDoubleRight, CheckCircle } from 'phosphor-svelte';
	import OrderShipping, { ShippingState } from '$lib/model/order-shipping';
	import { onDestroy, onMount } from 'svelte';
	import dayjs from 'dayjs';
	import weekOfYear from 'dayjs/plugin/weekOfYear';
	import { orderShippings } from '$stores/order-shippings';
	import { NDKEvent, type NostrEvent } from '@nostr-dev-kit/ndk';
	import ndk from '$stores/ndk';
	import type PickupHub from '$lib/model/pickup-hub';

	dayjs.extend(weekOfYear);
	let currentDate = dayjs();
	const intervalId = setInterval(() => {
		currentDate = dayjs();
	}, 1000);
	$: weekNumber = currentDate.week();

	onDestroy(() => clearInterval(intervalId));

	// view model
	let currentHubIndx = 0;
	let packingBoxes = 0;
	let returnedBoxes = 0;
	let comment = '';

	// view model reactive variables
	$: currentHub = $pickupHubs[currentHubIndx];
	$: currentShipping = findCurrentShipping(currentHub);
	$: shippingState = currentShipping.shippingState();

	onMount(() => {
		packingBoxes = currentShipping.packingBoxes;
		comment = currentShipping.comment;
		({ packingBoxes, returnedBoxes, comment } = createNewViewModel(currentHub));
	});

	function prevHub() {
		if (currentHubIndx > 0) currentHubIndx = (currentHubIndx - 1) % $pickupHubs.length;
		else currentHubIndx = $pickupHubs.length - currentHubIndx - 1;
		({ packingBoxes, returnedBoxes, comment } = createNewViewModel($pickupHubs[currentHubIndx]));
	}

	function nextHub() {
		currentHubIndx = (currentHubIndx + 1) % $pickupHubs.length;
		({ packingBoxes, returnedBoxes, comment } = createNewViewModel($pickupHubs[currentHubIndx]));
	}

	function createNewViewModel(hub: PickupHub) {
		const shipping = findCurrentShipping(hub);
		return {
			packingBoxes: shipping.packingBoxes,
			returnedBoxes: shipping.returnedBoxes,
			comment: shipping.comment
		};
	}

	async function sendNostrEvent() {
		switch (currentShipping.shippingState()) {
			case ShippingState.Packen:
				sendPackedEvent();
				return;
			case ShippingState.Liefern:
				sendDeliveredEvent();
				return;
			default:
				console.log('Error: unexpected ShippingState');
		}
	}

	async function sendPackedEvent() {
		currentShipping.packingBoxes = packingBoxes;
		currentShipping.comment = comment;
		await sendNDKEvent(currentShipping, 32020);
		nextHub();
	}

	async function sendDeliveredEvent() {
		currentShipping.returnedBoxes = returnedBoxes;
		currentShipping.comment = comment;
		await sendNDKEvent(currentShipping, 32021);
		nextHub();
	}

	async function sendNDKEvent(os: OrderShipping, kind: number) {
		const ndkEvent = new NDKEvent($ndk);
		ndkEvent.kind = kind;
		ndkEvent.pubkey = $currentUser!.pubkey;
		ndkEvent.tags.push(['d', os.id], ['p', os.customerId]);
		ndkEvent.content = JSON.stringify(os);
		await ndkEvent.sign();
		await ndkEvent.publish();
	}

	function findCurrentShipping(hub: PickupHub) {
		const foundShipping = $orderShippings.find((os) => os.customerId == hub.id);
		if (foundShipping) return foundShipping;
		else {
			const freshOrderShipping = new OrderShipping(hub.id);
			$orderShippings.push(freshOrderShipping);
			return freshOrderShipping;
		}
	}
</script>

<svelte:head>
	<title>LT Fahrer - App für den Liefertour-Fahrer</title>
</svelte:head>

<div class="flex flex-col gap-12">
	<section
		class="mx-2 flex flex-col items-center justify-center gap-8 md:h-[50vh] md:flex-row lg:mx-auto"
	>
		<div class="flex w-full flex-col gap-3">
			{#if $currentUser}
				<div class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
					{ShippingState[shippingState]}
				</div>
				<div class="text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl">
					KW {weekNumber} - {currentDate.format('DD.MM.YYYY HH:mm:ss')}
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
					{#if shippingState != ShippingState.Abgeschlossen}
						<textarea
							rows="3"
							placeholder="Kommentar..."
							bind:value={comment}
							class="textarea-bordered textarea-xs w-full"
						/>
						<button on:click={sendNostrEvent}><CheckCircle size={32} color="#18cda9" /></button>
					{:else}
						<pre class="min-h-16 w-full text-sm text-accent-content">{comment}</pre>
					{/if}
				</div>
			{:else}
				<p class="text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl">
					Bitte einloggen!
				</p>
			{/if}
		</div>
	</section>
</div>
