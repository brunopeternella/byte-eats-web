import { ChangeDetectorRef, Component } from '@angular/core';
import { OrderCardComponent } from "../../../components/order-card/order-card.component";
import { OrderQueryResponse } from '../../../models/responses/orderQueryResponse';
import { OrderService } from '../../../services/order.service';
import { OrderStatus } from '../../../enums/orderStatus';
import { UpdateOrderRequest } from '../../../models/requests/updateOrderRequest';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderCardComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  newOrders: OrderQueryResponse[] = [];
  preparingOrders: OrderQueryResponse[] = [];
  deliveringOrders: OrderQueryResponse[] = [];
  deliveredOrders: OrderQueryResponse[] = [];


  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadAllOrders()
  }

  private loadAllOrders(){
    this.orderService.getAll<OrderQueryResponse>()
      .subscribe(response => {
        this.newOrders = 
          this.sortByOldestCreatedOrders(response.items.filter(order => order.status === OrderStatus.New))

        this.preparingOrders = 
          this.sortByOldestCreatedOrders(response.items.filter(order => order.status === OrderStatus.Preparing))

        this.deliveringOrders =
          this.sortByOldestCreatedOrders(response.items.filter(order => order.status === OrderStatus.Delivering))

        this.deliveredOrders =
          this.sortByOldestCreatedOrders(response.items.filter(order => order.status === OrderStatus.Delivered))
      })
  }

  onOrderUpdated(event: {updatedOrder: OrderQueryResponse; oldStatus: OrderStatus}): void {

    let updateOrderRequest: UpdateOrderRequest = {
      status: Number(event.updatedOrder.status),
      wasPaid: event.updatedOrder.wasPaid 
    }
    
    this.orderService.update(event.updatedOrder.id!, updateOrderRequest).subscribe()

    this.updateOrdersByStatus(event.oldStatus)
    this.updateOrdersByStatus(Number(event.updatedOrder.status))
    this.cdr.detectChanges();

  }

  private updateOrdersByStatus(status: number){
    console.log(status);
    
    if(status == 1) this.loadNewOrders()
    if(status == 2) this.loadPreparingOrders()
    if(status == 3) this.loadDeliveringOrders()
    if(status == 4) this.loadDeliveredOrders()
  }

  private loadNewOrders() {
    this.orderService.getByOrderStatus<OrderQueryResponse>(OrderStatus.New)
      .subscribe(response => {
        this.newOrders = [...this.sortByOldestCreatedOrders(response.items)];
      })
  }

  private loadPreparingOrders() {
    this.orderService.getByOrderStatus<OrderQueryResponse>(OrderStatus.Preparing)
      .subscribe(response => {
        this.preparingOrders = [...this.sortByOldestCreatedOrders(response.items)];
      })
  }

  private loadDeliveringOrders() {
    this.orderService.getByOrderStatus<OrderQueryResponse>(OrderStatus.Delivering)
      .subscribe(response => {
        this.deliveringOrders = [...this.sortByOldestCreatedOrders(response.items)];
      })
  }

  private loadDeliveredOrders() {
    this.orderService.getByOrderStatus<OrderQueryResponse>(OrderStatus.Delivered)
      .subscribe(response => {
        this.deliveredOrders = [...this.sortByOldestCreatedOrders(response.items)];        
      })
  }

  private sortByOldestCreatedOrders(orders: OrderQueryResponse[]): OrderQueryResponse[] {
    return orders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }  


}
