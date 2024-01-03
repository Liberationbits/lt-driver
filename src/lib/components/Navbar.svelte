<script lang="ts">
	import { page } from '$app/stores';
	import { profileData } from '$stores/current-user';
	import CurrentUser from './CurrentUser.svelte';
	import { Truck } from 'phosphor-svelte';

	$: route = $page.url.pathname;
	$: pageTitle = route == '/' ? 'Liefertour' : 'Liefertour Live';
</script>

<div class="navbar mb-2 bg-base-100">
	<div class="navbar-start mr-1">
		<a href="/" class="btn btn-ghost px-0 hover:bg-transparent">
			<Truck class="h-8 w-8" />
		</a>
	</div>

	<div class="navbar-center">
		<h1 class="font-bol ml-1 mr-1 text-base normal-case md:text-xl">
			{pageTitle}{$profileData.name ? ' - ' + $profileData.name : ''}
		</h1>
	</div>

	<div class="navbar-end ml-1 flex flex-row items-center gap-4">
		{#if route == '/'}
			<CurrentUser />
		{/if}
	</div>
</div>
