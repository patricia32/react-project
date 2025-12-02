import type {Product} from '../types/Product';

export async function getProducts(): Promise<Product[]> {

    try {
        const res = await fetch("http://localhost:8055/products");
        const data:Product[] = await res.json();
        return data as Product[];
    } catch (err) {
        throw new Error('Error');
    }
}