import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl =
      environment.apiUrl;
      
   constructor(
    private http: HttpClient
  ) {}

  createOrder(data: any): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-order`,

      data

    );

  }

  getAllOrders(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-orders`

    );

  }

  getOrderById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-order/${id}`

    );

  }

  getOrdersByUser(
    userId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-orders-by-user/${userId}`

    );

  }

  cancelOrder(
    id: string,
    data: any
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/cancel-order/${id}`,

      data

    );

  }

  deleteOrder(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-order/${id}`

    );

  }
}
