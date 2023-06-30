import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../model/purchase';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl =  environment.baseUrl + '/checkout/purchase'; 
  // private purchaseUrl = "http://localhost:8080/api/checkout/purchase"; 

  constructor(private httpClient: HttpClient) { }

  //place order 
  placeOrder(purchase: Purchase): Observable<any>{
    //return from post with api endpoint 
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase); 
  }
}
