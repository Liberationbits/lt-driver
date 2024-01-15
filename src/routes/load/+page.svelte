<script lang="ts">
	import { pickupHubs } from '$stores/pickup-hubs';
	import { currentUser } from '$stores/current-user';
</script>

<svelte:head>
	<title>Liefertour Live - App für die Liefertour Verfolgung</title>
</svelte:head>

{#if $currentUser}
	<div class="mt-10 grid grid-cols-6 gap-4 px-2">
		{#each $pickupHubs as hub}
			<div class="">{hub.code}</div>
		{/each}
		<table class="table-xs w-full text-xs"></table>
	</div>
{:else}
	<p class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
		Bitte einloggen!
	</p>
{/if}
