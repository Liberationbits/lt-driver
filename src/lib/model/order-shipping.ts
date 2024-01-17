import { OrderShippingKind } from '$stores/order-shippings';
import type { NDKEvent } from '@nostr-dev-kit/ndk';
import { v4 as uuidv4 } from 'uuid';

export enum ShippingState {
	Laden, // loading
	Liefern, // delivering
	Geliefert // delivered
}

export class OrderShipping {
	id: string;
	customerId: string;
	packingBoxes: number = 0;
	returnedBoxes: number = 0;
	comment: string = '';
	state: ShippingState = ShippingState.Laden;

	constructor(customerId: string, id: string = uuidv4()) {
		this.id = id;
		this.customerId = customerId;
	}

	static fromEvent(e: NDKEvent) {
		const os = new OrderShipping(e.tagValue('p')!, e.tagValue('d')!);
		const jsonObj = JSON.parse(e.content);
		os.packingBoxes = jsonObj.packingBoxes;
		os.returnedBoxes = jsonObj.returnedBoxes;
		os.comment = jsonObj.comment;
		os.state = e.kind == OrderShippingKind.Packed ? ShippingState.Liefern : ShippingState.Geliefert;
		return os;
	}

	update(other: OrderShipping) {
		if (!other || other.id != this.id || other.customerId != this.customerId)
			throw new Error('The other OrderShipping has a different identity: ' + other);
		this.packingBoxes = other.packingBoxes;
		this.returnedBoxes = other.returnedBoxes;
		this.comment = other.comment;
		this.state = other.state;
	}
}

export default OrderShipping;
