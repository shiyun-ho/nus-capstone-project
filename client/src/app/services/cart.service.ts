import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //property
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQty: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem) {

    //check if item already exists in cart
    let alreadyExists: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    //if more than 0 items in shopping cart
    if (this.cartItems.length > 0) {
      //find item in cart based on item id
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id == theCartItem.id) {
          alreadyExists = true;
          //assign variable existingCartItem
          existingCartItem = tempCartItem;
          break;
        }
      }

    }

    if (alreadyExists) {
      // increment the quantity
      existingCartItem!.quantity++; 
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.calculateCartTotals();
    
  }

  removeFromCart(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      //remove cart item from list
      //find index of item in array
      const itemIdx = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

      //if index is 0 or more 
      if (itemIdx > -1) {
        this.cartItems.splice(itemIdx, 1);

        this.calculateCartTotals();
      }
    } else {
      this.calculateCartTotals();
    }

  }


  calculateCartTotals() {
    let totalPValue: number = 0.00;
    let totalQtyValue: number = 0;

    for (let currCartItem of this.cartItems) {
      totalPValue += currCartItem.quantity * currCartItem.unitPrice;
      totalQtyValue += currCartItem.quantity;

    }

    //publish the new value
    this.totalPrice.next(totalPValue);
    this.totalQty.next(totalQtyValue);

    //check if data is showing
    this.logCartData(totalPValue, totalQtyValue);
  }

  logCartData(totalPValue: number, totalQtyValue: number) {
    console.log(`>>>>>>>>Cart details`);
    for (let tempCartItem of this.cartItems) {
      const subTotPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, qty: ${tempCartItem.quantity}, 
        unitPrice=${tempCartItem.unitPrice}, subtotalPrice=${subTotPrice}`);
    }

    console.log(`totalPrice: ${totalPValue}, totalQty: ${totalQtyValue}`);
    console.log(`>>>>>>>`)
  }

  


}


