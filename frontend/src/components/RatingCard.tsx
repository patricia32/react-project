import { Rating } from '@mui/material';

interface Props {
  reviewsNo: number;
  avg: number;
}
export default function RatingCard({ reviewsNo, avg }: Props) {
  return (
    <div className="ratingCard">
      {reviewsNo ? (
        <>
          <div className="ratingCard-avg">{avg.toFixed(1)}</div>
          <Rating
            value={avg}
            readOnly
            className="ratingCard-stars"
            precision={0.5}
          />
          <div>{reviewsNo} Ratings</div>
        </>
      ) : (
        <>No reviews yet</>
      )}
    </div>
  );
}
