import Rating from '@mui/material/Rating';

export default function ReviewForm() {
  return (
    <div className="ReviewForm">
      Write you review
      <div className="ReviewForm__flex">
        <Rating className="ReviewForm__flex-rating" value={4} />
        <textarea></textarea>

        <button>Submit</button>
      </div>
    </div>
  );
}
