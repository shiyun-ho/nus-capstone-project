import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PastOrders } from '../model/past-orders';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PastOrdersService {

  // private orderUrl = 'http://localhost:8080/api/orders';
  
  private orderUrl = environment.baseUrl + '/orders';

  constructor(private http: HttpClient) { }

  getPastOrders(theEmail: string): Observable<GetResponsePastOrders>{

    //build url based on email findByCustomerEmail
    const pastOrderUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;

    console.log(`HERE: `, JSON.stringify(this.http.get<GetResponsePastOrders>(pastOrderUrl)));
    return this.http.get<GetResponsePastOrders>(pastOrderUrl);
  }

}

 interface GetResponsePastOrders{
    _embedded:{
      orders: PastOrders[];
    }
  }