import type { Review } from '../types/Review';
import ReviewCard from './ReviewCard';

interface Props {
  reviews: Review[];
}
export default function ReviewsList({ reviews }: Props) {
  return (
    <div className="reviewsList">
      What our customers say about us
      {reviews.length > 0 ? (
        <div className="reviewsList__grid">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review}></ReviewCard>
          ))}
        </div>
      ) : (
        <div className="reviewsList__empty">No reviews yet</div>
      )}
    </div>
  );
}
