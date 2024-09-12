import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { CreateOrderRequest } from '../models/requests/createOrderRequest';
import { OrderStatus } from '../enums/orderStatus';
import { BaseQueryResponse } from '../models/responses/baseQueryResponse';
import { UpdateOrderRequest } from '../models/requests/updateOrderRequest';
import { mockUsers } from '../utils/mockUsers';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private readonly endpoint = "/api/byte-eats/users"
    
  constructor(private httpClient: HttpClient) {

  }

    createRandomUser(): Observable<{id: string}> {
        let randomIndex = Math.floor(Math.random() * mockUsers.length);
        let user = mockUsers[randomIndex];
        return this.httpClient.post<{id: string}>(this.endpoint, user)
    }    
}
