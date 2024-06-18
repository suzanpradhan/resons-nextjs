import { apiPaths } from '@/core/api/apiConstants';
import { defaultWaveData } from '@/core/constants/appConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { updateHomePage } from '@/modules/post/homePageReducer';
import { PostDetailType } from '@/modules/post/postType';
import Image from 'next/image';
import { ChatTeardropDots, Playlist, ThumbsUp } from 'phosphor-react';
import WavePlayer from './WavePlayer';

export interface PostCardMinType {
  currentPage: number;
  post: PostDetailType;
}

const PostCardMin = (props: PostCardMinType) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => {
        if (props.currentPage == 2) {
          return;
        }
        if (props.currentPage == 1) {
          dispatch(updateHomePage({ page: 2, id: props.post.id }));
        }
      }}
      className="relative mb-4 mx-4 px-4 rounded-lg overflow-hidden last-of-type:mb-0"
    >
      {props.post.cover_image ? (
        <Image
          alt="post-cover"
          src={
            props.post.cover_image && props.post.cover_image != null
              ? props.post.cover_image
              : '/images/background-gradient.jpg'
          }
          width={500}
          height={500}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      ) : (
        <></>
      )}

      <div
        className="w-full h-full object-cover absolute top-0 left-0"
        style={{
          background: props.post.cover_image
            ? `linear-gradient(rgb(0,0,0,0.2), rgb(0,0,0,0.4), rgb(0,0,0,0.2))`
            : '#2D2D2E',
        }}
      ></div>

      <div className="relative">
        <h1 className="text-sm sm:text-base text-white font-light mt-3 line-clamp-2 z-10">
          {props.post.title}
        </h1>

        <div className="rounded-lg bg-white/10 backdrop-blur-sm my-3 px-4 py-1 z-10">
          <WavePlayer
            audioItem={{
              url: props.post?.audio
                ? apiPaths.baseUrl +
                  '/socialnetwork/audio/stream/' +
                  props.post?.audio?.id +
                  '?isPostAudio=YES'
                : '', // Check if props.post.audio exists
              duration: parseFloat(props.post?.audio?.file_duration || '0'), // Use optional chaining and provide a default value
              info: {
                title: props.post?.audio
                  ? props.post?.audio?.title || props.post?.title
                  : props.post?.title, // Check if props.post.audio.title exists
                description: props.post?.owner
                  ? props.post?.owner?.name || ''
                  : '', // Check if props.post.owner and props.post.owner.name exist
                // id: props.post.id || '', // Check if props.post.id exists
              },
            }}
            theme="dark"
            audioWaveData={
              props.post?.audio
                ? props.post?.audio?.wave_data ||
                  JSON.stringify(defaultWaveData)
                : JSON.stringify(defaultWaveData) // Check if props.post.audio.wave_data exists
            }
            size="large"
          />
        </div>

        <div className="flex gap-3 items-center mb-4">
          <div
            className="button cursor-pointer"
            onClick={(e) => {
              e?.stopPropagation();
            }}
          >
            <ThumbsUp size="26" color="white" weight="regular" />
          </div>
          <div
            className="button cursor-pointer"
            onClick={(e) => {
              e?.stopPropagation();
            }}
          >
            <ChatTeardropDots size="26" color="white" weight="regular" />
          </div>
          <div
            className="button cursor-pointer"
            onClick={(e) => {
              e?.stopPropagation();
            }}
          >
            <Playlist size="26" color="white" weight="regular" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardMin;
