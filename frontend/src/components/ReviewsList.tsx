import type { Review } from '../types/Review';
import { calculateAverageRating } from '../utils/calculateAverageRating';
import RatingCard from './RatingCard';
import ReviewCard from './ReviewCard';

interface Props {
  reviews: Review[];
}
export default function ReviewsList({ reviews }: Props) {
  return (
    <div className="reviewsList">
      What our customers say about us
      <RatingCard
        reviewsNo={reviews.length}
        avg={calculateAverageRating(reviews)}
      />
      {reviews.length > 0 && (
        <div className="reviewsList__grid">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review}></ReviewCard>
          ))}
        </div>
      )}
    </div>
  );
}
