/* eslint-disable @next/next/no-img-element */
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import notificationApi from '@/modules/notification/notificationApi';
import { PostDetailType } from '@/modules/post/postType';
import { ProfileDetailType } from '@/modules/profile/profileType';
import { MessageText1, More } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

interface NotificationCommentProps {
  id: string;
  post: PostDetailType | undefined;
  user: ProfileDetailType | undefined;
  createdAt: string;
  readAt: string | null;
}

const NotificationCardComment = (props: NotificationCommentProps) => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [isRead, setIsRead] = useState(props.readAt);
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
            String(session.data?.user?.id) === String(props.user?.id)
              ? '/profile'
              : `/profile/${props.user?.id}`
          }`}
          className="cursor-pointer"
        >
          <div className="w-[45px] h-auto sm:h-11 sm:w-11 overflow-hidden rounded-full hover:cursor-pointer">
            <img
              src={
                props.user?.profile_image && props.user?.profile_image != null
                  ? apiPaths.rootPath + '/storage/' + props.user?.profile_image
                  : '/images/avatar.jpg'
              }
              alt={`${props.user?.name} avatar`}
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
            href={`/post/${props.post?.id}`}
            className="cursor-pointer"
            onClick={handleMarkAsRead}
          >
            <h4 className="text-sm text-black font-bold">
              {props.user?.name}{' '}
              <span className="text-gray-400 font-normal">commented </span>
              <span className="text-gray-400 font-normal">
                on your track &quot;
              </span>
              <span className="text-gray-400 font-normal truncate hover:text-clip">
                {props.post?.title}
              </span>
              <span className="text-gray-400 font-normal">&quot;</span>
              {/* <span className="text-gray-400 font-normal">commented &quot;</span>
            <span className="text-gray-400 font-normal truncate hover:text-clip">
              nice song
            </span>
            <span className="text-gray-400 font-normal">
              &quot; on your track
            </span> */}
            </h4>
          </Link>
          <div className="flex items-center">
            <MessageText1 size="16" color="gray" variant="Bold" />{' '}
            <span className="text-gray-500 font-normal text-xs ml-1">
              {props.createdAt}
            </span>
          </div>
        </div>
      </div>
      <div className="basis-[40px] md:basis-[132px] w-full flex justify-end items-center h-7">
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

export default NotificationCardComment;
