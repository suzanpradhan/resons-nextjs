/* eslint-disable @next/next/no-img-element */
'use client';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import notificationApi from '@/modules/notification/notificationApi';
import { ProfileDetailType } from '@/modules/profile/profileType';
import { More, Profile2User } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

interface NotificationFollowProps {
  id: string;
  follower: ProfileDetailType;
  createdAt: string;
  readAt: string | null;
}

const NotificationCardFollow = (props: NotificationFollowProps) => {
  const dispatch = useAppDispatch();
  const session = useSession();
  // const [follow, setFollow] = useState(props.follower?.follow_status);
  const [isRead, setIsRead] = useState(props.readAt);

  // const handleFollow = async () => {
  //   if (!follow) {
  //     setFollow(!follow);
  //     try {
  //       if (props) {
  //         await Promise.resolve(
  //           dispatch(
  //             followApi.endpoints.follow.initiate({
  //               follow_user_id: props.follower.id,
  //             })
  //           )
  //         );
  //       }
  //     } catch (error) {
  //       // Handle the error here
  //       console.error('Error occurred while following:', error);
  //     }
  //   } else {
  //     try {
  //       setFollow(!follow);
  //       if (props) {
  //         await Promise.resolve(
  //           dispatch(
  //             followApi.endpoints.unfollow.initiate({
  //               unfollow_user_id: props.follower.id,
  //             })
  //           )
  //         );
  //       }
  //     } catch (error) {
  //       // Handle the error here
  //       console.error('Error occurred while unfollowing:', error);
  //     }
  //   }
  // };

  const handleMarkAsRead = async () => {
    try {
      if (props) {
        await Promise.resolve(
          dispatch(notificationApi.endpoints.markAsRead.initiate(props.id))
        );
        setIsRead('marked');
      }
    } catch (error) {
      // Handle the error here
      setIsRead(null);
      console.error('Error occurred:', error);
    }
  };

  console.log(props.id);

  return (
    <div
      className={`flex justify-between items-center px-5 py-3 ${
        isRead === null ? 'bg-[#f3f3f3]' : ''
      }`}
    >
      <div className="flex items-start md:items-center md:basis-4/5 w-full">
        {/* profile img */}
        <Link
          href={`${
            String(session.data?.user?.id) === String(props.follower?.id)
              ? '/profile'
              : `/profile/${props.follower.id}`
          }`}
          className="cursor-pointer"
        >
          <div className="w-[45px] h-auto sm:h-11 sm:w-11 overflow-hidden rounded-full hover:cursor-pointer">
            <img
              src={
                props.follower?.profile_image &&
                props.follower?.profile_image != null
                  ? apiPaths.rootPath +
                    '/storage/' +
                    props.follower?.profile_image
                  : '/images/avatar.jpg'
              }
              alt={`${props.follower?.name} avatar`}
              onError={(e) => {
                (e.target as any).onError = null;
                (e.target as any).src = '/images/avatar.jpg';
              }}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        {/* user detail */}
        <div className="flex flex-col ml-3 justify-around basis-[250px] sm:basis-auto">
          <Link
            href={`${
              String(session.data?.user?.id) === String(props.follower?.id)
                ? '/profile'
                : `/profile/${props.follower.id}`
            }`}
            className="cursor-pointer"
            onClick={handleMarkAsRead}
          >
            <h4 className="text-sm text-black font-bold">
              {props.follower?.name}{' '}
              <span className="text-gray-400 font-normal">
                started following you
              </span>
            </h4>
            <div className="flex items-center">
              <Profile2User size="16" color="gray" variant="Bold" />{' '}
              <span className="text-gray-500 font-normal text-xs ml-1">
                {props.createdAt}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="basis-[80px] md:basis-[132px] w-full flex justify-end items-center h-7">
        {/* {follow ? (
          <>
            <button
              onClick={handleFollow}
              className="hidden lg:flex justify-evenly items-center py-[.151rem] px-[.5rem] border-solid border-[1px] text-[.8rem] border-red-400 bg-red-100 text-red-500 leading-[25px] mr-1"
            >
              <UserTick size="18" color="#b00000" variant="TwoTone" /> &nbsp;
              Unfollow
            </button>
            <button className="lg:hidden p-1 border-solid rounded-md border-[1px] border-red-400 bg-red-100 leading-[25px] mr-1">
              <UserTick size="18" color="#b00000" variant="TwoTone" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleFollow}
              className="hidden lg:flex justify-evenly items-center py-[.151rem] px-[.5rem] border-solid border-[1px] text-[.8rem] border-gray-300 bg-white text-gray-600 leading-[25px] mr-1"
            >
              <UserAdd size="18" color="#333" variant="TwoTone" /> &nbsp; Follow
              Back
            </button>
            <button className="lg:hidden p-1 border-solid rounded-md border-[1px] border-gray-300 bg-white leading-[25px] mr-1">
              <UserAdd size="18" color="#333" variant="TwoTone" />
            </button>
          </>
        )} */}
        {isRead == null ? (
          <div className="flex items-center self-stretch relative group">
            <More size="18" className="text-dark-500" variant="Outline" />
            <div
              onClick={handleMarkAsRead}
              className="hidden group-hover:flex absolute bottom-0 right-0 top-0 bg-red-200 border-red-300 border w-max px-3 text-xs font-normal text-red-500 items-center cursor-pointer"
            >
              <div>mark as read</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NotificationCardFollow;
