<script lang="ts">
	import ModalWrapper from '$components/ModalWrapper.svelte';
	import PickupHubInput from '$components/PickupHubInput.svelte';
	
	export let currentHubIndx: number;
	export let isOpen: boolean = false;

</script>

{#if isOpen}
	<ModalWrapper title="Station-Eingaben" subtitle="Den Stand der Abholstation ändern">
		<PickupHubInput currentHubIndx={currentHubIndx}/>
	</ModalWrapper>
{/if}
