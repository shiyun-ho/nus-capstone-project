import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Product } from "./product";

export class CartItem {

    id!: string; 
    name!: string; 
    // imageUrl!: string; 
    imageUrl!: SafeResourceUrl;
    unitPrice!: number; 
    quantity!: number;

    constructor(product: Product, private sanitizer: DomSanitizer) {
        this.id = product.id;
        this.name = product.name; 
        // this.imageUrl = product.imageUrl; 
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(product.imageUrl); // Sanitize the URL
        this.unitPrice = product.unitPrice; 

        this.quantity = 1; 

    }
}
