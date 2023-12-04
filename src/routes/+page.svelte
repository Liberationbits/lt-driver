<script>
	import { pickupHubs } from '$lib/stores/pickup-hubs';
	import { currentUser } from '$stores/current-user';
	import { CaretDoubleLeft, CaretDoubleRight, CheckCircle } from 'phosphor-svelte';
	import OrderShipping, { ShippingState } from '$lib/model/order-shipping';
	import { onDestroy } from 'svelte';
	import dayjs from 'dayjs';
	import weekOfYear from 'dayjs/plugin/weekOfYear';
	import { orderShippings } from '$stores/order-shippings';

	dayjs.extend(weekOfYear);
	let currentDate = dayjs();
	const intervalId = setInterval(() => {
		currentDate = dayjs();
	}, 1000);
	$: weekNumber = currentDate.week();

	onDestroy(() => clearInterval(intervalId));

	let currentHubIndx = 0;
	$: currentHub = $pickupHubs[currentHubIndx];
	$: currentShipping = findCurrentShipping(currentHub);
	$: shippingState = currentShipping.shippingState();

	function prevHub() {
		if (currentHubIndx > 0) currentHubIndx = (currentHubIndx - 1) % $pickupHubs.length;
		else currentHubIndx = $pickupHubs.length - currentHubIndx - 1;
	}

	function nextHub() {
		currentHubIndx = (currentHubIndx + 1) % $pickupHubs.length;
	}

	/**
	 * @param {{ id: string }} hub
	 */
	function findCurrentShipping(hub) {
		const shippingFound = $orderShippings.find((os) => os.customerId == hub.id);
		if (shippingFound) return shippingFound;
		else {
			const freshOrderShipping = new OrderShipping($pickupHubs[currentHubIndx].id);
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
				{#if shippingState == ShippingState.Packen}
					<div class="mx-2 flex items-center gap-2">
						<label for="boxes">Kistenanzahl:</label>
						<input
							id="boxes"
							type="number"
							min="0"
							max="99"
							value={currentShipping.packingBoxes}
							class="xs:w-3 input-xs"
						/>
					</div>
					<div class="m-2 flex items-center gap-3">
						<textarea
							rows="3"
							placeholder="Kommentar..."
							class="textarea-bordered textarea-xs w-full"
						/>
						<button><CheckCircle size={32} color="#18cda9" /></button>
					</div>
				{/if}
			{:else}
				<p class="text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl">
					Bitte einloggen!
				</p>
			{/if}
		</div>
	</section>
</div>
