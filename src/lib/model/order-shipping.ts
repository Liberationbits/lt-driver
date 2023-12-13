import { v4 as uuidv4 } from 'uuid';

export enum ShippingState {
	Packen, // packing
	Liefern, // delivering
	Abgeschlossen // finished
}

export class OrderShipping {
	id: string;
	customerId: string;
	packingBoxes: number = 0;
	returnedBoxes: number = 0;
	comment: string = '';

	constructor(customerId: string, id: string = uuidv4()) {
		this.id = id;
		this.customerId = customerId;
	}

	shippingState(): ShippingState {
		if (this.returnedBoxes > 0) return ShippingState.Abgeschlossen;
		else if (this.packingBoxes > 0) return ShippingState.Liefern;
		else return ShippingState.Packen;
	}

	update(other: OrderShipping) {
		if (!other || other.id != this.id || other.customerId != this.customerId)
			throw new Error('The other OrderShipping has a different identity: ' + other);
		this.packingBoxes = other.packingBoxes;
		this.returnedBoxes = other.returnedBoxes;
		this.comment = other.comment;
	}
}

export default OrderShipping;
