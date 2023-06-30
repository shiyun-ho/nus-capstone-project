import { Component, Inject, OnInit } from '@angular/core';

import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from 'src/app/config/my-app-config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn: any; 

  // constructor(private oktaAuth: OktaAuth) {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/signinlogo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri:myAppConfig.oidc.redirectUri, 
      useClassicEngine: true,
      authParams: {
        pkce: true, 
        issuer: myAppConfig.oidc.issuer, 
        scopes: myAppConfig.oidc.scopes
      }
    }); 
  }

  ngOnInit(): void {
        this.oktaSignIn.remove(); 

        this.oktaSignIn.renderEl({
          el: '#okta-sign-in-widget'},
          (response: any) => {
            if (response.status === 'SUCCESS'){
              console.log(response);
              this.oktaAuth.signInWithRedirect();
            }
          },
          (error: any)=>{
            console.log(error); 
            throw error; 
          }
        )

        

        
      }

  // ngOnDestroy(): void {
  //   this.oktaSignin.remove();
  // }
}
