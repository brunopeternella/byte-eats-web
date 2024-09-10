import { DecimalPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ModalComponent } from '../../../base/modal/modal.component';
import { Product } from '../../../models/product';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cartItem';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [NgIf, FormsModule],
  providers: [],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardModalComponent extends ModalComponent {

  @Input() product!: Product;

  quantity: number = 1;

  constructor(private cartService: CartService) {
    super();
  }

  get totalPrice(){
    const calculatedPrice = this.product.price * this.quantity;
    return calculatedPrice.toFixed(2);
  }

  onAddToCart(){
    var cartItem = new CartItem(
      this.product.id, 
      this.product.name, 
      this.product.price, 
      this.quantity);

    this.cartService.add(cartItem);
  }
}
