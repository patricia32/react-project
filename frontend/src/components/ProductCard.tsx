import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import { calculateAverageRating } from '../utils/calculateAverageRating';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isImageLoading, setIsImageLoading] = useState(true);

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

  const navigate = useNavigate();
  function handleRedirect() {
    navigate(`/product/${product.id}`);
  }
  return (
    <article
      onClick={handleRedirect}
      className="product"
      style={{
        backgroundImage: backgroundImage,
      }}
    >
      {isImageLoading && (
        <CircularProgress className="CircularProgress" color="inherit" />
      )}
      <div className="product__details">
        <div className="product__details-reviews">
          {product.reviews.length ? (
            <>
              <Rating
                className="product__details-rating"
                value={calculateAverageRating(product.reviews)}
                precision={0.1}
                readOnly
              />
              <span className="product__details-reviewInfo">
                <span>
                  {calculateAverageRating(product.reviews).toFixed(1)} of 5
                </span>{' '}
                ({product.reviews.length}{' '}
                {product.reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </>
          ) : (
            <>
              <Rating className="product__details-rating" value={0} readOnly />
              <span className="product__details-reviewInfo">(no reviews)</span>
            </>
          )}
        </div>
        <div className="product__details-name">{product.name}</div>
      </div>
    </article>
  );
}
