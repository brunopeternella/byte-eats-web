import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { CreateOrderRequest } from '../models/requests/createOrderRequest';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    private readonly endpoint = "/api/byte-eats/orders"
    
  constructor(private httpClient: HttpClient) {

  }

    async create(order: CreateOrderRequest) {
        var response = await firstValueFrom(this.httpClient.post(this.endpoint, order))
    }

    async get(){
        var response = await firstValueFrom(this.httpClient.get(this.endpoint))
    }
}
