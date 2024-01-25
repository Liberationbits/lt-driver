<script lang="ts">
	import CollapsableDropdown from '$lib/components/CollapsableDropdown.svelte';
	import SubtleButton from './buttons/SubtleButton.svelte';
	import { Truck, House } from 'phosphor-svelte';
	import { version } from '$app/environment';

	function donate(): void {}
</script>

<CollapsableDropdown sameCloseButton={true} side="left">
	<div slot="dropdown-button" class="btn-circle avatar">
		<Truck class="h-8 w-8" />
	</div>

	<ul class="menu rounded-box w-[245px] divide-y divide-neutral-800 p-0">
		<li><a href="/"><House class="h-4 w-4" />Liefertour-Fahrer</a></li>
		<li>Version: {version}</li>
		<li>Copyright</li>
		<li>Über diese App</li>
		<div class="p-[22px]">
			<SubtleButton handleClick={donate} class="w-full">
				<span slot="btn-content">Spenden</span>
			</SubtleButton>
		</div>
	</ul>
</CollapsableDropdown>
