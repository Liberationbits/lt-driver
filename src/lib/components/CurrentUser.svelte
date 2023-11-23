<script lang="ts">
	import { currentUser } from '$stores/current-user';
	import LoginDropdown from '$components/LoginDropdown.svelte';
	import UserDropdown from '$components/UserDropdown.svelte';
</script>

{#if $currentUser}
	<UserDropdown />
{:else}
	<LoginDropdown />
{/if}

<style lang="postcss">
	.menu {
		@apply absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-base-300 py-1 text-base-content shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none;
	}

	li {
		@apply block px-4 py-2 text-sm  font-medium hover:bg-base-200 hover:text-gray-800;
	}

	li a:hover {
		@apply !bg-transparent;
	}
</style>
