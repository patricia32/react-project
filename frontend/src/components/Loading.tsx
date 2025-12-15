interface Props {
  displayedText: string;
}
export default function Loading({ displayedText }: Props) {
  return (
    <div className="main">
      <div className="container">
        <div className="body">
          <div className="nothingFound"> {displayedText}</div>
        </div>
      </div>
    </div>
  );
}
