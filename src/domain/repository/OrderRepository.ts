import { Order } from "../entity/Order";

export interface OrderRepository{
	findAll():Promise<Order[]>;
    get(code: string):Promise<Order>
    save(order:Order):Promise<void>
    count():Promise<number>
    clear():Promise<void>
}