<script lang="ts">
	import type { ShippingState } from '$lib/model/order-shipping';
	import { orderShippingAndEventsStore } from '$stores/order-shippings';
	import { pickupHubs } from '$stores/pickup-hubs';

	type HubShipping = {
		hubCode: string;
		members: number;
		portions: number;
		state: ShippingState;
		time: number;
		comment: string;
	};

	$: knownOrderShippingAndEvents = $orderShippingAndEventsStore.filter((ose) =>
		$pickupHubs.find((hub) => hub.id == ose.orderShipping.customerId)
	);

	$: hubShippings = knownOrderShippingAndEvents.map<HubShipping>((ose) => {
		const hub = $pickupHubs.find((h) => h.id == ose.orderShipping.customerId);
		return {
			hubCode: hub?.code!,
			members: hub?.membersCount!,
			portions: hub?.portions!,
			state: ose.orderShipping.shippingState(),
			time: ose.event.created_at ? ose.event.created_at : 0,
			comment: ose.orderShipping.comment
		};
	});
</script>

<svelte:head>
	<title>Liefertour Live - App für die Liefertour Verfolgung</title>
</svelte:head>

<div class="overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th>St.</th>
				<th>M|P</th>
				<th>Status</th>
				<th>Zeit</th>
				<th>Kommentar</th>
			</tr>
		</thead>
		<tbody>
			{#each hubShippings as hs}
				<tr>
					<td>{hs.hubCode}</td>
					<td>{hs.members}|{hs.portions}</td>
					<td>{hs.state}</td>
					<td>{hs.time}</td>
					<td>{hs.comment}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
