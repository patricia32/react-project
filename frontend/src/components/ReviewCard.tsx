import type { Review } from '../types/Review';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import dateFormat from '../utils/dateFormat';
import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';
interface Props {
  review: Review;
}
export default function ReviewCard({ review }: Props) {
  const [longReview, setLongReview] = useState(true);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (review.text.length < 65) setLongReview(false);
  }, [review]);
  function toggleSeeMore() {
    setExpanded(!expanded);
  }
  return (
    <div className={`reviewCard ${expanded ? 'expandedCard' : ''}`}>
      <FormatQuoteIcon className="reviewCard__item " fontSize="large" />
      <div className="reviewCard__wrapper">
        <div
          className={
            expanded
              ? 'reviewCard__wrapper-expandedText'
              : 'reviewCard__wrapper-text'
          }
        >
          {review.text}
        </div>
        <div className="reviewCard__wrapper-seeMore">
          {longReview ? (
            expanded ? (
              <div onClick={toggleSeeMore}>See less</div>
            ) : (
              <div onClick={toggleSeeMore}>See more</div>
            )
          ) : (
            ''
          )}
        </div>
      </div>
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
