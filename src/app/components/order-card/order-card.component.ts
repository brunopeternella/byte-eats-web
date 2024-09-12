import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderQueryResponse } from '../../models/responses/orderQueryResponse';
import { ModalComponent } from "../../base/modal/modal.component";
import { OrderCardDetailsComponent } from "./order-card-details/order-card-details.component";
import { OrderStatus } from '../../enums/orderStatus';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [ModalComponent, OrderCardDetailsComponent],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {

  @Input() order!: OrderQueryResponse

  @Output() orderUpdated = new EventEmitter<{updatedOrder: OrderQueryResponse; oldStatus: OrderStatus}>();

  showOrderCardDetails = false;
  
  openCardDetais() {
    this.showOrderCardDetails = true;
  }

  closeCardDetails(event: {updatedOrder: OrderQueryResponse; oldStatus: OrderStatus} | null) {
    this.showOrderCardDetails = false;

    if(event) {
      this.orderUpdated.emit(event);
    }
  }
}
