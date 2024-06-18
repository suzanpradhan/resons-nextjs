import PostCardMin from '@/app/(components)/PostCardMin';
import SearchBar from '@/app/(components)/SearchBar';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import postApi from '@/modules/post/postApi';
import { SearchDetailType } from '@/modules/post/postType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';

const SearchPageComponent = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const searchText = searchParams?.get('text');
  const [searchType, setSearchType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    dispatch(
      postApi.endpoints.searchPosts.initiate({
        searchValue: searchText ?? '',
        searchType: searchType ?? '',
      })
    );
  }, [dispatch, searchText, searchType]);

  const currentPage = useAppSelector(
    (state: RootState) => state.homepage.currentPage
  );

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
    <div className="w-full h-screen max-h-screen pb-16 overflow-scroll bg-white">
      <div className="pt-14"></div>
      <div className="mx-4 bg-white">
        <SearchBar />
      </div>
      <div className="mx-4 my-4 bg-white">
        <h4 className="font-normal">
          Search Results for:{' '}
          <span className="text-accentRed">{searchText}</span>
        </h4>

        <div className="flex gap-3 mt-4">
          <span
            onClick={handelTypeChange}
            tab-name=""
            className={`${
              searchType === ''
                ? 'bg-accentRed text-white border border-red-500 hover:bg-red-400'
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-200'
            } py-1 px-4 rounded-md text-base font-medium cursor-pointer`}
          >
            All
          </span>
          <span
            onClick={handelTypeChange}
            tab-name="posts"
            className={`${
              searchType === 'posts'
                ? 'bg-accentRed text-white border border-red-500 hover:bg-red-400'
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-200'
            } py-1 px-4 rounded-md text-base font-medium cursor-pointer`}
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
            } py-1 px-4 rounded-md text-base font-medium cursor-pointer`}
          >
            People
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full gap-4">
          {searchListData ? (
            <>
              {searchType === '' || searchType === 'posts' ? (
                <div>
                  <div className="flex justify-between items-start text-gray-800 h-9 mx-4">
                    <div className="text-base font-medium">Popular Posts</div>
                    {/* <div className="text-sm h-full">see all</div> */}
                  </div>
                  {searchListData.posts &&
                  searchListData.posts.data.length > 0 ? (
                    searchListData.posts.data.map((post, index) => (
                      // <PostCardV4 key={`post_detail_${index}`} post={post} />
                      <PostCardMin
                        post={post}
                        key={`post_detail_${index}`}
                        currentPage={currentPage}
                      />
                    ))
                  ) : (
                    <>
                      <div className="flex justify-center text-sm text-primaryGray-500">
                        No results
                      </div>
                      {/* <div className="bg-white py-4 px-4 my-5">
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
                      </div> */}
                    </>
                  )}
                </div>
              ) : null}
              {searchType === '' || searchType === 'people' ? (
                <div>
                  <div className="flex justify-between items-start text-gray-800 h-9 mx-4">
                    <div className="text-base font-medium">People</div>
                    {/* <div className="text-sm h-full">see all</div> */}
                  </div>
                  {searchListData.people &&
                  searchListData.people.data.length > 0 ? (
                    <>
                      {searchListData.people.data.map((peop, index) => (
                        <ProfileCard key={index} peopleData={peop} />
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center text-sm text-primaryGray-500">
                        No results
                      </div>
                      {/* <div className="bg-white py-4 px-4 my-5">
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
                      </div> */}
                    </>
                  )}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="bg-white py-4 px-4 my-5">
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

export default SearchPageComponent;
