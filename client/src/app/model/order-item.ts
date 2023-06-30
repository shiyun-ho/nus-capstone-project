import { SafeResourceUrl } from "@angular/platform-browser";
import { CartItem } from "./cart-item";

export class OrderItem {

    imageUrl: SafeResourceUrl;

    quantity: number;

    unitPrice: number;

    productId: string;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;

    }
}
