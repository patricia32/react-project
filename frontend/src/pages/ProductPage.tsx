import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProductDetails } from '../api/products';
import type { Product } from '../types/Product';
import Loading from '../components/Loading';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import type { Review } from '../types/Review';
import { CircularProgress } from '@mui/material';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>({} as Product);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (productId)
      getProductDetails(productId)
        .then((productData) => {
          setProduct(productData);
          setReviews(productData.reviews || []);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, []);

  useEffect(() => {
    if (!product?.image) return;

    setIsImageLoading(true);

    const img = new Image();
    img.src = product.image;

    img.onload = () => {
      setIsImageLoading(false);
    };

    img.onerror = () => {
      setIsImageLoading(false);
    };
  }, [product.image]);

  const backgroundImage = isImageLoading
    ? 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))' // skeleton
    : `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), url(${product.image})`;

  if (error)
    return (
      <Loading displayedText="Oops! Something went wrong on our side. We're working on it." />
    );
  if (isLoading) return <Loading displayedText="Loading..." />;
  return (
    <div className="productPage">
      <div
        className="productPage__present"
        style={{
          backgroundImage,
        }}
      >
        {isImageLoading && <CircularProgress className="CircularProgress" />}
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
            setError={setError}
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
