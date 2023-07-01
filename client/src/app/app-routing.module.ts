import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OktaCallbackComponent, OKTA_CONFIG, OktaAuthGuard, OktaConfig, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js'; 
import { LoginComponent } from './components/login/login.component';
import { TrackerComponent } from './components/tracker/tracker.component';



const oktaConfig = 
  {clientId: '0oaa4vovf6CwjcZVQ5d7',
  issuer: 'https://dev-69693914.okta.com/oauth2/default',
  // redirectUri: 'http://localhost:4200/login/callback',
  redirectUri: 'https://nus-capstone-project-r7gmx0rns-shiyun-ho-s-team.vercel.app/login/callback',
  scopes: ['openid', 'profile', 'email']};
const oktaAuth = new OktaAuth(oktaConfig);
const moduleConfig: OktaConfig = { oktaAuth };

import OktaSignIn from '@okta/okta-signin-widget';
import { PastOrdersComponent } from './components/past-orders/past-orders.component';

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector){
  //use injfector to access service 
  const router = injector.get(Router);

  //redirect to login 
  router.navigate(['/login']);
}

const routes: Routes = [
  // {path: 'past-orders', component:PastOrdersComponent, canActivate: [OktaAuthGuard],
  //   data: {onAuthRequired: sendToLoginPage}},
  {path: 'past-orders', component:PastOrdersComponent},
  {path: 'tracker', component:TrackerComponent, canActivate: [OktaAuthGuard],
    data: {onAuthRequired: sendToLoginPage}},
  // {path: 'tracker', component:TrackerComponent},
  {path: 'login/callback', component:OktaCallbackComponent},
  {path: 'login', component:LoginComponent},
  {path: 'checkout', component:CheckoutComponent},
  {path: 'cart-details', component:CartDetailsComponent},
  {path: 'search/:keyword', component:ProductListComponent},
  {path: 'products/:id', component:ProductDetailsComponent},
  {path: 'category/:id', component:ProductListComponent},
  {path: 'category', component:ProductListComponent},
  {path: 'products', component:ProductListComponent},
  {path: '', redirectTo:'/products', pathMatch: 'full'},
  {path: '**', redirectTo:'/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
