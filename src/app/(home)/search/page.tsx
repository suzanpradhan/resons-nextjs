'use client';

import PostCardV2 from '@/app/(components)/PostCardV2';
import SearchBar from '@/app/(components)/SearchBar';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import postApi from '@/modules/post/postApi';
import { SearchDetailType } from '@/modules/post/postType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ProfileCard from './(components)/ProfileCard';

const SearchPostsPage = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const searchText = searchParams?.get('text');
  const [searchType, setSearchType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);
  // const [searchText, setSearchText] = useState(
  //   params.searchText && params.searchText.length > 0
  //     ? params.searchText[0]
  //     : ''
  // );

  useEffect(() => {
    dispatch(
      postApi.endpoints.searchPosts.initiate({
        searchValue: searchText ?? '',
        searchType: searchType ?? '',
      })
    );
  }, [dispatch, searchText, searchType]);

  const searchListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`searchPosts`]?.data as SearchDetailType
  );

  const handelTypeChange = (event: any) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const attributeValue = event.target.getAttribute('tab-name');
    setSearchType(attributeValue);
    setIsLoading(false);
  };

  return (
    <div className="sm:container md:container lg:container mx-auto min-h-screen">
      <div className="px-3 sm:px-0 py-2 md:hidden">
        <SearchBar />
      </div>
      <div className="px-3 my-4 sm:px-0">
        <h4 className="font-bold">
          Search Results for:{' '}
          <span className=" text-accentRed">{searchText}</span>
        </h4>

        <div className="flex gap-3 mt-4">
          <span
            onClick={handelTypeChange}
            tab-name=""
            className={`${
              searchType === ''
                ? 'bg-accentRed text-white border border-red-500 hover:bg-red-400'
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-200'
            } py-1 px-4 rounded-2xl text-base font-bold shadow-lg cursor-pointer `}
          >
            All
          </span>
          <span
            onClick={handelTypeChange}
            tab-name="post"
            className={`${
              searchType === 'post'
                ? 'bg-accentRed text-white border border-red-500 hover:bg-red-400'
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-200'
            } py-1 px-4 rounded-2xl text-base font-bold shadow-lg cursor-pointer `}
          >
            Posts
          </span>
          <span
            onClick={handelTypeChange}
            tab-name="people"
            className={`${
              searchType === 'people'
                ? 'bg-accentRed text-white border border-red-500 hover:bg-red-400'
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-200'
            } py-1 px-4 rounded-2xl text-base font-bold shadow-lg cursor-pointer `}
          >
            People
          </span>
        </div>
      </div>

      <div className="flex px-3 sm:px-0">
        <div className="flex flex-col basis-[100%] w-full">
          {searchListData ? (
            <>
              {/* Render the "posts" if it exists */}
              {searchType === '' || searchType === 'post' ? (
                searchListData.posts && searchListData.posts.length > 0 ? (
                  searchListData.posts.map((post, index) => (
                    <PostCardV2 key={index} postData={post} />
                  ))
                ) : (
                  <>
                    <div className="bg-white py-4 px-8 my-5">
                      <div className="flex animate-pulse">
                        <div className="flex-shrink-0">
                          <span className="w-12 h-12 block bg-gray-300 rounded-full dark:bg-gray-300"></span>
                        </div>
                        <div className="ml-4 mt-2 w-full">
                          <h3
                            className="h-4 bg-gray-300 rounded-md dark:bg-gray-300"
                            style={{ width: '40%' }}
                          ></h3>
                          <ul className="mt-5 space-y-3">
                            <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                            <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                            <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                            <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : null}
              {searchType === '' || searchType === 'people' ? (
                searchListData.people && searchListData.people.length > 0 ? (
                  <>
                    <div className="flex flex-col mb-4 px-4 py-4 bg-white">
                      <h3 className="text-lg text-gray-800 font-bold mb-4 pb-2 capitalize border border-solid border-gray-300 border-t-0 border-l-0 border-r-0">
                        Searched People
                      </h3>
                      <div className="flex gap-5 flex-wrap">
                        {searchListData.people.map((peop, index) => (
                          <ProfileCard key={index} peopleData={peop} />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white py-4 px-8 my-5">
                      <div className="flex animate-pulse">
                        <div className="flex-shrink-0">
                          <span className="w-12 h-12 block bg-gray-300 rounded-full dark:bg-gray-300"></span>
                        </div>
                        <div className="ml-4 mt-2 w-full">
                          <h3
                            className="h-4 bg-gray-300 rounded-md dark:bg-gray-300"
                            style={{ width: '40%' }}
                          ></h3>
                          <ul className="mt-5 space-y-3">
                            <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                            <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                            <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                            <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : null}
            </>
          ) : (
            <>
              <div className="bg-white py-4 px-8 my-5">
                <div className="flex animate-pulse">
                  <div className="flex-shrink-0">
                    <span className="w-12 h-12 block bg-gray-300 rounded-full dark:bg-gray-300"></span>
                  </div>
                  <div className="ml-4 mt-2 w-full">
                    <h3
                      className="h-4 bg-gray-300 rounded-md dark:bg-gray-300"
                      style={{ width: '40%' }}
                    ></h3>
                    <ul className="mt-5 space-y-3">
                      <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                      <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                      <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                      <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPostsPage;
