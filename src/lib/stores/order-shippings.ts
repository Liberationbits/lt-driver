import OrderShipping from '$lib/model/order-shipping';
import { get as getStore, writable, type Unsubscriber, type Writable } from 'svelte/store';
import ndk from '$stores/ndk';
import { currentUser } from '$stores/current-user';
import type { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';

export enum OrderShippingKind {
	Packed = 32020,
	Delivered = 32021
}

export const orderShippings: Writable<OrderShipping[]> = writable([]);

const $ndk = getStore(ndk);

let seenEventIds: string[] = [];
let shippingEventsStore: NDKEventStore<NDKEvent> | undefined;
let unsubscribeToEventsStore: Unsubscriber | undefined;

currentUser.subscribe(($currentUser) => {
	if ($currentUser) {
		shippingEventsStore = $ndk.storeSubscribe(
			{
				kinds: [OrderShippingKind.Packed, OrderShippingKind.Delivered],
				authors: [$currentUser.pubkey],
				since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 7,
				limit: 100
			} as NDKFilter<number>,
			{ closeOnEose: false, subId: 'order-shipping-events' }
		);

		unsubscribeToEventsStore = shippingEventsStore.subscribe((events: NDKEvent[]) => {
			const relevantEvents = events.filter(
				(e) => e.tagValue('d') && e.tagValue('p') && !seenEventIds.includes(e.id)
			);
			const shippings = relevantEvents.map((event) => {
				const shipping = new OrderShipping(event.tagValue('p')!);
				shipping.id = event.tagValue('d')!;
				const json = JSON.parse(event.content);
				shipping.packingBoxes = json.packingBoxes;
				shipping.returnedBoxes = json.returnedBoxes;
				shipping.comment = json.comment;
				return shipping;
			});
			// todo: filter out shippings of an inferior state
			orderShippings.update((oss) => shippings.concat(oss));
			seenEventIds = relevantEvents.map((e) => e.id).concat(seenEventIds);
		});
	} else {
		shippingEventsStore?.unsubscribe();
		if (unsubscribeToEventsStore) unsubscribeToEventsStore();
	}
});
