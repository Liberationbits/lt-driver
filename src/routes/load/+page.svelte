<script lang="ts">
	import { pickupHubs } from '$stores/pickup-hubs';
	import { currentUser } from '$stores/current-user';
</script>

<svelte:head>
	<title>LT Fahrer - App für den Liefertour-Fahrer</title>
</svelte:head>

{#if $currentUser}
	<div class="grid grid-cols-6 gap-4 mt-10 px-2">
		{#each $pickupHubs as hub}
			<button class="btn btn-primary">{hub.code}</button>
		{/each}
	</div>
{:else}
	<p class="text-center tracking-wider text-orange-500 sm:text-2xl md:text-3xl lg:text-4xl">
		Bitte einloggen!
	</p>
{/if}
