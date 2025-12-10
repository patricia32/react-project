import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProductDetails } from '../api/products';
import type { Product } from '../types/Product';
import Loading from '../components/Loading';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import type { Review } from '../types/Review';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>({} as Product);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId)
      getProductDetails(productId)
        .then((productData) => {
          setProduct(productData);
          setReviews(productData.reviews || []);
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
          <ReviewsList reviews={reviews} />
          <ReviewForm
            productId={productId}
            onReviewSubmit={(newReview) => {
              newReview.createdAt = new Date(newReview.createdAt);
              setReviews((prev) => [newReview, ...prev]);
            }}
          />
        </div>
      </div>
    </div>
  );
}
