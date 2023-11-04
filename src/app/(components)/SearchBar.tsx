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
    <div className="rounded-sm overflow-hidden hidden md:block">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-grey-200 w-full text-sm text-primary-500 font-normal py-2 pl-3 focus:outline-none"
            placeholder="Search audio here..."
          />
          <button
            type="submit"
            className="bg-gray-700 text-sm text-white font-normal px-2 py-2"
          >
            <MagnifyingGlass size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
