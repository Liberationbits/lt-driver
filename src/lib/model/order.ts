export enum OrderState {
	Bestellt, // inital
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

export default Order;
