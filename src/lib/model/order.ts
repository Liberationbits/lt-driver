export enum OrderState {
	Bestellt, // inital
	Packen, // packing
	Liefern, // delivering
	Abgeschlossen // finished
}

export type OrderShipping = {
	id: string;
	orderId: string;
	boxesCount: number;
}

export type Order = {
	id: string;
	customerId: string;
	portions: number;
	state: OrderState;
	shipping: OrderShipping | undefined
};

export default Order;
