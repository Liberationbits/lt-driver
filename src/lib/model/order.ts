import { v4 as uuidv4 } from 'uuid';
import type PickupHub from './pickup-hub';
import { pickupHubs } from './pickup-hub';

export enum OrderState {
	Ordered, // inital
	Packen, // packing
	Liefern, // delivering
	Abgeschlossen // finished
}

export type Order = {
	id: string;
	customerId: string;
	portions: number;
	ajuice: number;
	eggs: number;
	potatoes: number;
	state: OrderState;
};

const generateRandomOrder = (hub: PickupHub): Order => ({
	id: uuidv4(),
	customerId: hub.id,
	portions: Math.floor(Math.random() * 20),
	ajuice: Math.floor(Math.random() * 99),
	eggs: Math.floor(Math.random() * 99),
	potatoes: Math.floor(Math.random() * 99),
	state: OrderState.Ordered
});

export const orders: Order[] = Array.from(pickupHubs, generateRandomOrder);

export default Order;
