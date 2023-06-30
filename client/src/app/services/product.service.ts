import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../model/product-category';
import { ProductDescription } from '../model/product-description';
import { ProductReview } from '../model/product-review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private baseUrl = "http://localhost:8080/api/products";
  private baseUrl = environment.baseUrl + "/products";
  // private categoryUrl = "http://localhost:8080/api/product-category";
  private categoryUrl = environment.baseUrl + "/product-category";

  // private descriptionUrl = "http://localhost:8080/api/product-description";
  private descriptionUrl = environment.baseUrl + "/product-description";

  //private reviewUrl = "http://localhost:8080/api/product-review";
  private reviewUrl = environment.baseUrl + "/product-review";

  constructor(private httpClient: HttpClient) { }

  //get request to backend base url 
  //function: get products by category
  getProductList(theCategoryId: number): Observable<Product[]> {

    //Call to Springboot backend to create url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    //get the data and sort out items from the embedded array 
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  //get request to backend base url (accounts for pagination)
  //function: get products by category
  getProductListPage(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {

    //Call to Springboot backend to create url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}` + `&size=${thePageSize}`;

    //get the data and sort out items from the embedded array 
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  //call backend rest api to fetch categories
  getProductCategories(): Observable<ProductCategory[]> {
    //call backend url to retrieve url 
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  //call backend to search by keyword
  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`

    //call backend url to retrieve url 
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  //get request to backend base url (accounts for pagination)
  //function: get products by category
  searchProductPage(thePage: number,
                      thePageSize: number,
                      theKeyword: string): Observable<GetResponseProducts> {

    //Call to Springboot backend to create url based on search term
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` + `&page=${thePage}` + `&size=${thePageSize}`;

    //get the data and sort out items from the embedded array 
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  //obtain details for product detail page
  getProduct(theProductId: number): Observable<Product> {

    //url based on product id from backend
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);

  }

  getProductDescription(theProductId: number): Observable<ProductDescription> {

    const descUrl = `${this.descriptionUrl}/${theProductId}`;

    // console.log(descUrl);

    //call backend url to retrieve url 
    return this.httpClient.get<ProductDescription>(descUrl);
  }

  getProductReview(theProductId: number): Observable<ProductReview[]> {

    const rvewUrl = `${this.reviewUrl}/search/findByProductId?productId=${theProductId}`;

    console.log(rvewUrl);

    return this.httpClient.get<GetResponseProductReview>(rvewUrl).pipe(
      map(response => response._embedded.productReview)
    );
  }

  
  




}


interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  //account for format of json response for pagination 
  page: {
    size: number,
    totalElements: number,
    totalPages: number;
    number: number
  }
}

interface GetResponseProductCategory {
  //get json response and extract from _embedded from the response
  _embedded: {
    productCategory: ProductCategory[];
  }
}

interface GetResponseProductReview {
  _embedded: {
    productReview: ProductReview[];
  }
}



