export class ProductDescription {

    constructor(
        public id: number,
        public name: string,
        public imageUrl: string,
        public description: string,
        public ratingValue: number,
        public ratingCount: number,
        public reviewCount: number,
        public bestRating: number,
        public worstRating: number,
        public ingredients: string
    
        ){

    }
}
