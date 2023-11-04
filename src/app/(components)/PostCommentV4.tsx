'use client';

import { apiPaths } from '@/core/api/apiConstants';
import { defaultWaveData } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { CommentDetailType } from '@/modules/comment/commentType';
import likeApi from '@/modules/liked/likeApi';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  DownloadSimple,
  PencilSimpleLine,
  Playlist,
  Share,
  ThumbsUp,
  TrashSimple,
} from 'phosphor-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentLikeList from './(popUpComponent)/CommentLikeList';
import PostDropdown, { ItemComponent } from './PostDropdown';
import WavePlayer from './WavePlayer';

interface PostCommentProps {
  commentData: CommentDetailType;
  postId: number;
}

export default function PostCommentV4(props: PostCommentProps) {
  const session = useSession();
  const dispatch = useAppDispatch();
  const commentLikedValue = props.commentData?.total_likes ?? '0';
  const convertedValue = parseInt(commentLikedValue); // Integer conversion
  const [totalLikedComment, setTotalLikedComment] = useState(convertedValue);
  const [likedComment, setLikedComment] = useState(props.commentData.my_like);
  const [isOpen, setIsOpen] = useState(false);
  const handleViewCommentLikes = (e: any) => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    document.body.style.overflow = 'hidden';
    e.stopPropagation();
  };
  const handleOnLikeViewClose = async () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    document.body.style.overflow = 'auto';
  };

  const playlist = useAppSelector(
    (state: RootState) => state.nowPlaying.playlist
  );

  const currentPlaylistIndex = useAppSelector(
    (state: RootState) => state.nowPlaying.currentPlaylistIndex
  );

  const isPlaying = useSelector(
    (state: RootState) => state.nowPlaying.isPlaying
  );

  const handleLikedComment = async () => {
    if (!likedComment) {
      if (props.commentData && props.commentData?.id) {
        setLikedComment(!likedComment);
        setTotalLikedComment((prev) => prev + 1);
        await Promise.resolve(
          dispatch(
            likeApi.endpoints.addLikedComment.initiate({
              comment_id: props.commentData.id,
              like: true,
            })
          )
        );
      }
    } else {
      if (props.commentData && props.commentData?.id) {
        setLikedComment(!likedComment);
        setTotalLikedComment((prev) => prev - 1);
        await Promise.resolve(
          dispatch(
            likeApi.endpoints.addLikedComment.initiate({
              comment_id: props.commentData.id,
              like: false,
            })
          )
        );
      }
    }
  };

  return (
    <>
      <div
        className={`px-4 py-4 flex border-0 border-gray-100 border-b last-of-type:border-b-0 transition-all duration-700 ease-in-out ${playlist &&
          playlist[currentPlaylistIndex]?.info?.cid === props.commentData.id &&
          isPlaying
          ? 'bg-blue-100 bg-opacity-[.1]'
          : 'bg-white bg-opacity-100'
          }`}
        id={`post-card-comment-id-${props.commentData.id}`}
      >
        <div className="w-max h-max border-solid border-2 border-gray-300 rounded-full p-[2px]">
          <div className="w-11 h-11 rounded-full overflow-hidden cursor-pointer">
            <Image
              width={100}
              height={100}
              src={
                props.commentData.owner?.profile_image &&
                  props.commentData.owner?.profile_image != null
                  ? props.commentData.owner?.profile_image
                  : '/images/avatar.jpg'
              }
              alt="comment_owner_avatar"
              onError={(e) => {
                (e.target as any).onError = null;
                (e.target as any).src = '/images/avatar.jpg';
              }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col ml-3">
          <div className="flex items-center">
            <div className="flex-col flex-1">
              <h3 className="flex items-center gap-4 text-base text-black font-medium leading-4">
                {props.commentData.owner.name}
                {playlist &&
                  playlist[currentPlaylistIndex]?.info?.cid ===
                  props.commentData.id &&
                  isPlaying ? (
                  <Image
                    alt="wave-icon"
                    src="/images/wave.gif"
                    width={10}
                    height={10}
                    className="w-6 h-6 object-contain"
                  />
                ) : null}
              </h3>
              <p className="text-sm text-primary-500 font-thin leading-4">
                {moment
                  .duration(props.commentData.time_duration, 'seconds')
                  .humanize() + ' ago'}
              </p>
            </div>
            <PostDropdown variant="dark">
              {session.data?.user?.id == props.commentData.owner.id ? (
                <ItemComponent
                  icon={<PencilSimpleLine size={16} />}
                  title="Edit"
                />
              ) : null}
              {session.data?.user?.id == props.commentData.owner.id ? (
                <ItemComponent
                  icon={<TrashSimple size={16} />}
                  title="Delete"
                />
              ) : null}
              <ItemComponent icon={<Share size={16} />} title="Share" />
              <ItemComponent
                icon={<DownloadSimple size={16} />}
                title="Download"
              />
            </PostDropdown>
          </div>
          {/* <TextWrapper
          text={props.commentData.comment}
          ellipsis={true}
          className="text-sm text-primary-900 font-base mt-2"
        /> */}
          <div className="py-2">
            <WavePlayer
              audioItem={{
                url:
                  apiPaths.baseUrl +
                  '/socialnetwork/audio/stream/' +
                  props.commentData.audio.id,
                duration: parseFloat(props.commentData.audio.file_duration),
                info: {
                  title: props.commentData.audio.title ?? '',
                  description: props.commentData.owner.name ?? '',
                  id: props.postId,
                  cid: props.commentData.id,
                },
              }}
              audioWaveData={
                props.commentData.audio.wave_data ??
                JSON.stringify(defaultWaveData)
              }
              size="small"
            />
          </div>
          <div className="flex gap-3 text-xs items-center">
            <button
              onClick={handleLikedComment}
              className="border-none bg-transparent"
            >
              {likedComment ? (
                <ThumbsUp size="24" color="black" weight="fill" />
              ) : (
                <ThumbsUp size="24" color="black" weight="regular" />
              )}
            </button>
            <div className="button">
              <Playlist size="24" color="black" weight="regular" />
            </div>
          </div>
          <div className="pt-2">
            <p
              className="text-sm text-primary-500 font-light cursor-pointer inline-block"
              onClick={handleViewCommentLikes}
            >
              {totalLikedComment > 0
                ? totalLikedComment > 1
                  ? totalLikedComment + ' likes'
                  : totalLikedComment + ' like'
                : null}
            </p>
          </div>
        </div>
      </div>
      {isOpen ? (
        <CommentLikeList
          onClose={handleOnLikeViewClose}
          commentId={props.commentData.id!}
        />
      ) : null}
    </>
  );
}
