import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [CurrencyPipe, RouterLink, NgbPagination]
  
})
export class ProductListComponent implements OnInit{

  products: Product[] = []; 
  previousCategoryId: number = 1;
  currentCategoryId: number | undefined;
  searchMode: boolean = false; 


  //properties for pagination 
  thePageNumber: number = 1; 
  thePageSize: number = 12;
  theTotalElements: number = 0; 

  previousKeyword: string= "";
  

  constructor(private productService: ProductService, http: HttpClient,
      private route: ActivatedRoute, private cartSvc: CartService, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      //call the method to list methods
      this.listProducts();     
    });
  }

  listProducts(){

    //check if there is a keyword in the param 
    this.searchMode = this.route.snapshot.paramMap.has('keyword'); 

    if (this.searchMode){
    //search for products
      this.handleSearchProducts();
    } 
    else{
      
      this.handleListProducts(); 
    }
  }
  
  //search functionality
  handleListProducts(){
    //check if id is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); 
  
    if (hasCategoryId){
      //get the id param string and convert string to number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      
    } else{
      //if cat id no avail, default to 1
      this.currentCategoryId = 1
    }

    //create a new component every time when we have different catId
    if (this.previousCategoryId!= this.currentCategoryId){
      this.thePageNumber = 1; 
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    this.productService.getProductListPage(this.thePageNumber -1, 
                                          this.thePageSize, 
                                          this.currentCategoryId).subscribe(
                                            data => {
                                              //map products, pg number, pg size, total elements
                                              this.products = data._embedded.products;
                                              this.thePageNumber = data.page.number + 1; //springboot starts from 0, angular is 1
                                              this.thePageSize = data.page.size;
                                              this.theTotalElements = data.page.totalElements; 
                                            }
                                          )
  
    // //call getProductList from product service and subscribe
    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   //when data is returned, we assign it to this.products
    //   data => {
    //     this.products = data; 
    //   }
    // )

  }

    handleSearchProducts(){

      const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!; 


      //function to check if the current keyword matches with the previous one
      if(this.previousKeyword != theKeyword){
        //if not, reset it to page 1
        this.thePageNumber = 1;
      }

      this.previousKeyword = theKeyword; 

      console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

      // //search for products using keyword
      // this.productService.searchProducts(theKeyword).subscribe(
      //   data => {
      //     this.products = data; 
      //   }
      // )

      this.productService.searchProductPage(this.thePageNumber -1, 
                                              this.thePageSize, theKeyword).subscribe(this.processResult());

    }

    //take json response and map it to the fields
    processResult(){
      return (data:any) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1; 
        this.thePageSize = data.page.size; 
        this.theTotalElements = data.page.totalElements; 
      }
    }

    //ADD TO CART
    addToCart(theProduct: Product){
      console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

      //call the addToCart method to service later
      const theCartItem = new CartItem(theProduct, this.sanitizer); 

      this.cartSvc.addToCart(theCartItem);
      
    }





}
