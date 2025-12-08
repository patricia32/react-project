import type { Product } from '../types/Product';
import { getProducts } from '../api/products';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import NoItemsFound from './NoItemsFound';
import Loading from './Loading';

interface Props {
  searchInput: string;
}

export default function ProductsList({ searchInput }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      searchInput === '' ||
      product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.toLowerCase()),
  );

  if (isLoading) return <Loading />;
  return (
    <div className="container">
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
    </div>
  );
}
