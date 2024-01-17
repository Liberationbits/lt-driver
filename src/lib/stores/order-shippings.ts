import OrderShipping, { ShippingState } from '$lib/model/order-shipping';
import { get as getStore, writable, derived, type Writable, type Readable } from 'svelte/store';
import ndk from '$stores/ndk';
import type { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';

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
const drivers = ['71df211931d26ee41121d295bd43cbc7e382505e333b5c13d4016ced9542d9d7']; // todo: include other drivers

const shippingEventsStore = $ndk.storeSubscribe(
	{
		kinds: [OrderShippingKind.Packed, OrderShippingKind.Delivered],
		authors: drivers,
		since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 3,
		limit: 100
	} as NDKFilter<number>,
	{ closeOnEose: false, subId: 'order-shipping-events' }
);

type ShippingsESHandler = (es: NDKEvent[], oss: OrderShippingAndEvent[]) => OrderShippingAndEvent[];

const shippingsESHandler: ShippingsESHandler = (es, oss) => {
	function eventState(e: NDKEvent): ShippingState {
		return e.kind == OrderShippingKind.Packed ? ShippingState.Liefern : ShippingState.Geliefert;
	}

	for (const e of es.filter((e) => e.tagValue('d') && e.tagValue('p'))) {
		const existingOrderShipping = oss.find((os) => os.orderShipping.id == e.tagValue('d')!);
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
			} else if (eventState(e) > eos.state) {
				eos.update(OrderShipping.fromEvent(e));
				existingOrderShipping.event = e;
			}
		} else oss.unshift({ orderShipping: OrderShipping.fromEvent(e), event: e });
	}
	return oss;
};

let seenEventIds: string[] = [];

shippingEventsStore.subscribe((events) => {
	const nonseenEvents = events.filter((e) => !seenEventIds.includes(e.id));
	orderShippingAndEventsStore.update((oss) => shippingsESHandler(nonseenEvents, oss));
	seenEventIds = nonseenEvents.map((e) => e.id).concat(seenEventIds);
});
