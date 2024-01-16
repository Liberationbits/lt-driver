<script lang="ts">
	import ModalWrapper from '$components/ModalWrapper.svelte';
	import PickupHubInput from '$components/PickupHubInput.svelte';
	import { closeModal } from 'svelte-modals';

	export let currentHubId: string;
	export let isOpen: boolean = false;
</script>

{#if isOpen}
	<ModalWrapper title="Station-Eingaben" subtitle="Stand der Abholstation ändern">
		<PickupHubInput {currentHubId} postHook={closeModal} />
	</ModalWrapper>
{/if}
