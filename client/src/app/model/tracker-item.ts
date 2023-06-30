import { Product } from "./product";
import { ProductDescription } from "./product-description";

export class TrackerItem {

    id!: string; 
    name!: string; 
    // ingredients!: string; 
    quantity!: number; 
    description!: ProductDescription; 
    skinConcern!: string[]; 
    //TODO: add ingredients and review


    //TODO: add model for ingredients and reviews
    constructor(product: Product, description: ProductDescription,
        skinConcern: string = ''){
        this.id = product.id; 
        this.name = product.name;
        this.quantity = 1;
        this.description = description;  
        this.skinConcern = Array.isArray(skinConcern) ? skinConcern : [skinConcern];

        //add constructor for ingredient and quantity
    }

}


