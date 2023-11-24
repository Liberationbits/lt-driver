<script lang="ts">
	import { profileName } from '$stores/current-user';
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
		<h1 class="font-bol ml-1 mr-1 text-base normal-case md:text-xl">
			Liefertour{$profileName}
		</h1>
	</div>

	<div class="navbar-end ml-1 flex flex-row items-center gap-4">
		<CurrentUser />
	</div>
</div>
