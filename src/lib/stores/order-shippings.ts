import type OrderShipping from '$lib/model/order-shipping';
import { writable, type Writable } from 'svelte/store';

export const orderShippings: Writable<OrderShipping[]> = writable([]);
