<script>
	import { pickupHubs } from '$stores/pickup-hubs';
</script>

<sctipt lang="ts"> </sctipt>

<svelte:head>
	<title>Liefertour Live - App für die Liefertour Verfolgung</title>
</svelte:head>

<div class="overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th>St.</th>
				<th>M</th>
				<th>P</th>
				<th>Zeit</th>
				<th>Kommentar</th>
			</tr>
		</thead>
		<tbody>
			{#each $pickupHubs as hub}
				<tr>
					<td>{hub.code}</td>
					<td>{hub.membersCount}</td>
					<td>{hub.portions}</td>
					<td></td>
					<td></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
