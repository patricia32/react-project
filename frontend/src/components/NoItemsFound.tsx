interface Props {
  searchInput: string;
}

export default function NoItemsFound({ searchInput }: Props) {
  return (
    <div className="container">
      <div className="body">
        <div className="nothingFound">
          No results for <strong>{searchInput}</strong>
        </div>
      </div>
    </div>
  );
}
