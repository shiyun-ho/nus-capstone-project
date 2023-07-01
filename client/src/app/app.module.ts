import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent, OktaConfig
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { TrackerComponent } from './components/tracker/tracker.component';

import OktaSignIn from '@okta/okta-signin-widget';
import { PastOrdersComponent } from './components/past-orders/past-orders.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { RouterModule, RouterOutlet } from '@angular/router';

// const oktaConfig = myAppConfig.oidc; 
const oktaConfig =
{
  clientId: '0oaa4vovf6CwjcZVQ5d7',
  issuer: 'https://dev-69693914.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/login/callback',
  scopes: ['openid', 'profile', 'email']
};
const oktaAuth = new OktaAuth(oktaConfig);
const moduleConfig: OktaConfig = { oktaAuth };



@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryMenuComponent,

    ProductListComponent,
    ProductCategoryMenuComponent,
    LoginStatusComponent,
    CartStatusComponent,
    CartDetailsComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    TrackerComponent,
    PastOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    OktaAuthModule,
    // OktaAuthModule.forRoot(moduleConfig),
    RouterModule, RouterOutlet
  ],
  providers: [ProductService,{ provide: OKTA_CONFIG, useValue: { oktaAuth } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService, multi: true
    },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }







