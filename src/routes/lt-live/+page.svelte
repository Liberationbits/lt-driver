<script lang="ts">
	import { ShippingState } from '$lib/model/order-shipping';
	import { orderShippingAndEventsStore } from '$stores/order-shippings';
	import { pickupHubs } from '$stores/pickup-hubs';
	import { colorFor } from '$utils/ui-helpers';
	import dayjs from 'dayjs';

	type HubShipping = {
		hubCode: string | undefined;
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
		const state = ose.orderShipping.state;
		return {
			hubCode: hub?.code,
			members: hub ? hub.membersCount : 0,
			portions: hub ? hub.portions : 0,
			state: state,
			stateColorClass: 'text-' + colorFor(state),
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
	<table class="table-xs w-full text-xs">
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
