import SearchIcon from '@mui/icons-material/Search';

interface Props {
  searchInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ searchInput, handleChange }: Props) {
  return (
    <div className="search">
      <button className="search-button">
        <SearchIcon className="SearchIcon" />
      </button>
      <input
        type="text"
        value={searchInput}
        onChange={handleChange}
        className="search-input"
        placeholder="What are you looking for?"
      />
    </div>
  );
}
