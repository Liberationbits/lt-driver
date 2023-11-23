<script lang="ts">
	export let handleClick = () => {};
</script>

<button
	on:click={handleClick}
	class="btn btn-rounded-full h-11 rounded-full bg-base-300 text-xs font-medium normal-case hover:border hover:border-zinc-400 hover:bg-opacity-30 {$$props.class}"
>
	<slot name="btn-content">Subtle Button</slot>
</button>
