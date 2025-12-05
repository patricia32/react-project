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
    data[0].reviews.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return data[0] as Product;
  } catch (err) {
    console.error('Failed to fetch product details:', err);
    throw err;
  }
}

export async function submitReview(
  productId: string,
  text: string,
  rating: number,
) {
  try {
    const res = await fetch(
      `http://localhost:8055/products/${productId}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, rating }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to submit review');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    throw error;
  }
}
