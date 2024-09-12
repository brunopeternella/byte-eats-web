import { OrderStatus } from "../../enums/orderStatus";
import { OrderItem } from "../orderItem";

export class UpdateOrderRequest {
    wasPaid!: boolean;
    status!: OrderStatus
}