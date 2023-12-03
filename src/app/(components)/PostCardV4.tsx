/* eslint-disable @next/next/no-img-element */
import { PostDetailType } from '@/modules/post/postType';
import { useRouter } from 'next/navigation';
import { Record } from 'phosphor-react';
import PlayAllButton from './PlayAllButton';
import PostDetailV4 from './PostDetailV4';

import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import commentApi from '@/modules/comment/commentApi';
import { CommentDetailType } from '@/modules/comment/commentType';
import {
  addNewPlaylist,
  updateIsPlaying,
} from '@/modules/nowPlaying/nowPlayingReducer';
import { updateHomePage } from '@/modules/post/homePageReducer';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { ConnectedProps, connect } from 'react-redux';
import PostCommentV4 from './PostCommentV4';
interface PostCardProps extends PropsFromRedux {
  post: PostDetailType;
}

const PostCardV4 = (props: PostCardProps) => {
  moment.relativeTimeThreshold('s', 60);
  const navigator = useRouter();
  const dispatch = useAppDispatch();
  // const playlistId = useAppSelector(
  //   (state: RootState) => state.nowPlaying.playlistId
  // );
  // const isPlaying = useAppSelector(
  //   (state: RootState) => state.nowPlaying.isPlaying
  // );

  const handlePlayPauseAllComments = async () => {
    if (
      props.playlistId &&
      props.post?.id &&
      props.playlistId == props.post.id.toString()
    ) {
      if (props.isPlaying) {
        props.updateIsPlaying(false);
      } else {
        props.updateIsPlaying(true);
      }
      return;
    }
    var comments = await Promise.resolve(
      dispatch(
        commentApi.endpoints.getAllCommentsForAudio.initiate({
          postId: props.post.id!,
          page: 10,
        })
      )
    );

    if (comments.data) {
      var commentAudios = (comments.data! as CommentDetailType[]).map(
        (comment) => {
          return {
            url:
              apiPaths.baseUrl +
              '/socialnetwork/audio/stream/' +
              comment.audio.id +
              '?isPostAudio=NO'!,
            duration: comment.audio.file_duration
              ? parseFloat(comment.audio.file_duration)
              : 0,
            info: {
              title: comment.comment,
              description: comment.owner.name,
              cid: comment.id,
              id: props.post.id,
            },
          };
        }
      );
      props.addNewPlaylist({
        id: props.post.id?.toString(),
        playlist: [
          {
            url:
              apiPaths.baseUrl +
              '/socialnetwork/audio/stream/' +
              props.post.audio?.id +
              '?isPostAudio=YES',
            duration: props.post.audio.file_duration
              ? parseFloat(props.post.audio.file_duration)
              : 0,
            info: {
              title: props.post.title,
              description: props.post.owner.name,
              id: props.post.id,
            },
          },
          ...commentAudios,
        ],
        totalDuration: props.post.total_duration,
      });
    }
  };

  const list = {
    inActive: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 1 },
        y: { ease: 'easeInOut', duration: 0.6 },
      },
    },
    active: {
      opacity: 0,
      y: 30,
      transition: {
        opacity: { duration: 1 },
        y: { ease: 'easeInOut', duration: 0.6 },
      },
    },
  };

  function secondsToString(seconds: number) {
    var round = Math.round(seconds);
    var numMinutes = Math.floor((((round % 31536000) % 86400) % 3600) / 60);
    var numSeconds = (((round % 31536000) % 86400) % 3600) % 60;
    return numMinutes + `.${numSeconds}` + ' minutes';
  }

  // function getRandomNumber() {
  //   const min = 10;
  //   const max = 30;
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // // Example usage:
  // const randomNumber = {
  //   marginBottom: getRandomNumber() + 'px',
  // };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={list}
        initial="active"
        animate="inActive"
        className="max-w-3xl w-full shadow-slate-400 shadow-md"
        // style={randomNumber}
        id={`post-card-with-id-${props.post.id}`}
      >
        <PostDetailV4
          post={props.post}
          onWhiteSpaceClick={() => {
            dispatch(updateHomePage({ page: 2, id: props.post.id }));
            // navigator.push(`/post/${props.post.id}`);
          }}
        />
        {props.post.comments && props.post.comments.length > 0 ? (
          <PostCommentV4
            commentData={props.post.comments[0]}
            postId={props.post.id!}
          />
        ) : null}
        {props.post.comments && props.post.comments.length > 0 ? (
          <PlayAllButton
            totalComment={props.post.total_comments}
            totalTime={secondsToString(props.post.total_duration)}
            postId={props.post.id}
            onClick={() => {
              handlePlayPauseAllComments();
            }}
          />
        ) : null}
        <div className="p-4 bg-white flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <Image
              width={100}
              height={100}
              src="/profile-pic.jpg"
              alt="profile-image"
              className="w-full h-full aspect-auto object-cover"
            />
          </div>
          <div className="bg-grey-100 h-11 py-1 text-sm text-primary-500 rounded-lg flex-1 flex gap-2 items-center p-2">
            <Record size="26" className="text-accent" weight="fill" />
            Record or share your comment
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isPlaying: state.nowPlaying.isPlaying,
    playlistId: state.nowPlaying.playlistId,
  };
};

const mapDispatchToProps = {
  updateIsPlaying,
  addNewPlaylist,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PostCardV4);
