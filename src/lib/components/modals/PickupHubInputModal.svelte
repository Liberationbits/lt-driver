<script lang="ts">
	import ModalWrapper from '$components/ModalWrapper.svelte';
	import PickupHubInput from '$components/PickupHubInput.svelte';
	import { closeModal } from 'svelte-modals';
	
	export let currentHubIndx: number;
	export let isOpen: boolean = false;

</script>

{#if isOpen}
	<ModalWrapper title="Station-Eingaben" subtitle="Den Stand der Abholstation ändern">
		<PickupHubInput currentHubIndx={currentHubIndx} postHook={closeModal}/>
	</ModalWrapper>
{/if}
