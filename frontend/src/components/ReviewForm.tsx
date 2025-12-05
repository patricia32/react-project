import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { submitReview } from '../api/products';
import type { Review } from '../types/Review';

interface Props {
  productId: string | undefined;
  onReviewSubmit: (newReview: Review) => void;
}
export default function ReviewForm({ productId, onReviewSubmit }: Props) {
  const [error, setError] = useState<string>('');
  const [reviewData, setReviewData] = useState({
    ratingValue: 0,
    textReview: '',
  });

  function handleChangeRating(
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) {
    setReviewData((prev) => ({
      ...prev,
      ratingValue: newValue!,
    }));
    setError('');
  }

  function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setReviewData((prev) => ({
      ...prev,
      textReview: event.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!reviewData.textReview) {
      setError('Please write something.');
      return;
    }
    if (!reviewData.ratingValue) {
      setError('Please select a rating.');
      return;
    }
    try {
      const updatedProduct = await submitReview(
        productId!,
        reviewData.textReview,
        reviewData.ratingValue,
      );

      if (onReviewSubmit) {
        const newReview = updatedProduct.product.reviews.at(-1); // the last one
        if (newReview) onReviewSubmit(newReview);
      }

      setReviewData({ ratingValue: 0, textReview: '' });
      setError('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  }
  return (
    <div className="ReviewForm">
      Write your thoughts
      <form onSubmit={handleSubmit} className="ReviewForm__flex">
        <Rating
          onChange={handleChangeRating}
          className="ReviewForm__flex-rating"
          value={reviewData.ratingValue}
        />
        {(reviewData.ratingValue === 0 || reviewData.ratingValue === null) &&
          error && (
            <p className="ReviewForm__flex-error">Please select a rating.</p>
          )}
        <textarea
          placeholder="Write something"
          onChange={handleChangeText}
          value={reviewData.textReview}
        ></textarea>
        {reviewData.textReview === '' && error && (
          <p className="ReviewForm__flex-error">Please write something.</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
