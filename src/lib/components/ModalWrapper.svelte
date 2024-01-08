<script lang="ts">
	import CloseIcon from '$lib/icons/Close.svelte';
	import { closeModal } from 'svelte-modals';
	import { fade } from 'svelte/transition';

	export let title: string | undefined;
	export let subtitle: string | undefined = undefined;
	export let bodyClass: string | undefined = undefined;
</script>

<div
	class="
    fixed
    bottom-0 top-0 z-20
    flex h-screen w-screen
    items-center
    justify-center
"
	transition:fade
	on:click={closeModal}
	role="none"
>
	<div
		class="
        card
        relative
        flex
        max-w-4xl
        flex-col overflow-y-auto
        rounded-3xl
        shadow-xl
        {$$props.class}
    "
		style="pointer-events: auto; max-height: 80vh;"
		on:click|stopPropagation={() => {}}
		role="none"
	>
		<div class="flex flex-col divide-y divide-neutral-800">
			<div class="relative flex w-full items-center justify-center">
				<div class="absolute left-[22px] top-[22px]">
					<button on:click={closeModal} class="btn-close-inner h-7 w-7 rounded-full p-1.5">
						<CloseIcon />
					</button>
				</div>
				{#if title}
					<div class="flex flex-col items-center py-6">
						<div class="text-base-100-content card-title text-sm font-medium">
							{title}
						</div>

						{#if subtitle}
							<div class="text-sm text-accent2">
								{subtitle}
							</div>
						{/if}
					</div>
				{/if}
			</div>
			<div class="card-body {bodyClass}">
				<slot />
			</div>
		</div>
	</div>
</div>
