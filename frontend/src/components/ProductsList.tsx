
import type { Product } from '../types/Product'
import { getProducts } from '../api/products'

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductsList () {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(products => setProducts(products));
    }, [])

    return(
        <div className='products__list'>
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}