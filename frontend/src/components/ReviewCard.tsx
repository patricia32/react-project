import type { Review } from '../types/Review';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import dateFormat from '../utils/dateFormat';
import Rating from '@mui/material/Rating';

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className="reviewCard">
      <FormatQuoteIcon className="reviewCard__item " fontSize="large" />
      <div className="reviewCard__text">{review.text}</div>
      <div className="reviewCard__rating">
        <Rating
          className="reviewCard__rating-stars"
          name="size-small"
          value={review.rating}
          readOnly
        />
      </div>
      <div className="reviewCard__date">{dateFormat(review.createdAt)}</div>
    </div>
  );
}
