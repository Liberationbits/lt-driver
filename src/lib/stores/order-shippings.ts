import OrderShipping, { ShippingState } from '$lib/model/order-shipping';
import { get as getStore, writable, derived, type Writable, type Readable } from 'svelte/store';
import ndk from '$stores/ndk';
import type { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import { NDKSvelteWrapper } from '$lib/NDKSvelteWrapper';

export enum OrderShippingKind {
	Packed = 32020,
	Delivered = 32021
}

export type OrderShippingAndEvent = {
	orderShipping: OrderShipping;
	event: NDKEvent;
};

export const orderShippingAndEventsStore: Writable<OrderShippingAndEvent[]> = writable([]);

export const orderShippingsStore: Readable<OrderShipping[]> = derived(
	orderShippingAndEventsStore,
	(oss) => oss.map((oscr) => oscr.orderShipping)
);

const $ndk = getStore(ndk);
const drivers = [
	'4cca069f12b2405c758c9382c41c2d08d8e3add2085c5f90f86e16cd74b9b358', // Simon
	'71df211931d26ee41121d295bd43cbc7e382505e333b5c13d4016ced9542d9d7' // Antonio
];

export const NDKWrapper = new NDKSvelteWrapper($ndk);
const shippingEventsStore = NDKWrapper.storeSubscribe(
	{
		kinds: [OrderShippingKind.Packed, OrderShippingKind.Delivered],
		authors: drivers,
		since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 3,
		limit: 100
	} as NDKFilter<number>,
	{ closeOnEose: false, subId: 'order-shipping-events' }
);

type ShippingsESHandler = (es: NDKEvent[], oss: OrderShippingAndEvent[]) => OrderShippingAndEvent[];

const shippingsESHandler: ShippingsESHandler = (es, oses) => {
	function eventState(e: NDKEvent): ShippingState {
		return e.kind == OrderShippingKind.Packed ? ShippingState.Liefern : ShippingState.Geliefert;
	}

	const relevantEvent = es
		.filter((e) => e.tagValue('d') && e.tagValue('p'))
		.sort((e1, e2) => e2.created_at! - e1.created_at!);
	for (const e of relevantEvent) {
		const existingOrderShipping = oses.find((ose) => ose.orderShipping.id == e.tagValue('d')!);
		if (existingOrderShipping) {
			const eos = existingOrderShipping.orderShipping;
			if (e.tagValue('p')! != eos.customerId) {
				const message =
					'Error: got invalid event update,\n Event: ' +
					JSON.stringify(e) +
					'\n For OrderShipping: ' +
					JSON.stringify(existingOrderShipping);
				console.error(message);
				alert(message); // todo: use error component
			} else if (eventState(e) >= eos.state) {
				eos.update(OrderShipping.fromEvent(e));
				existingOrderShipping.event = e;
			}
		} else oses.unshift({ orderShipping: OrderShipping.fromEvent(e), event: e });
	}
	return oses;
};

let seenEventIds: string[] = [];

shippingEventsStore.subscribe((events) => {
	const nonseenEvents = events.filter((e) => !seenEventIds.includes(e.id));
	orderShippingAndEventsStore.update((oss) => shippingsESHandler(nonseenEvents, oss));
	seenEventIds = nonseenEvents.map((e) => e.id).concat(seenEventIds);
});
