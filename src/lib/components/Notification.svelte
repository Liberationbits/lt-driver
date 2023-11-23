<script lang="ts">
	export let title: string;
	export let notifications: number = 0;
</script>

<div class="flex flex-col items-center">
	<div class="btn-circle relative mb-2 h-11 w-11 bg-base-300">
		{#if notifications}
			<div
				class="leading-1 absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 text-[8px] text-white"
			>
				<span>
					{notifications}
				</span>
			</div>
		{/if}
	</div>
	<span class="text-[8px] font-normal leading-tight">
		{title}
	</span>
</div>
