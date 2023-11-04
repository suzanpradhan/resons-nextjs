/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import followApi from '@/modules/follow/followApi';
import { FollowDetailType } from '@/modules/follow/followType';
import followerApi from '@/modules/follower/followerApi';
import { FollowerDetailType } from '@/modules/follower/followerType';
import profileApi from '@/modules/profile/profileApi';
import { ProfileViewType } from '@/modules/profile/profileViewType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FollowBox from './(components)/FollowBox';
import FollowerBox from './(components)/FollowerBox';

export default function ViewProfilePage({
  params,
}: {
  params: { id: number };
}) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams?.get('activeTab') ?? 'following'
  );

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    dispatch(profileApi.endpoints.viewProfile.initiate(params.id));
  }, [dispatch, params.id]);

  const viewProfile = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`viewProfile("${params.id}")`]
        ?.data as ProfileViewType
  );

  useEffect(() => {
    dispatch(followApi.endpoints.getFollow.initiate(params.id));
  }, [dispatch, params.id]);

  const getFollow = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getFollow`]?.data as FollowDetailType[]
  );

  useEffect(() => {
    dispatch(followerApi.endpoints.getFollower.initiate(params.id));
  }, [dispatch, params.id]);

  const getFollower = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getFollower`]?.data as FollowerDetailType[]
  );

  return (
    <div className="sm:container md:container lg:container mx-auto min-h-screen">
      <div className="flex flex-col py-4 px-5 bg-white mb-20">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={
                viewProfile?.profile_image && viewProfile?.profile_image != null
                  ? viewProfile?.profile_image
                  : '/images/avatar.jpg'
              }
              alt="post_owner_avatar"
              onError={(e) => {
                (e.target as any).onError = null;
                (e.target as any).src = '/images/avatar.jpg';
              }}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <h1 className="xs:text-base sm:text-md sm:font-bold md:text-2xl text-gray-800 ml-3">
            {viewProfile?.name} is following
          </h1>
        </div>

        <div className="mb-4 border-b border-gray-200">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'following'
                    ? 'border-red-500'
                    : 'border-transparent'
                }`}
                id="following-tab"
                type="button"
                role="tab"
                aria-controls="following"
                aria-selected={activeTab === 'following'}
                onClick={() => handleTabClick('following')}
              >
                Following
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'followers'
                    ? 'border-red-500'
                    : 'border-transparent'
                }`}
                id="followers-tab"
                type="button"
                role="tab"
                aria-controls="followers"
                aria-selected={activeTab === 'followers'}
                onClick={() => handleTabClick('followers')}
              >
                Followers
              </button>
            </li>
          </ul>
        </div>

        <div id="myTabContent">
          <div
            className={`p-2 rounded-lg ${
              activeTab === 'following'
                ? 'bg-gray-50 text-sm text-gray-800'
                : 'hidden'
            }`}
            id="following"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="flex items-center flex-wrap">
              {getFollow?.length > 0 ? (
                <>
                  {getFollow?.map((follow) => (
                    <FollowBox
                      key={follow.id}
                      followData={follow}
                      profileId={params.id}
                    />
                  ))}
                </>
              ) : (
                <p>No Following.</p>
              )}
            </div>
          </div>
          {/* tab end */}
          <div
            className={`p-2 rounded-lg ${
              activeTab === 'followers'
                ? 'bg-gray-50 text-sm text-gray-800'
                : 'hidden'
            }`}
            id="followers"
            role="tabpanel"
            aria-labelledby="followers-tab"
          >
            <div className="flex items-center flex-wrap">
              {getFollower?.length > 0 ? (
                <>
                  {getFollower?.map((follower) => (
                    <FollowerBox
                      key={follower.id}
                      followerData={follower}
                      profileId={params.id}
                    />
                  ))}
                </>
              ) : (
                <p>No Follower.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
