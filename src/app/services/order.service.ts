import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { CreateOrderRequest } from '../models/requests/createOrderRequest';
import { OrderStatus } from '../enums/orderStatus';
import { BaseQueryResponse } from '../models/responses/baseQueryResponse';
import { UpdateOrderRequest } from '../models/requests/updateOrderRequest';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    private readonly endpoint = "/api/byte-eats/orders"
    
  constructor(private httpClient: HttpClient) {

  }

    create(order: CreateOrderRequest): Observable<HttpResponse<any>> {
        return this.httpClient.post<any>(this.endpoint, order)
    }

    getByOrderStatus<T>(orderStatus: OrderStatus, page: number = 1, pageSize: number = 200): Observable<BaseQueryResponse<T>>{
        
      let queryParams = new HttpParams()
        .set("page", page)
        .set("pageSize", pageSize)
        .set("status", orderStatus)
      
      return this.httpClient.get<BaseQueryResponse<T>>(this.endpoint, { params: queryParams })
    }

    getAll<T>(page: number = 1, pageSize: number = 200): Observable<BaseQueryResponse<T>>{
        
      let queryParams = new HttpParams()
        .set("page", page)
        .set("pageSize", pageSize)
      
      return this.httpClient.get<BaseQueryResponse<T>>(this.endpoint, { params: queryParams })
    }

    update(id: string, order: UpdateOrderRequest): Observable<HttpResponse<any>>{
      console.log(this.endpoint + '/' + id);

      return this.httpClient.put<any>(this.endpoint + '/' + id, order)
    }
}
