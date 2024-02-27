import type OrderShipping from '$lib/model/order-shipping';
import { ShippingState } from '$lib/model/order-shipping';
import { currentUser } from '$stores/current-user';
import ndk from '$stores/ndk';
import { OrderShippingKind } from '$stores/order-shippings';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { get as getStore } from 'svelte/store';

export async function storeOrderShipping(os: OrderShipping, currentState: ShippingState) {
	if (
		os.state == ShippingState.Laden ||
		currentState > os.state ||
		os.packingBoxes <= 0 ||
		(os.state == ShippingState.Liefern && os.returnedBoxes) ||
		(os.state == ShippingState.Geliefert && (!os.returnedBoxes || os.returnedBoxes < 0))
	) {
		const msg = `Attempt to perform invalid state change! ${currentState} => ${os.state}, packed-boxes = ${os.packingBoxes}, returned-boxes = ${os.returnedBoxes}`;
		console.log(msg);
		window.alert(msg);
		throw new Error(msg);
	}
	const kind =
		os.state == ShippingState.Liefern ? OrderShippingKind.Packed : OrderShippingKind.Delivered;
	const ndkEvent = new NDKEvent(getStore(ndk));
	ndkEvent.kind = kind;
	ndkEvent.pubkey = getStore(currentUser)!.pubkey;
	ndkEvent.tags.push(['d', os.id], ['p', os.customerId]);
	ndkEvent.content = JSON.stringify(os);
	await ndkEvent.sign();
	await ndkEvent.publish();
}
