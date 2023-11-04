/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import followApi from '@/modules/follow/followApi';
import { ProfileDetailType } from '@/modules/profile/profileType';
import Link from 'next/link';
import { useState } from 'react';

export interface PeopleDataType {
  peopleData: ProfileDetailType;
}

export default function ProfileCard(props: PeopleDataType) {
  const dispatch = useAppDispatch();
  const [follow, setFollow] = useState(props.peopleData.follow_status);
  const [followCount, setFollowCount] = useState(props.peopleData.followers);

  const handleFollow = async () => {
    if (!follow) {
      setFollow(!follow);
      setFollowCount((prev) => prev + 1);
      try {
        if (props) {
          await Promise.resolve(
            dispatch(
              followApi.endpoints.follow.initiate({
                follow_user_id: props.peopleData.id,
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
                unfollow_user_id: props.peopleData.id,
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
    <>
      <div className="flex flex-col items-center basis-auto sm:basis-32 md:basis-40 w-[45%] sm:w-full">
        <Link href={`/profile/${props.peopleData.id}`} className="">
          <div className="w-full rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={
                props.peopleData?.profile_image &&
                props.peopleData?.profile_image != null
                  ? apiPaths.rootPath +
                    '/storage/' +
                    props.peopleData.profile_image
                  : '/images/avatar.jpg'
              }
              alt="post_owner_avatar"
              onError={(e) => {
                (e.target as any).onError = null;
                (e.target as any).src = '/images/avatar.jpg';
              }}
              className="w-full h-auto aspect-square object-cover"
            />
          </div>
          <h4 className="text-base w-full text-center text-gray-800 font-bold py-0 mt-3 capitalize truncate">
            {props.peopleData.name}
          </h4>
          <p className="text-sm text-gray-500 font-normal text-center">
            {followCount} Followers
          </p>
        </Link>
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
    </>
  );
}
