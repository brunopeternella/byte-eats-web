import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ModalComponent } from '../../base/modal/modal.component';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';

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

}
