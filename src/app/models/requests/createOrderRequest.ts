import { OrderItem } from "../orderItem";

export class CreateOrderRequest {
    userId!: string;
    items!: Array<OrderItem>

    constructor(userId: string, items: Array<OrderItem>) {
        this.userId = userId;
        this.items = items;
    }
}