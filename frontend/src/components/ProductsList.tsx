import type { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface Props {
  filteredProducts: Product[];
}

export default function ProductsList({ filteredProducts }: Props) {
  return (
    <div className="container">
      <div className="body">
        <div className="body__products">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
