import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ModalComponent } from '../../base/modal/modal.component';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { OrderItem } from '../../models/orderItem';
import { CreateOrderRequest } from '../../models/requests/createOrderRequest';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent extends ModalComponent {
  items: CartItem[]

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService
  )
  {
    super();

    this.items = this.cartService.items
  }

  get totalPrice(){
    let total = 0;

    this.items.forEach(item => {
      total += item.price*item.quantity;
    })

    return total.toFixed(2);
  }

  async onConfirm(){

    let user = await firstValueFrom(this.userService.createRandomUser())

    var cartItems = this.cartService.items

    if(cartItems.length == 0) {
      this.closeModal();
      return;
    }

    var orderItems = cartItems.map<OrderItem>(item => ({
      productId: item.id,
      quantity: item.quantity
    }))

    var createOrderRequest = new CreateOrderRequest(user.id, orderItems)

    var request = this.orderService.create(createOrderRequest);

    request.subscribe(
      response => {
        console.log(response)
        this.cartService.clear()
      }, 
      error => {
        console.log(error)
      })
      .add(() => {
        this.closeModal()        
      })      
  }

}
