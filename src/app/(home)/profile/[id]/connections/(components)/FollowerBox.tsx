'use client';
import { useAppDispatch } from '@/core/redux/clientStore';
import followApi from '@/modules/follow/followApi';
import { FollowerDetailType } from '@/modules/follower/followerType';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */
export interface FollowerCardProps {
  followerData: FollowerDetailType;
  profileId: number;
}

const FollowerBox = (props: FollowerCardProps) => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [follow, setFollow] = useState(props.followerData.follow_status);

  const handleUnFollow = async () => {
    try {
      if (props) {
        setFollow(!follow);
        await Promise.resolve(
          dispatch(
            followApi.endpoints.unfollow.initiate({
              unfollow_user_id: props.followerData.id,
            })
          )
        );
      }
    } catch (error) {
      setFollow(!follow);
      // Handle the error here
      console.error('Error occurred while unfollowing:', error);
    }
  };

  const handleFollow = async () => {
    try {
      if (props) {
        setFollow(!follow);
        await Promise.resolve(
          dispatch(
            followApi.endpoints.follow.initiate({
              follow_user_id: props.followerData.id,
            })
          )
        );
      }
    } catch (error) {
      setFollow(!follow);
      // Handle the error here
      console.error('Error occurred while following:', error);
    }
  };

  return (
    <>
      <div className="w-1/3 md:w-1/4 lg:w-1/6 p-4 ml-0">
        <div className="flex flex-col items-center last-of-type:mr-0">
          <Link
            href={{
              pathname: `/profile/${props.followerData.id}`,
            }}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-full shadow-sm rounded-full overflow-hidden drop-shadow-xl">
              <img
                src={
                  props.followerData.profile_image &&
                  props.followerData.profile_image != null
                    ? props.followerData.profile_image
                    : '/images/avatar.jpg'
                }
                alt="post_owner_avatar"
                onError={(e) => {
                  (e.target as any).onError = null;
                  (e.target as any).src = '/images/avatar.jpg';
                }}
                className="w-full h-full aspect-square object-cover"
              />
            </div>
            <h4 className="text-xs xs:text-base sm:text-lg w-max text-gray-800 font-bold py-0 mt-3 capitalize">
              {props.followerData?.name}
            </h4>
            <p className="text-sm text-gray-500 font-normal">
              {' '}
              {props.followerData.followers} followers
            </p>
          </Link>

          {follow ? (
            <>
              <button
                onClick={handleUnFollow}
                className="relative border border-red-300 bg-transparent py-1 px-3 mt-1 text-xs font-medium text-red-700 cursor-pointer hover:shadow-sm hover:bg-red-50 hover:text-red-900"
              >
                Following
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleFollow}
                className="relative border border-gray-300 bg-transparent py-1 px-3 mt-1 text-xs font-medium text-gray-700 cursor-pointer hover:shadow-sm hover:bg-slate-50 hover:text-gray-900"
              >
                {String(session.data?.user?.id) === String(props.profileId)
                  ? 'Follow Back'
                  : 'Follow'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FollowerBox;
