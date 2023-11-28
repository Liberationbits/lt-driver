import { v4 as uuidv4 } from 'uuid';
import type PickupHub from './pickup-hub';
import { pickupHubs } from './pickup-hub';

type Order = {
	id: string;
	hubId: string;
    portions: number;
    ajuice: number;
    eggs: number;
    potatoes: number;
};

const generateRandomOrder = (hub: PickupHub): Order => ({
    id: uuidv4(),
    hubId: hub.id,
    portions: Math.floor(Math.random() * 20),
    ajuice: Math.floor(Math.random() * 99),
    eggs: Math.floor(Math.random() * 99),
    potatoes: Math.floor(Math.random() * 99),
  });
  
  export const orders: Order[] = Array.from(pickupHubs, generateRandomOrder);