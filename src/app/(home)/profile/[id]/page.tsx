'use client';

// import ProfileHeader from '../(components)/ProfileHeader';

import PostCardV2 from '@/app/(components)/PostCardV2';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import postApi from '@/modules/post/postApi';
import { PostDetailType } from '@/modules/post/postType';
import profileApi from '@/modules/profile/profileApi';
import { ProfileViewType } from '@/modules/profile/profileViewType';
import { useEffect } from 'react';
import ProfileViewHeader from './(components)/ProfileViewHeader';

export default function ViewProfilePage({
  params,
}: {
  params: { id: number };
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profileApi.endpoints.viewProfile.initiate(params.id));
  }, [dispatch, params.id]);

  const viewProfile = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`viewProfile("${params.id}")`]
        ?.data as ProfileViewType
  );

  useEffect(() => {
    dispatch(postApi.endpoints.getUserPostList.initiate(params.id));
  }, [dispatch, params.id]);

  const userPostListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getUserPostList`]?.data as PostDetailType[]
  );

  return (
    <div className="sm:container md:container lg:container mx-auto mb-20 sm:mb-0 md:px-4 min-h-screen">
      {viewProfile ? <ProfileViewHeader viewProfile={viewProfile} /> : <></>}
      {/* <PlayListScroll /> */}
      <div className="px-4 sm:px-0">
        {userPostListData?.length > 0 ? (
          <>
            {userPostListData?.map((post) => (
              <PostCardV2 key={post.id} postData={post} />
            ))}
          </>
        ) : (
          <div className="bg-white py-4 px-8 mb-32">
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
        )}
      </div>
    </div>
  );
}
