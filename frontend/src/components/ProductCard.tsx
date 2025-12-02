import Rating from "@mui/material/Rating";
import type { Product } from "../types/Product";

interface Props {
  product: Product;
}

export default function ProductCard({product}:Props) {
  const code = Math.floor(Math.random() * 900); 
  const imagePath = product.image.slice(0, -3) + code;

  function calculateAverageRating(){
    if (!product.reviews.length) 
      return 0;
    return product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;
  }

  console.log(calculateAverageRating())
   return (
    <article 
      className="product"
      style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)),
                                 url(${imagePath})`, }}
      >
        <div className="product__details">
          
          <div className="product__details-reviews">
            {product.reviews.length ? (
              <>
                <Rating
                  className="product__details-rating"
                  name="size-small"
                  value={calculateAverageRating()}
                  readOnly
                />
                <span className="product__details-reviewInfo">
                  <span>{calculateAverageRating().toFixed(1)} of 5</span> ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
                </span>
                
              </>
            ) : (
              <>
                <Rating
                  className="product__details-rating"
                  name="size-small"
                  value={0}
                  readOnly
                />
                <span className="product__details-reviewInfo">(no reviews)</span>
              </>
            )}
          </div>
          <div className="product__details-name">
            {product.name}
          </div>
        </div>
    </article>
   )
}