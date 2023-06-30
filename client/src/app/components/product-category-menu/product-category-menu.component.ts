import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCategory } from 'src/app/model/product-category';
import { ProductService } from 'src/app/services/product.service';
import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css'],
  providers: [TitleCasePipe, RouterLink]
})
export class ProductCategoryMenuComponent implements OnInit{

  productCategories: ProductCategory[] = []; 

  constructor(private productService: ProductService){}

  ngOnInit(){

    this.listProductCategories(); 
      
  }

  listProductCategories(){
    
    this.productService.getProductCategories().subscribe(
      data => {
        //log the product categories from REST api to check 
        // console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data; 
      }
    );
  }

}
