export interface IProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags : string[];
    brand: string;
    sku: string;
    weight: number;
    minimumOrderQuantity: number;
    images: string[];
    thumbnail: string;
}