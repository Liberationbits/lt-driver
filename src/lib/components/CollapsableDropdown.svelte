<script lang="ts">
	import CloseIcon from '$lib/icons/Close.svelte';

	export let borderColor: string = 'accent2';
	let hasFocus: boolean = false;

	async function toggleDropdown() {
		if (hasFocus) {
			// Close dropdown
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
				hasFocus = false;
			}
			return;
		}
		hasFocus = true;
	}
</script>

<div class="dropdown {hasFocus ? 'dropdown-open' : ''} dropdown-end">
	<button tabindex="0" on:click={toggleDropdown}>
		<div
			class="{hasFocus
				? 'hidden'
				: 'flex items-center transition duration-500 ease-out'} transition"
		>
			<slot name="dropdown-button" />
		</div>
		<div
			class={`${
				!hasFocus ? 'hidden' : ''
			} btn-close-outter btn-circle border border-${borderColor} grid place-items-center`}
		>
			<div class="btn-close-inner h-6 w-6 rounded-full p-1">
				<CloseIcon />
			</div>
		</div>
	</button>
	<div class="dropdown-content z-[1] mt-2">
		<slot />
	</div>
</div>
