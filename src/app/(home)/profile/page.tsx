'use client';

import PostCardV4 from '@/app/(components)/PostCardV4';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import postApi from '@/modules/post/postApi';
import { PostDetailType } from '@/modules/post/postType';
import profileApi from '@/modules/profile/profileApi';
import { useEffect, useState } from 'react';
import ProfileHeader from './(components)/ProfileHeader';
import Tabs from './(components)/Tabs';

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profileApi.endpoints.getMyProfile.initiate());
    dispatch(postApi.endpoints.getMyPostList.initiate());
  }, [dispatch]);

  const myProfile = useAppSelector((state: RootState) => {
    return state.baseApi.queries[`getMyProfile(undefined)`]?.data as any;
  });

  const myPostList = useAppSelector((state: RootState) => {
    return state.baseApi.queries[`getMyPostList`]
      ?.data as PaginatedResponseType<PostDetailType>;
  });

  // Add state for managing the active tab
  const [activeTab, setActiveTab] = useState('Posts');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="sm:container md:container lg:container mx-auto mb-20 sm:mb-0 md:px-4">
      {myProfile ? <ProfileHeader viewProfile={myProfile} /> : <></>}

      <div className="px-4 md:px-0">
        {/* Render the Tabs component and pass the activeTab and handleTabChange as props */}
        <Tabs activeTab={activeTab} setTab={setActiveTab} />
        <div className="py-5">
          {activeTab === 'Posts' ? (
            activeTab === 'Posts' && myPostList?.data?.length > 0 ? (
              <>
                {myPostList?.data?.map((post: PostDetailType) => (
                  <PostCardV4 key={post.id} post={post} />
                ))}
              </>
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

          {activeTab === 'Stories' ? (
            activeTab === 'Stories' && myPostList?.data?.length > 0 ? (
              <>
                {myPostList?.data?.map((post: PostDetailType) => (
                  <PostCardV4 key={post.id} post={post} />
                ))}
              </>
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

      {/* <div className="px-4 md:px-0">
        <Tabs />
         {myPostList?.data?.length > 0 ? (
          <>
            {myPostList?.data?.map((post: PostDetailType) => (
              <PostCardV4 key={post.id} post={post} />
              // <ProfileWavePlayer key={post?.id} {...post} />
              // <PostCardV4 key={post?.id} {...post} />
            ))}
          </>
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
        )}
      </div> */}
    </div>
  );
}
