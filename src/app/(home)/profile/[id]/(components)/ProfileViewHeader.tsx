/* eslint-disable @next/next/no-img-element */
'use client';

import { useAppDispatch } from '@/core/redux/clientStore';
import followApi from '@/modules/follow/followApi';
import { ProfileViewType } from '@/modules/profile/profileViewType';
import Link from 'next/link';
import { useState } from 'react';
// import ProfileSocial from './ProfileSocial';

interface ProfileHeaderProps {
  viewProfile: ProfileViewType;
}

const ProfileViewHeader = (props: ProfileHeaderProps) => {
  const dispatch = useAppDispatch();
  const [follow, setFollow] = useState(props.viewProfile.follow_status);
  const [followCount, setFollowCount] = useState(props.viewProfile.followers);

  const handleFollow = async () => {
    if (!follow) {
      setFollow(!follow);
      setFollowCount((prev) => prev + 1);
      try {
        if (props) {
          await Promise.resolve(
            dispatch(
              followApi.endpoints.follow.initiate({
                follow_user_id: props.viewProfile.id,
              })
            )
          );
        }
      } catch (error) {
        // Handle the error here
        console.error('Error occurred while following:', error);
      }
    } else {
      try {
        setFollow(!follow);
        setFollowCount((prev) => prev - 1);
        if (props) {
          await Promise.resolve(
            dispatch(
              followApi.endpoints.unfollow.initiate({
                unfollow_user_id: props.viewProfile.id,
              })
            )
          );
        }
      } catch (error) {
        // Handle the error here
        console.error('Error occurred while unfollowing:', error);
      }
    }
  };

  return (
    <div className="bg-white mb-5 drop-shadow-2xl">
      <div className="relative">
        <div className="flex justify-between items-center py-2 px-4 md:px-8 border-0 border-b border-gray-300">
          <h3 className="text-xl font-bold w-max text-slate-800 py-0 mb-0">
            {props.viewProfile?.name}
          </h3>
        </div>

        <div className="relative flex px-4 pb-4 md:px-8 pt-14">
          <div className="absolute h-2/4 bg-gradient-to-tr to-[#196da9] from-[#14b5b5] w-full top-0 left-0"></div>
          <div className="relative -translate-y-[20%] w-full basis-1/5 mr-4">
            <div className="w-max h-max border-solid border border-gray-300 rounded-full drop-shadow-2xl p-[3px]">
              <div className="w-[70px] md:w-[100px] h-[70px] md:h-[100px] rounded-full overflow-hidden">
                <img
                  src={
                    props.viewProfile?.profile_image &&
                    props.viewProfile?.profile_image != null
                      ? props.viewProfile.profile_image
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
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col sm:justify-evenly sm:mt-0 sm:h-full">
              <div className="justify-between w-full lg:w-1/2 text-gray-800 flex">
                <Link
                  href={{
                    pathname: `${props.viewProfile.id}/connections`,
                    query: {
                      activeTab: 'following',
                    },
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="text-xl md:text-xl font-bold leading-7 text-white relative z-0">
                    {props.viewProfile?.following}
                  </span>
                  <span className="text-sm md:text-base font-bold leading-7">
                    following
                  </span>
                </Link>
                <Link
                  href={{
                    pathname: `${props.viewProfile.id}/connections`,
                    query: {
                      activeTab: 'followers',
                    },
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="text-xl md:text-xl font-bold leading-7 text-white relative z-0">
                    {followCount}
                  </span>
                  <span className="text-sm md:text-base font-bold leading-7">
                    followers
                  </span>
                </Link>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xl md:text-xl font-bold leading-7 text-white relative z-0">
                    {props.viewProfile?.total_tracks}
                  </span>
                  <span className="text-sm md:text-base font-bold leading-7">
                    tracks
                  </span>
                </div>
              </div>
              <div className="flex mt-1">
                {follow ? (
                  <>
                    <button
                      onClick={handleFollow}
                      className="mr-1 last-of-type:mr-0 border border-red-300 bg-transparent py-1 px-3 text-xs md:px-6 md:text-base font-medium text-red-700 cursor-pointer hover:shadow-sm rounded-sm hover:bg-red-50 hover:text-red-900"
                    >
                      Unfollow
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleFollow}
                      className="mr-1 last-of-type:mr-0 border border-gray-300 bg-transparent py-1 px-3 text-xs md:px-6 md:text-base font-medium text-gray-700 cursor-pointer hover:shadow-sm rounded-sm hover:bg-slate-50 hover:text-gray-900"
                    >
                      Follow
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewHeader;
