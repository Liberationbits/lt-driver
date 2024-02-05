<script lang="ts">
	import { page } from '$app/stores';
	import { profileData, currentUser } from '$stores/current-user';
	import AppMenu from './AppMenu.svelte';
	import CurrentUser from './CurrentUser.svelte';
	import { SquaresFour, Target } from 'phosphor-svelte';

	$: route = $page.url.pathname;
	$: pageTitle = route != '/lt-live' ? 'Liefertour' : 'Liefertour Live';
	$: profileName = $profileData?.name;
	$: npub = $currentUser?.npub;
	$: displayName = profileName ? ` - ${profileName}` : npub ? ` - ${npub}` : '';
</script>

<div class="navbar mb-2 bg-base-100">
	<div class="navbar-start mr-1">
		<AppMenu />
	</div>

	<div class="navbar-center flex-auto">
		<h1 class="font-bol ml-1 mr-1 truncate text-base normal-case md:text-xl">
			{pageTitle}{displayName}
		</h1>

		{#if route != '/lt-live' && $currentUser}
			<div>
				<a href="/" class="btn btn-ghost px-0 hover:bg-transparent">
					<Target class="h-6 w-6" />
				</a>
			</div>

			<div>
				<a href="/load" class="btn btn-ghost px-0 hover:bg-transparent">
					<SquaresFour class="h-6 w-6" />
				</a>
			</div>
		{/if}
	</div>
	{#if route != '/lt-live'}
		<div class="navbar-end ml-1 flex flex-row items-center gap-4">
			<CurrentUser />
		</div>
	{/if}
	<div></div>
</div>
