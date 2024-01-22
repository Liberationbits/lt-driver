import { ShippingState } from '$lib/model/order-shipping';

export function textColorFor(state: ShippingState): string {
	switch (state) {
		case ShippingState.Laden:
			return 'text-error';
		case ShippingState.Liefern:
			return 'text-warning';
		default:
			return 'text-success';
	}
}

export function btnColorFor(state: ShippingState): string {
	switch (state) {
		case ShippingState.Laden:
			return 'btn-error';
		case ShippingState.Liefern:
			return 'btn-warning';
		default:
			return 'btn-success';
	}
}
