<script>
	import { pickupHubs } from '$lib/model/pickup-hub';
	import { currentUser } from '$stores/current-user';
	import { CaretDoubleLeft, CaretDoubleRight, CheckCircle } from 'phosphor-svelte';
	import { OrderState } from '$lib/model/order';
	import { onDestroy } from 'svelte';
	import dayjs from 'dayjs';
	import weekOfYear from 'dayjs/plugin/weekOfYear';
	import { orders } from '$stores/orders';

	dayjs.extend(weekOfYear);
	let currentDate = dayjs();
	const intervalId = setInterval(() => {
		currentDate = dayjs();
	}, 1000);
	const weekNumber = currentDate.week();

	onDestroy(() => clearInterval(intervalId));

	let currentHubIndx = 0;
	$: currentHub = pickupHubs[currentHubIndx];
	$: orderFound = orders.find((o) => o.customerId == currentHub.id);
	$: currentOrder = orderFound ? orderFound : orders[0];
	$: nextOrderState = currentOrder.state < 4 ? currentOrder.state + 1 : currentOrder.state;
	
	function prevHub() {
		if (currentHubIndx > 0) currentHubIndx = (currentHubIndx - 1) % pickupHubs.length;
		else currentHubIndx = pickupHubs.length - currentHubIndx - 1;
	}

	function nextHub() {
		currentHubIndx = (currentHubIndx + 1) % pickupHubs.length;
	}
</script>

<svelte:head>
	<title>LT Fahrer - App für den Liefertour-Fahrer</title>
</svelte:head>

<div class="flex flex-col gap-12">
	<section
		class="mx-2 flex flex-col items-center justify-center gap-8 md:h-[50vh] md:flex-row lg:mx-auto"
	>
		<div class="flex flex-col gap-3">
			{#if $currentUser}
				<div class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
					{OrderState[nextOrderState]}
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
				{#if nextOrderState == OrderState.Packen}
					<div class="mx-2 flex items-center justify-between gap-2">
						<label for="boxes">Kistenanzahl:</label>
						<input
							id="boxes"
							type="number"
							min="0"
							max="99"
							value={currentOrder.portions}
							class="input-xs xs:w-3"
						/>
						<label for="a-juice">Apfelsaft:</label>
						<input
							id="a-juice"
							type="number"
							min="0"
							max="99"
							value={currentOrder.ajuice}
							class="input-xs xs:w-3"
						/>
					</div>
					<div class="mx-2 flex items-center justify-between gap-2">
						<label for="eggs">Eier:</label>
						<input
							id="eggs"
							type="number"
							min="0"
							max="99"
							value={currentOrder.eggs}
							class="input-xs xs:w-3"
						/>
						<label for="potatoes">Kartoffeln (Kg):</label>
						<input
							id="potatoes"
							type="number"
							min="0"
							max="99"
							value={currentOrder.potatoes}
							class="input-xs xs:w-3"
						/>
					</div>
					<div class="m-2 flex items-center gap-3">
						<textarea
							rows="3"
							placeholder="Kommentar..."
							class="textarea-xs textarea-bordered w-full"
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
