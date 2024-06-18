'use client';

import { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SearchPageComponent from './(components)/SearchPageComponent';

function SearchBarFallback() {
  return <>placeholder</>;
}

const SearchPostsPage = () => {
  return (
    <>
      <Suspense fallback={<SearchBarFallback />}>
        <SearchPageComponent />
      </Suspense>
    </>
  );
};

export default SearchPostsPage;
