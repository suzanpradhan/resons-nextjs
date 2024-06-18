'use client';

import { useRouter } from 'next/navigation';
import { MagnifyingGlass } from 'phosphor-react';
import { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (searchTerm) {
      navigate.push(`/search/?text=${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-whiteShade w-full text-sm text-dark-500 h-10 font-normal pl-3 focus:outline-none"
            placeholder="Search"
          />
          <button
            type="submit"
            className="bg-accent text-sm text-white font-normal w-10 h-10 flex items-center justify-center"
          >
            <MagnifyingGlass size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
