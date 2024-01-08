<script lang="ts">
	export let handleClick = () => {};
</script>

<button
	on:click={handleClick}
	class="attention-btn text-base-100-content btn btn-rounded-full h-11 w-full rounded-full border-2 border-accent2 bg-base-100 font-medium normal-case hover:border-accent2 hover:bg-accent2 hover:bg-opacity-20 {$$props.class}"
>
	<slot />
</button>

<style>
	.attention-btn {
		box-shadow: 0px 0px 21px 2px rgba(142, 113, 255, 0.33);
	}
</style>
