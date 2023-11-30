import type PickupHub from '$lib/model/pickup-hub';
import { initialHubs } from '$lib/stores/pickup-hubs';
import OrderShipping from '$lib/model/order-shipping';
import { writable } from 'svelte/store';

const generateRandomShipping = (hub: PickupHub): OrderShipping => new OrderShipping(hub.id);

export const orderShippings = writable(Array.from(initialHubs, generateRandomShipping));
