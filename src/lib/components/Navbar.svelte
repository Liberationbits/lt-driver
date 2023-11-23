<script lang="ts">
	import { currentUser } from '$stores/current-user';
	import CurrentUser from './CurrentUser.svelte';
	import { Truck } from 'phosphor-svelte';
</script>

<div class="navbar mb-2 bg-base-100">
	<div class="navbar-start mr-1">
		<a href="/" class="btn btn-ghost px-0 hover:bg-transparent">
			<Truck class="h-8 w-8" />
		</a>
	</div>

	<div class="navbar-center">
		<h1 class="font-bol text-base normal-case md:text-xl ml-1 mr-1">
			Liefertour - {$currentUser?.profile?.displayName}
		</h1>
	</div>

	<div class="navbar-end flex flex-row items-center gap-4 ml-1">
		<CurrentUser />
	</div>
</div>
