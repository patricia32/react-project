import { useEffect, useState } from 'react';
import ProductsList from '../components/ProductsList';
import SearchBar from '../components/SearchBar';
import type { Product } from '../types/Product';
import { getProducts } from '../api/products';
import Loading from '../components/Loading';
import NoItemsFound from '../components/NoItemsFound';

export default function MainPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
        setError(true);
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

  function handleChange(searchInput: string) {
    setSearchInput(searchInput);
  }

  if (isLoading) return <Loading displayedText="Loading..." />;
  if (error)
    return (
      <Loading displayedText="Oops! Something went wrong on our side. We're working on it." />
    );
  return (
    <div className="main">
      <SearchBar
        searchInput={searchInput}
        handleChange={(textInput) => handleChange(textInput)}
      />

      {filteredProducts.length > 0 ? (
        <ProductsList filteredProducts={filteredProducts} />
      ) : (
        <NoItemsFound searchInput={searchInput} />
      )}
    </div>
  );
}
