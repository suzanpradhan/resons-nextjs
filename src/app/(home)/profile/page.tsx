'use client';

import PostLoadingSkeleton from '@/app/(components)/(skeletons)/PostLoadingSkeleton';
import PostCardV4 from '@/app/(components)/PostCardV4';
import StoryList from '@/app/(components)/StoryList';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import postApi from '@/modules/post/postApi';
import { updatedCurrentPage } from '@/modules/post/postListingReducer';
import { PostDetailType } from '@/modules/post/postType';
import profileApi from '@/modules/profile/profileApi';
import { ProfileDetailType } from '@/modules/profile/profileType';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ProfileHeader from './(components)/ProfileHeader';
import Tabs from './(components)/Tabs';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [hasMoreData, setHasMoreData] = useState(true);
  const [activeTab, setActiveTab] = useState('Posts');
  const scrollableDivRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentPage = useAppSelector(
    (state: RootState) => state.postListing.currentPage
  );

  useEffect(() => {
    dispatch(profileApi.endpoints.getMyProfile.initiate());
  }, [dispatch]);

  const myProfile = useAppSelector((state: RootState) => {
    return state.baseApi.queries[`getMyProfile(undefined)`]
      ?.data as ProfileDetailType;
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleScroll = useCallback(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (
      scrollableDiv.scrollHeight - scrollableDiv.scrollTop <=
        scrollableDiv.clientHeight + 5000 &&
      !isLoading &&
      hasMoreData
    ) {
      setIsLoading(true);
      dispatch(updatedCurrentPage(currentPage + 1));
    }
  }, [isLoading, hasMoreData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log('rendering');

      const response = await dispatch(
        postApi.endpoints.getMyPostList.initiate(currentPage)
      );
      setIsLoading(false);
      if (response.data) {
        if (
          response.data!.pagination.currentPage >=
          response.data!.pagination.totalPages
        ) {
          setHasMoreData(false);
        }
      }
    };

    if (hasMoreData) {
      fetchData();
    }
  }, [dispatch, currentPage, hasMoreData]);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    scrollableDiv.addEventListener('scroll', handleScroll);
    return () => {
      scrollableDiv.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const myPostList = useAppSelector((state: RootState) => {
    return state.baseApi.queries[`getMyPostList`]
      ?.data as PaginatedResponseType<PostDetailType>;
  });

  return (
    <div className="sm:container md:container lg:container mx-auto mb-20 sm:mb-0 md:px-4">
      <div
        className="h-screen max-h-screen overflow-y-scroll"
        ref={scrollableDivRef}
      >
        {myProfile ? <ProfileHeader viewProfile={myProfile} /> : <></>}

        <div className="">
          <Tabs activeTab={activeTab} setTab={setActiveTab} />
          <div className="mb-24 flex gap-5 flex-col">
            {activeTab === 'Posts' ? (
              activeTab === 'Posts' && myPostList?.data != undefined ? (
                myPostList.data.length <= 0 ? (
                  <>
                    <div className="bg-transparent py-4 px-8 mb-10 text-center text-sm text-primary-500">
                      No more posts
                    </div>
                  </>
                ) : (
                  <>
                    {myPostList?.data?.map((post: PostDetailType) => (
                      <PostCardV4 key={post.id} post={post} />
                    ))}
                  </>
                )
              ) : (
                <PostLoadingSkeleton />
              )
            ) : (
              <></>
            )}

            {/* stories */}
            {activeTab === 'Stories' ? (
              activeTab === 'Stories' && myPostList?.data != undefined ? (
                myPostList.data.length <= 0 ? (
                  <>
                    <div className="bg-transparent py-4 px-8 mb-10 text-center text-sm text-primary-500">
                      No more posts
                    </div>
                  </>
                ) : (
                  <>{session.data?.user && <StoryList />}</>
                )
              ) : (
                <div className="bg-white py-4 px-8 mt-[60px]">
                  <div className="flex animate-pulse">
                    <div className="flex-shrink-0">
                      <span className="w-16 h-16 block bg-gray-300 rounded-full dark:bg-gray-300"></span>
                    </div>

                    <div className="ml-4 mt-2 w-full h-24">
                      <h3
                        className="h-4 bg-gray-300 rounded-md dark:bg-gray-300"
                        style={{ width: '40%' }}
                      ></h3>

                      <ul className="flex mr-1 mt-5">
                        <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                        <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                        <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                      </ul>

                      <ul className="flex mr-1 mt-5">
                        <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                        <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
