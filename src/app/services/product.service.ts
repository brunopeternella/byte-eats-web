import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Product } from '../models/product';
import { PagedQueryResponse } from '../models/responses/pagedQueryResponse';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly endpoint = "/api/byte-eats/products"
    
  constructor(private httpClient: HttpClient) {

  }

    get(page: number, pageSize: number): Observable<PagedQueryResponse<Product>>{
        var response = this.httpClient.get<PagedQueryResponse<Product>>(this.endpoint, {
          params: { page, pageSize },
        })
        return response;
    }
}
