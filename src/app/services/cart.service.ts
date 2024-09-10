import { Injectable, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';

const CART = "cart";

@Injectable({
  providedIn: 'root',
})
export class CartService {

   private _items: CartItem[] = [];
    
  constructor() {
    var items = localStorage.getItem(CART)

    if(items)
        this._items = JSON.parse(items);
  }

   get items(): CartItem[] {
    return this._items;
  }

  add(cartItem: CartItem) {
    this._items!.push(cartItem);
    localStorage.setItem(CART, JSON.stringify(this._items))
  }

  clear(){
    this._items = [];
    localStorage.removeItem(CART)
  }
}
