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
      <div className="flex justify-between mx-4 items-center mb-4">
        <Link
          href={`/profile/${props.peopleData.id}`}
          className="flex items-center"
        >
          <div className="w-14 h-14">
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
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start ml-2">
            <div className="text-base text-center font-medium capitalize truncate">
              {props.peopleData.name}
            </div>
            <div className="text-sm text-dark-500 font-normal text-center">
              {followCount} Followers
            </div>
          </div>
        </Link>
        {follow ? (
          <>
            <button
              onClick={handleFollow}
              className="text-sm bg-accentRed/10 text-accentRed h-8 px-3 rounded-md"
            >
              Unfollow
            </button>
          </>
        ) : (
          <button
            onClick={handleFollow}
            className="text-sm bg-accentRed/10 text-accentRed h-8 px-3 rounded-md"
          >
            Follow
          </button>
        )}
      </div>
    </>
  );
}
