import type PickupHub from '$lib/model/pickup-hub';
import { pickupHubs } from '$lib//model/pickup-hub';
import OrderShipping from '$lib/model/order-shipping';

const generateRandomShipping = (hub: PickupHub): OrderShipping => new OrderShipping(hub.id);

export const orderShippings: OrderShipping[] = Array.from(pickupHubs, generateRandomShipping);
