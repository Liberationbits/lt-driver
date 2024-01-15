import type OrderShipping from '$lib/model/order-shipping';
import { ShippingState } from '$lib/model/order-shipping';
import { currentUser } from '$stores/current-user';
import ndk from '$stores/ndk';
import { OrderShippingKind } from '$stores/order-shippings';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { get as getStore } from 'svelte/store';

export async function storeOrderShipping(os: OrderShipping, currentState: ShippingState) {
	const kind =
		currentState == ShippingState.Laden ? OrderShippingKind.Packed : OrderShippingKind.Delivered;
	const ndkEvent = new NDKEvent(getStore(ndk));
	ndkEvent.kind = kind;
	ndkEvent.pubkey = getStore(currentUser)!.pubkey;
	ndkEvent.tags.push(['d', os.id], ['p', os.customerId]);
	ndkEvent.content = JSON.stringify(os);
	await ndkEvent.sign();
	await ndkEvent.publish();
}
