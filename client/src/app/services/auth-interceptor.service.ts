import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Observable, from, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request:HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    //add access token for secure endpoints
    const endpoint = environment.baseUrl + '/orders';
    const secureEndpoints = [endpoint];
    // const secureEndpoints = ['http://localhost:8080/api/orders'];
    
    if(secureEndpoints.some(url => request.urlWithParams.includes(url))){
      const accessToken = this.oktaAuth.getAccessToken(); 

      //clone request and add new header with access token
      request = request.clone({
        setHeaders:{
          Authorization: 'Bearer' + accessToken
        }
      });
    }

    // Log the request URL and headers for debugging
    console.log('Request URL:', request.url);
    console.log('Request Headers:', request.headers);


    try {
      const response = await lastValueFrom(next.handle(request));

      // Log the response for debugging
      console.log('Response:', response);

      return response;
    } catch (error) {
      // Log the error for debugging
      console.log('Error:', error);

      if (error instanceof HttpErrorResponse) {
        // Log the error response body for debugging
        console.log('Error Response Body:', error.error);
    }
    
      throw error;
    // return await lastValueFrom(next.handle(request)); 
  }
}
}
