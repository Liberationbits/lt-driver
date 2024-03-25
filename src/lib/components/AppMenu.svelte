<script lang="ts">
	import CollapsableDropdown from '$lib/components/CollapsableDropdown.svelte';
	import { Truck, House, GitBranch, Scales, Code } from 'phosphor-svelte';
	import { version } from '$app/environment';

	function donate(): void {}
</script>

<CollapsableDropdown sameCloseButton={true} side="left">
	<div slot="dropdown-button" class="btn-circle avatar">
		<Truck class="h-8 w-8" />
	</div>

	<ul class="menu w-[245px] divide-y divide-neutral-800 rounded-box p-0">
		<li><a href="/"><House class="h-4 w-4" />Liefertour-Fahrer</a></li>
		<li><div><GitBranch size={20} /><span>Version: {version}</span></div></li>
		<li>
			<a target="_blank" href="https://github.com/Liberationbits/lt-driver">
				<Code size={20} /> Apps Quellcode
			</a>
		</li>
		<!---li>
			<a target="_blank" href="https://github.com/Liberationbits/lt-driver">
				<HandHeart size={20} /> Unterstützen
			</a>
		</li>
		<li>
			<a target="_blank" class="link" href="/">
				<PaypalLogo size={20} />PayPal
			</a>
		</li>
		<li>
			<a target="_blank" class="link" href="weatheredwind420@getalby.com">
				<Lightning size={20} />Bitcoin Lightling ⚡
			</a>
		</li--->
		<li>
			<a target="_blank" href="/terms-conditions.html"> <Scales size={20} />Nutzungsbedingungen</a>
		</li>
	</ul>
</CollapsableDropdown>
