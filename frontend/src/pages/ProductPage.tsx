import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProductDetails } from '../api/products';
import type { Product } from '../types/Product';
import Loading from '../components/Loading';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';

export default function ProductPage() {
  const { productId, imgCode } = useParams();
  const [product, setProduct] = useState({} as Product);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId)
      getProductDetails(productId)
        .then((productData) => {
          productData.image = productData.image.slice(0, -3) + imgCode;
          productData.reviews.forEach((review) => {
            review.createdAt = new Date(review.createdAt);
          });
          setProduct(productData);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [productId]);

  if (isLoading) return <Loading />;
  return (
    <div className="productPage">
      <div
        className="productPage__present"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)),
                                 url(${product.image})`,
        }}
      >
        <div className="productPage__present-name">{product.name}</div>
        <div className="productPage__present-description">
          {product.description}
        </div>
      </div>
      <div className="productPage__reviews">
        <div className="productPage__reviews__readWrite">
          <ReviewsList reviews={product.reviews} />
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}
