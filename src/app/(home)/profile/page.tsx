'use client';

import ProfileWavePlayer from '@/app/(components)/ProfileWavePlayer';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PostDetailType } from '@/modules/post/postType';
import profileApi from '@/modules/profile/profileApi';
import { useEffect } from 'react';
import ProfileHeader from './(components)/ProfileHeader';

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profileApi.endpoints.getMyProfileData.initiate('?load=true'));
  }, [dispatch]);

  const myProfile = useAppSelector((state: RootState) => {
    return state.baseApi.queries[`getMyProfileData("?load=true")`]?.data as any;
  });

  console.log(myProfile?.posts?.length);

  return (
    <div className="sm:container md:container lg:container mx-auto  flex flex-col h-full">
      <div className="overflow-y-scroll pb-16 md:pb-0">
        {myProfile ? <ProfileHeader viewProfile={myProfile} /> : <></>}
        <div className="px-4 md:px-0">
          {myProfile?.posts?.data?.length > 0 ? (
            <>
              {myProfile?.posts?.data?.map((post: PostDetailType) => (
                // <PostCardV4 key={post.id} post={post} />
                <ProfileWavePlayer key={post?.id} {...post} />
              ))}
              {myProfile?.posts?.data?.map((post: PostDetailType) => (
                // <PostCardV4 key={post.id} post={post} />
                <ProfileWavePlayer key={post?.id} {...post} />
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
        </div>
      </div>
    </div>
  );
}
