<script lang="ts">
	import Logo from '$icons/Logo.svelte';
	import { currentUser } from '$stores/current-user';
	import CurrentUser from './CurrentUser.svelte';
	import { GitPullRequest, MagicWand, PersonSimpleRun, Rss, Sparkle } from 'phosphor-svelte';
</script>

<div class="navbar mb-2 bg-base-100">
	<div class="navbar-start">
		<a href="/" class="btn btn-ghost text-xl normal-case px-0 hover:bg-transparent">
			<Logo class="h-12 w-12" />
			<h1 class="text-base md:text-xl font-bold">Liefertour - {$currentUser?.profile?.displayName}</h1>
		</a>
	</div>

	<div class="navbar-end flex flex-row items-center gap-4">
		<CurrentUser />
	</div>
</div>
