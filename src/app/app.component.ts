import { Component, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { FoodsComponent } from "./pages/foods/foods.component";
import { NgIf } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { ModalComponent } from "./base/modal/modal.component";
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FoodsComponent, NgIf, CartComponent, ModalComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-byte-eats';
  dropdownOpen = false;  

  showCart: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) 
  {
    
  }

  get cartCount() {
    return this.cartService.items.length;
  }

  openCart() {
    this.showCart = true;
  }

  closeCart(){
    this.showCart = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
