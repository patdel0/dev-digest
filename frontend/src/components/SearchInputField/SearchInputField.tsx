import React, { useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'

export interface SearchInputFieldProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="w-[400px] relative">
      <input
        className='w-full p-4 rounded-full bg-slate-200'
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button
        data-testid="search-button"
        className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-300 rounded-full hover:bg-slate-400'
        onClick={handleSearch}
      >
        <AiOutlineSearch />
      </button>


    </div>
  );
};

export default SearchInputField;
