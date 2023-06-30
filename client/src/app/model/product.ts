export class Product {

    constructor(
        public id: string, 
        public productId: number,
        public sku: string,
        public productType: string,
        public name: string,
        public unitPrice: number,
        public imageUrl: string,
        public productUrl: string,
        public brand: string,
        public currentCategory: string,
        public categoryName: string,
        ){

    }
}
