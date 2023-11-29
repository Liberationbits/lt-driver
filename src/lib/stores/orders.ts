import { v4 as uuidv4 } from 'uuid';
import type PickupHub from '$lib/model/pickup-hub';
import { pickupHubs } from '$lib//model/pickup-hub';
import type Order from '$lib/model/order';
import { OrderState } from '$lib/model/order';

const generateRandomOrder = (hub: PickupHub): Order => ({
	id: uuidv4(),
	customerId: hub.id,
	portions: Math.floor(Math.random() * 20),
	ajuice: Math.floor(Math.random() * 99),
	eggs: Math.floor(Math.random() * 99),
	potatoes: Math.floor(Math.random() * 99),
	state: OrderState.Bestellt
});

export const orders: Order[] = Array.from(pickupHubs, generateRandomOrder);
