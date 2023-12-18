<script lang="ts">
	import { ShippingState } from '$lib/model/order-shipping';
	import { orderShippingAndEventsStore } from '$stores/order-shippings';
	import { pickupHubs } from '$stores/pickup-hubs';
	import dayjs from 'dayjs';

	type HubShipping = {
		hubCode: string;
		members: number;
		portions: number;
		state: ShippingState;
		stateColorClass: string;
		time: string;
		comment: string;
	};

	$: knownOrderShippingAndEvents = $orderShippingAndEventsStore.filter((ose) =>
		$pickupHubs.find((hub) => hub.id == ose.orderShipping.customerId)
	);

	$: hubShippings = knownOrderShippingAndEvents.map<HubShipping>((ose) => {
		const hub = $pickupHubs.find((h) => h.id == ose.orderShipping.customerId);
		const state = ose.orderShipping.shippingState();
		return {
			hubCode: hub?.code!,
			members: hub?.membersCount!,
			portions: hub?.portions!,
			state: state,
			stateColorClass: state == ShippingState.Liefern ? 'text-yellow-500' : 'text-green-500',
			time: ose.event.created_at
				? dayjs(ose.event.created_at * 1000).format('DD.MM.YY HH:mm:ss')
				: '---',
			comment: ose.orderShipping.comment
		};
	});
</script>

<svelte:head>
	<title>Liefertour Live - App für die Liefertour Verfolgung</title>
</svelte:head>

<div class="overflow-x-auto">
	<table class="table-xs text-xs">
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
					<td class={hs.stateColorClass}>{ShippingState[hs.state]}</td>
					<td>{hs.time}</td>
					<td><pre>{hs.comment}</pre></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
