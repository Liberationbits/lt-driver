<script lang="ts">
	import { currentUser } from '$stores/current-user';
	import CurrentUser from './CurrentUser.svelte';
	import { Truck } from 'phosphor-svelte';
</script>

<div class="navbar mb-2 bg-base-100">
	<div class="navbar-start">
		<a href="/" class="btn btn-ghost px-0 hover:bg-transparent">
			<Truck class="h-8 w-8" />
		</a>
	</div>

	<div class="navbar-center">
		<h1 class="text-base md:text-xl font-bol normal-case">Liefertour - {$currentUser?.profile?.displayName}</h1>
	</div>

	<div class="navbar-end flex flex-row items-center gap-4">
		<CurrentUser />
	</div>
</div>
