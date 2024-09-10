import { Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cartItem';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  @Input() item!: CartItem;

}
