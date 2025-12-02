import type { Product } from '../types/Product';
import { getProducts } from '../api/products';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((fetchedProducts) => {
        fetchedProducts.forEach((product) => {
          product.image =
            product.image.slice(0, -3) + Math.floor(Math.random() * 900);
        });

        setProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
      });
  }, []);

  return (
    <div className="products__list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
