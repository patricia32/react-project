import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

interface Props {
  searchInput: string;
  handleChange: (e: string) => void;
}

export default function SearchBar({ searchInput, handleChange }: Props) {
  const [showLargeSearchBar, setShowLargeSearchBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowLargeSearchBar(false);
      else setShowLargeSearchBar(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <div className={showLargeSearchBar ? 'search' : 'searchUp'}>
      <button
        className={showLargeSearchBar ? 'search__button' : 'searchUp__button'}
        onClick={handleClick}
      >
        <SearchIcon className="SearchIcon" />
      </button>
      {showLargeSearchBar && (
        <input
          type="text"
          value={searchInput}
          onChange={(event) => {
            handleChange(event.target.value);
          }}
          className="search-input"
          placeholder="What are you looking for?"
        />
      )}
    </div>
  );
}
