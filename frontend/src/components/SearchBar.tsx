import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

interface Props {
  searchInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ searchInput, handleChange }: Props) {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowFirst(false);
      else setShowFirst(true);
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
    <div className={showFirst ? 'search' : 'searchUp'}>
      <button
        className={showFirst ? 'search__button' : 'searchUp__button'}
        onClick={handleClick}
      >
        <SearchIcon className="SearchIcon" />
      </button>
      {showFirst && (
        <input
          type="text"
          value={searchInput}
          onChange={handleChange}
          className="search-input"
          placeholder="What are you looking for?"
        />
      )}
    </div>
  );
}
