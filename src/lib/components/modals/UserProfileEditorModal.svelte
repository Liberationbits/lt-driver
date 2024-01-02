<script lang="ts">
	import ModalWrapper from '$components/ModalWrapper.svelte';
	import { currentUser } from '$stores/current-user';
	import { closeModal } from 'svelte-modals';

    export let userName: string;
    export let imageURL: string | undefined = undefined;
    export let isOpen: boolean = false;

    async function updateProfile() {
        await $currentUser?.fetchProfile();
        if ($currentUser?.profile) {
            $currentUser.profile.name = userName;
            $currentUser.profile.image = imageURL;
            await $currentUser.publish();
            closeModal();
        }
    }
</script>

{#if isOpen}
<ModalWrapper title="Profil Bearbeiten" subtitle="Deine Profildaten beabeiten">
    <label for="user-name">Benutzername:</label>
    <input id="user-name" bind:value="{userName}" placeholder="Name">
    <label for="user-avatar">Profilbild-URL:</label>
    <input id="user-avatar" bind:value="{imageURL}" placeholder="URL">
    <button class="btn btn-primary mt-2" on:click={updateProfile}>Speichern</button>
</ModalWrapper>
{/if}
