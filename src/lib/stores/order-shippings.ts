import OrderShipping, { ShippingState } from '$lib/model/order-shipping';
import {
	get as getStore,
	writable,
	derived,
	type Unsubscriber,
	type Writable,
	type Readable
} from 'svelte/store';
import ndk from '$stores/ndk';
import { currentUser } from '$stores/current-user';
import type { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';

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

let seenEventIds: string[] = [];
let shippingEventsStore: NDKEventStore<NDKEvent> | undefined;
let unsubscribeToEventsStore: Unsubscriber | undefined;

currentUser.subscribe(($currentUser) => {
	if ($currentUser) {
		const drivers = [$currentUser.pubkey]; // todo: include other drivers
		shippingEventsStore = $ndk.storeSubscribe(
			{
				kinds: [OrderShippingKind.Packed, OrderShippingKind.Delivered],
				authors: drivers,
				since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 7,
				limit: 100
			} as NDKFilter<number>,
			{ closeOnEose: false, subId: 'order-shipping-events' }
		);

		unsubscribeToEventsStore = shippingEventsStore.subscribe((events) => {
			const nonseenEvents = events.filter((e) => !seenEventIds.includes(e.id));
			orderShippingAndEventsStore.update((oss) => shippingsESHandler(nonseenEvents, oss));
			seenEventIds = nonseenEvents.map((e) => e.id).concat(seenEventIds);
		});
	} else {
		shippingEventsStore?.unsubscribe();
		if (unsubscribeToEventsStore) unsubscribeToEventsStore();
	}
});

type ShippingsESHandler = (es: NDKEvent[], oss: OrderShippingAndEvent[]) => OrderShippingAndEvent[];

const shippingsESHandler: ShippingsESHandler = (es, oss) => {
	function isValidShippingUpdate(e: NDKEvent, os: OrderShipping): boolean {
		const eventShippingState =
			e.kind == OrderShippingKind.Packed ? ShippingState.Liefern : ShippingState.Abgeschlossen;
		if (os.customerId != e.tagValue('p')!) return false;
		else if (os.shippingState() >= eventShippingState) return false;
		else return true;
	}
	function deserialize(json: string): OrderShipping {
		const jsonObj = JSON.parse(json);
		const nos = new OrderShipping(jsonObj.customerId, jsonObj.id);
		nos.packingBoxes = jsonObj.packingBoxes;
		nos.returnedBoxes = jsonObj.returnedBoxes;
		nos.comment = jsonObj.comment;
		return nos;
	}

	for (const e of es.filter((e) => e.tagValue('d') && e.tagValue('p'))) {
		const existingOrderShipping = oss.find((os) => os.orderShipping.id == e.tagValue('d')!);
		if (existingOrderShipping) {
			if (isValidShippingUpdate(e, existingOrderShipping.orderShipping)) {
				existingOrderShipping.orderShipping.update(deserialize(e.content));
				existingOrderShipping.event = e;
			} else {
				const message =
					'Error: got invalid event update,\n Event: ' +
					e +
					'\n For OrderShipping: ' +
					existingOrderShipping;
				console.error(message);
				alert(message); // todo: use error component
			}
		} else oss.unshift({ orderShipping: deserialize(e.content), event: e });
	}
	return oss;
};
