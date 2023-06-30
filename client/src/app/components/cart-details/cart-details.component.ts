import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
  providers: [CurrencyPipe]
})
export class CartDetailsComponent implements OnInit{

  cartItems: CartItem[] = []; 
  totalPrice: number = 0.00; 
  totalQty: number = 0; 

  constructor(private cartSvc: CartService, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.listCartDetails();
    
  }

  sanitizeImageUrl(imageUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

  listCartDetails() {
    //handle cart items
    this.cartItems = this.cartSvc.cartItems;
    
    //subscribe to cart totalPrice
    this.cartSvc.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    //subscribe to cart totalQty
    this.cartSvc.totalQty.subscribe(
      data => this.totalQty = data
    )

    //calculate both
    this.cartSvc.calculateCartTotals();
  }

  increaseQty(theCartItem: CartItem){
    this.cartSvc.addToCart(theCartItem); 
  }

  decreaseQty(theCartItem: CartItem){
    this.cartSvc.removeFromCart(theCartItem);
  }

  
}
