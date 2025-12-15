import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { submitReview } from '../api/products';
import type { Review } from '../types/Review';

interface Props {
  productId: string | undefined;
  setError: (error: boolean) => void;
  onReviewSubmit: (newReview: Review) => void;
}
export default function ReviewForm({
  productId,
  setError,
  onReviewSubmit,
}: Props) {
  const [fieldsError, setFieldsError] = useState<string>('');
  const [reviewData, setReviewData] = useState({
    ratingValue: 0,
    textReview: '',
  });

  function handleChangeRating(
    _: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) {
    setReviewData((prev) => ({
      ...prev,
      ratingValue: newValue!,
    }));
    setFieldsError('');
  }

  function handleChangeText(textInput: string) {
    setReviewData((prev) => ({
      ...prev,
      textReview: textInput,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!reviewData.textReview) {
      setFieldsError('Please write something.');
      return;
    }
    if (!reviewData.ratingValue) {
      setFieldsError('Please select a rating.');
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
      setFieldsError('');
    } catch (err: any) {
      console.log('ew');
      setFieldsError(err.message || 'Something went wrong');
      setError(true);
    }
  }

  return (
    <div className="reviewForm">
      Write your thoughts
      <form onSubmit={handleSubmit} className="reviewForm__flex">
        <Rating
          onChange={handleChangeRating}
          className="reviewForm__flex-rating"
          value={reviewData.ratingValue}
        />
        {(reviewData.ratingValue === 0 || reviewData.ratingValue === null) &&
          fieldsError && (
            <p className="reviewForm__flex-error">Please select a rating.</p>
          )}
        <textarea
          name="textReview"
          placeholder="Write something"
          onChange={(event) => {
            handleChangeText(event.target.value);
          }}
          value={reviewData.textReview}
        ></textarea>
        {reviewData.textReview === '' && fieldsError && (
          <p className="reviewForm__flex-error">Please write something.</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
