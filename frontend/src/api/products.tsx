import type { Product } from '../types/Product';

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:8055/products');
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    const data: Product[] = await res.json();
    return data as Product[];
  } catch (err) {
    throw new Error('Error');
  }
}

export async function getProductDetails(productId: string): Promise<Product> {
  try {
    const res = await fetch(`http://localhost:8055/products/${productId}`);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    const data: Product[] = await res.json();
    return data[0] as Product;
  } catch (err) {
    console.error('Failed to fetch product details:', err);
    throw err;
  }
}
