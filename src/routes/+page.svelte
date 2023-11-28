<script>
	import { pickupHubs } from '$lib/model/pickup-hub';
	import { currentUser } from '$stores/current-user';
	import { CaretDoubleLeft, CaretDoubleRight, CheckCircle } from 'phosphor-svelte';
	import SystemState from '$lib/model/system-state';

	let systemState = SystemState.Packen;
	let currentHub = 0;
	$: hubCode = pickupHubs[currentHub].code;
	$: members = pickupHubs[currentHub].membersCount;
	$: portions = pickupHubs[currentHub].portions;

	function prevHub() {
		if (currentHub > 0) currentHub = (currentHub - 1) % pickupHubs.length;
		else currentHub = pickupHubs.length - currentHub - 1;
	}

	function nextHub() {
		currentHub = (currentHub + 1) % pickupHubs.length;
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
			<div class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
				{SystemState[systemState]}
			</div>
			<div class="text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl">
				KW 45 Datum: 10.11.2023 Zeit: 18:19
			</div>
			{#if $currentUser}
				<div
					class="flex flex-row gap-3 self-center text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl"
				>
					<button on:click={prevHub}><CaretDoubleLeft size={28} color="#18cda9" /></button>
					{hubCode} ({members} | {portions})
					<button on:click={nextHub}><CaretDoubleRight size={28} color="#18cda9" /></button>
				</div>
				{#if systemState == SystemState.Packen}
					<div class="mx-2 flex items-center justify-between gap-2">
						<label for="boxes">Kistenanzahl:</label>
						<input id="boxes" type="number" min="0" max="99" class="xs:input-xs h-8 w-8" />
						<label for="a-juice">Apfelsaft:</label>
						<input id="a-juice" type="number" min="0" max="99" class="xs:input-xs h-8 w-8" />
					</div>
					<div class="mx-2 flex items-center justify-between gap-2">
						<label for="eggs">Eier:</label>
						<input id="eggs" type="number" min="0" max="99" class="xs:input-xs h-8 w-8" />
						<label for="potatoes">Kartoffeln (Kg):</label>
						<input id="potatoes" type="number" min="0" max="99" class="xs:input-xs h-8 w-8" />
					</div>
					<div class="m-2 flex items-center gap-3">
						<textarea
							rows="3"
							placeholder="Kommentar..."
							class="textarea textarea-bordered w-full"
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
