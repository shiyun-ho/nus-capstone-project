import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit{

  isAuthenticated: boolean = false; 
  userFullName: string = ''; 

  browserStorage: Storage = sessionStorage;

  constructor(private oktaAuthSvc: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  ngOnInit(): void {
    //subscribe to authentication state changes
    this.oktaAuthSvc.authState$.subscribe(
      (result) => {
        console.log('Authentication state:', result);
        console.log(result.isAuthenticated);
        this.isAuthenticated = result.isAuthenticated!; 
        this.getUserDetails(); 
        console.log(this.getUserDetails());
      },
      (error) => {
        console.error('Authentication state error:', error);
      }
    )
  }

  getUserDetails() {
    if (this.isAuthenticated){
      //Fetch user full name
      this.oktaAuth.getUser().then(
        (result) => {
          //retrieve the username
          this.userFullName = result.name as string; 

          //retrieve the email
          const theEmail= result.email;

          //store in browser 
          this.browserStorage.setItem('userEmail', JSON.stringify(theEmail));
        }
      )
    }
  }

  //log out method
  logout(){
    //stops session and remove current tokens
    this.oktaAuth.signOut(); 
  }

  
}
