import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../../base/modal/modal.component';
import { OrderItem } from '../../../models/orderItem';
import { OrderQueryResponse } from '../../../models/responses/orderQueryResponse';
import { FormsModule } from '@angular/forms';
import { OrderStatus } from '../../../enums/orderStatus';

@Component({
  selector: 'app-order-card-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order-card-details.component.html',
  styleUrl: './order-card-details.component.css'
})
export class OrderCardDetailsComponent implements OnInit{

  @Input() order!: OrderQueryResponse

  @Output() close = new EventEmitter<{updatedOrder: OrderQueryResponse; oldStatus: OrderStatus} | null>();

  oldStatus!: OrderStatus

  constructor(private cdr: ChangeDetectorRef) {
    
  }
  ngOnInit(): void {    
    this.oldStatus = this.order.status;
  }

  updateOrder(){
    this.cdr.detectChanges();
    this.close.emit({updatedOrder: this.order, oldStatus: this.oldStatus});
    this.closeModal();
  }

  closeModal(){
    this.close.emit(null);
  }
}
