<script>
	import { pickupHubs } from '$lib/model/pickup-hub';
	import { currentUser } from '$stores/current-user';
	import { CaretDoubleLeft, CaretDoubleRight } from 'phosphor-svelte';

	let currentHub = 0;
	$: hubCode = pickupHubs[currentHub].code;
	$: members = pickupHubs[currentHub].membersCount;
	$: portions = pickupHubs[currentHub].portionsCount;

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
			<p class="text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl">
				KW 45 Datum: 10.11.2023 Zeit: 18:19
			</p>
			{#if $currentUser}
				<div
					class="flex flex-row gap-3 self-center text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl"
				>
					<button on:click={prevHub}><CaretDoubleLeft size={28} color="#18cda9" /></button>
					{hubCode} ({members} | {portions})
					<button on:click={nextHub}><CaretDoubleRight size={28} color="#18cda9" /></button>
				</div>
			{:else}
				<p class="text-center tracking-wider sm:text-2xl md:text-3xl lg:text-4xl">
					Bitte einloggen!
				</p>
			{/if}
		</div>
	</section>
</div>
