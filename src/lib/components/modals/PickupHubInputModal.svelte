<script lang="ts">
	import ModalWrapper from '$components/ModalWrapper.svelte';
	import PickupHubInput from '$components/PickupHubInput.svelte';
	import { type PickupHub } from '$lib/model/pickup-hub';
	import { closeModal } from 'svelte-modals';

	export let currentHub: PickupHub;
	export let isOpen: boolean = false;
</script>

{#if isOpen}
	<ModalWrapper
		title="Abholstation {currentHub.code} ({currentHub.district})"
		subtitle="Stand ändern"
	>
		<PickupHubInput currentHubId={currentHub.id} postHook={closeModal} />
	</ModalWrapper>
{/if}
