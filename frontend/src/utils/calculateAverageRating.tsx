import type { Review } from '../types/Review';

export function calculateAverageRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  );
}
