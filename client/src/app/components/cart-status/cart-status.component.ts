import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0; 
  totalQty: number = 0; 

  constructor(private cartSvc: CartService) {}

  ngOnInit(): void{

    this.updateCartStatus(); 

  }

  updateCartStatus() {

    console.log(`>>>updating cart status`);

    //subscribe for events from cartSvc
    //subscribe to cart totalP
    this.cartSvc.totalPrice.subscribe(
      data => this.totalPrice = data
      
    );

    //subscribe to cart totalQty
    this.cartSvc.totalQty.subscribe(
      data => this.totalQty = data
    );


  }

}
