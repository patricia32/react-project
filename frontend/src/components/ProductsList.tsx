import type { Product } from '../types/Product';
import { getProducts } from '../api/products';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import NoItemsFound from './NoItemsFound';

interface Props {
  searchInput: string;
}
export default function ProductsList({ searchInput }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((fetchedProducts) => {
        fetchedProducts.forEach((product) => {
          product.image =
            product.image.slice(0, -3) + Math.floor(Math.random() * 900);
          product.reviews.forEach((review) => {
            review.createdAt = new Date(review.createdAt);
          });
          setProducts(fetchedProducts);
        });
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      searchInput === '' ||
      product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.toLowerCase()),
  );
  console.log(filteredProducts);

  return (
    <div className="body">
      {filteredProducts.length > 0 ? (
        <div className="body__products">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NoItemsFound searchInput={searchInput} />
      )}
    </div>
  );
}
