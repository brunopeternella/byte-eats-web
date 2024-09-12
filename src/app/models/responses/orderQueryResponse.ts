import { OrderStatus } from "../../enums/orderStatus"
import { OrderItemQueryResponse } from "./orderItemQueryResponse"

export class OrderQueryResponse {
    id: string | undefined
    userName: string | undefined
    userEmail!: string
    wasPaid!: boolean
    totalValue!: number
    createdAt!: string
    updatedAt!: any
    status!: OrderStatus
    items!: OrderItemQueryResponse[]
}