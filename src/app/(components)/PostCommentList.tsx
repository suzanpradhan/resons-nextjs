/* eslint-disable @next/next/no-img-element */

import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import ShareButton from '@/core/ui/components/Share';
import { CommentDetailType } from '@/modules/comment/commentType';
import likeApi from '@/modules/liked/likeApi';
import { updateAudioData } from '@/modules/nowPlaying/nowPlayingReducer';
import { AddSquare, ArrowCircleDown2, Heart } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import WavePlayer from './WavePlayer';

export interface PostCommentProps {
  commentData: CommentDetailType;
  onSelectedComment: (commentData: CommentDetailType) => void;
}

export default function PostCommentList(props: PostCommentProps) {
  const session = useSession();
  const dispatch = useAppDispatch();
  const commentLikedValue = props.commentData?.total_likes ?? '0';
  const convertedValue = parseInt(commentLikedValue); // Integer conversion
  const [totalLikedComment, setTotalLikedComment] = useState(convertedValue);
  const [likedComment, setLikedComment] = useState(
    props.commentData && props.commentData?.my_like
      ? props.commentData.my_like
      : false
  );
  const handelPlaylistClick = (event: any) => {
    event.preventDefault();
    if (
      props.commentData.audio.id &&
      props.commentData.audio.id !== undefined
    ) {
      props.onSelectedComment(props.commentData);
    } else {
      toast.error('Something went wrong');
      return;
    }
  };

  const shareUrl = {
    title: props.commentData.comment,
    description: '',
    url: 'post/' + props.commentData.id,
  };

  const handleLikedComment = async () => {
    if (!likedComment) {
      if (props.commentData && props.commentData?.id) {
        setLikedComment(!likedComment);
        setTotalLikedComment((prev) => prev + 1);
        await Promise.resolve(
          dispatch(
            likeApi.endpoints.addLikedComment.initiate({
              post_comment_id: props.commentData.id,
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
              post_comment_id: props.commentData.id,
              like: false,
            })
          )
        );
      }
    }
  };

  const handleCommentAudioDownloadUrl = async () => {
    if (
      typeof window !== 'undefined' &&
      props.commentData?.audio?.id !== undefined
    ) {
      window
        .open(
          `${apiPaths.baseUrl + apiPaths.postAudioDownload}${
            props.commentData.audio.id
          }`,
          '_blank'
        )
        ?.focus();
    }
  };

  return (
    <div
      className="flex items-start md:pl-4 pb-2 pt-1"
      key={'comment_' + props.commentData.id}
    >
      <div className="w-[45px] h-[45px] border-solid border-2 border-gray-300 rounded-full p-[2px]">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img
            src={
              props.commentData.owner.profile_image &&
              props.commentData.owner.profile_image != null
                ? apiPaths.rootPath +
                  '/storage/' +
                  props.commentData.owner.profile_image
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

      <div className="flex flex-col justify-center basis-[calc(100%-35px)] w-full pl-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-dark-500 flex md:items-center flex-col md:flex-row">
            {props.commentData.owner.name}
            <span className="text-xs md:text-sm font-light text-gray-500 md:ml-2">
              {props.commentData.comment}
            </span>
          </h3>
        </div>

        <p className="text-xs font-normal text-gray-500">
          {props.commentData.created_at_human}
        </p>

        {props.commentData.audio && (
          <WavePlayer
            audioItem={{
              url:
                apiPaths.baseUrl +
                '/socialnetwork/audio/stream/' +
                props.commentData.audio.id,
              duration: props.commentData.audio.file_duration
                ? parseFloat(props.commentData.audio.file_duration)
                : 0,
              info: {
                title: props.commentData.comment,
                description: props.commentData.owner.name,
              },
            }}
            audioWaveData={props.commentData.audio.wave_data}
            onPlay={() => {
              dispatch(
                updateAudioData({
                  title: props.commentData.comment,
                  description: props.commentData.owner.name,
                })
              );
            }}
          />
        )}

        <div className="relative flex justify-between items-center py-1 my-1">
          <div className="flex items-center">
            <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
              <button
                onClick={handleLikedComment}
                className="border-none bg-transparent mr-1"
              >
                {likedComment ? (
                  <Heart size="21" color="#cf4a4a" variant="Bold" />
                ) : (
                  <Heart size="21" color="gray" />
                )}
              </button>
              <span className="text-xs font-bold">{totalLikedComment}</span>
            </div>

            <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
              <button
                onClick={handleCommentAudioDownloadUrl}
                className="border-none bg-transparent mr-1"
                title="download audio"
              >
                <ArrowCircleDown2 size="20" color="gray" />
              </button>
            </div>

            <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
              <ShareButton shareProps={shareUrl} />
            </div>

            {props.commentData?.audio.id !== undefined && (
              <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
                <button
                  onClick={handelPlaylistClick}
                  className="border-none bg-transparent"
                  title="Add to playlist"
                >
                  <AddSquare size={20} color="gray" />
                </button>
              </div>
            )}
          </div>

          <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
        </div>
      </div>
    </div>
  );
}
