import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductDescription } from 'src/app/model/product-description';
import { ProductReview } from 'src/app/model/product-review';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/model/cart-item';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { TrackerItem } from 'src/app/model/tracker-item';
import { TrackerService } from 'src/app/services/tracker.service';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [CurrencyPipe, CommonModule, BrowserModule]
})
export class ProductDetailsComponent implements OnInit{

  product!: Product;
  productDescription!: ProductDescription; 
  productReview!: ProductReview[]; 
  
  constructor(private productService: ProductService, 
      private route: ActivatedRoute, private cartSvc: CartService, 
      private sanitizer: DomSanitizer, private trackerSvc: TrackerService) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(()=> {
        this.handleProductDetails();
        //new function to add description
        this.handleProductDescription(); 
        //function to add review
        this.handleProductReview(); 
      })
  }

  handleProductDetails() {
    //retrieve id and convert string to a number
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!; 

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data; 
        // console.log('Product Details=' + JSON.stringify(data));
        // console.log(this.product); 
      }
    )

  }

  handleProductDescription(){
    //retrieve id and convert string to a number
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!; 

    this.productService.getProductDescription(theProductId).subscribe(
      data  => {
        this.productDescription = data; 
        console.log(this.productDescription);
      }
    )
  }


  handleProductReview() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
  
    this.productService.getProductReview(theProductId).subscribe(
      data => {
        this.productReview = data; // Wrap the single object in an array
        console.log(this.productReview);
      }
    );
  }

  addToCart(){
    console.log(`Adding to cart`);
    
    const theCartItem = new CartItem(this.product, this.sanitizer);
    this.cartSvc.addToCart(theCartItem);
  }

  // addToTracker(){
  //   const theTrackedItem = new TrackerItem(this.product);

  //   // Add the product description to the tracked item
  //   theTrackedItem.description = this.productDescription;
  //   this.trackerSvc.addToTracker(theTrackedItem);
  //   //adding to tracker works
  //   console.log(`Adding to tracker: theTrackedItem:`, theTrackedItem);
  // }

  addToTracker() {
    const theTrackedItem = new TrackerItem(
      this.product,
      this.productDescription // Pass the description to TrackerItem
    );

    const descriptionString = JSON.stringify(this.productDescription);
  
    this.trackerSvc.addToTracker(theTrackedItem, this.productDescription);
    console.log('Adding to tracker: theTrackedItem:', theTrackedItem);
  }
  
}
