import { ShippingState } from '$lib/model/order-shipping';

export function colorFor(state: ShippingState): string {
	switch (state) {
		case ShippingState.Laden:
			return 'error';
		case ShippingState.Liefern:
			return 'warning';
		default:
			return 'success';
	}
}
