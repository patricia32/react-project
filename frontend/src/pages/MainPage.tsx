import { useState } from 'react';
import ProductsList from '../components/ProductsList';
import SearchBar from '../components/SearchBar';

export default function MainPage() {
  const [searchInput, setSearchInput] = useState('');
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  return (
    <div className="main">
      <SearchBar searchInput={searchInput} handleChange={handleChange} />
      <ProductsList searchInput={searchInput} />
    </div>
  );
}
