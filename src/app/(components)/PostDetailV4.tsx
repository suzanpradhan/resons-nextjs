'use client';

import PostDropdown, { ItemComponent } from '@/app/(components)/PostDropdown';
import { apiPaths } from '@/core/api/apiConstants';
import { defaultWaveData } from '@/core/constants/appConstants';
import { RootState } from '@/core/redux/store';
import { PostDetailType } from '@/modules/post/postType';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChatTeardropDots,
  DownloadSimple,
  PencilSimpleLine,
  Playlist,
  Share,
  ThumbsUp,
  TrashSimple,
} from 'phosphor-react';
import { useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import LikeList from './(popUpComponent)/LikeList';
import AddToPlaylistPopup from './(popups)/AddToPlaylistPopup';
import WavePlayer from './WavePlayer';

interface PostDetailProps extends PropsFromRedux {
  post: PostDetailType;
  descriptionEllipsis?: boolean;
  onWhiteSpaceClick?: () => void;
}

// interface CommenterProps {
//   commenter_image: string;
// }

// export function CommenterImage(commenter: CommenterProps) {
//   return (
//     // <div className="w-7 h-7 p-1 rounded-full overflow-hidden border-2 border-white shadow-lg">
//     //   <div className="w-full h-full cursor-pointer inline-block avatar">
//     <div className="w-max h-max border-solid border-2 border-white bg-[#2d2d2e] rounded-full p-[2px] inline-block avatar">
//       <div className="w-6 h-6 rounded-full overflow-hidden">
//         <Image
//           width={800}
//           height={200}
//           src={
//             commenter.commenter_image && commenter.commenter_image != null
//               ? commenter.commenter_image
//               : '/images/avatar.jpg'
//           }
//           alt="commenter-profile-image"
//           onError={(e) => {
//             (e.target as any).onError = null;
//             (e.target as any).src = '/images/avatar.jpg';
//           }}
//           className="w-full h-full object-contain"
//         />
//       </div>
//     </div>
//   );
// }

const PostDetailV4 = ({
  descriptionEllipsis = true,
  ...props
}: PostDetailProps) => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, toggleModelOpen] = useState(false);
  const navigator = useRouter();

  const handleViewPostLikes = (e: any) => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    document.body.style.overflow = 'hidden';
    e.stopPropagation();
  };
  const pathname = usePathname();
  // const isPlaying = useAppSelector(
  //   (state: RootState) => state.nowPlaying.isPlaying
  // );
  // const currentPlaylistIndex = useAppSelector(
  //   (state: RootState) => state.nowPlaying.currentPlaylistIndex as number
  // );
  // const playlist = useAppSelector(
  //   (state: RootState) => state.nowPlaying.playlist as NowPlayingAudioItem[]
  // );

  const handleOnLikeViewClose = async () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div
        onClick={() => {
          if (props.currentPage == 2) {
            return;
          }
          if (props.onWhiteSpaceClick) {
            props.onWhiteSpaceClick();
          }
        }}
      >
        <div
          className="relative w-full p-4"
          style={{
            background: props.post.cover_image
              ? `linear-gradient(rgb(0,0,0,0.2), rgb(0,0,0,0.4), rgb(0,0,0,0.2))`
              : '#2D2D2E',
          }}
        >
          {props.playlist[props.currentPlaylistIndex]?.info?.id ==
            props.post.id && props.isPlaying ? (
            <Image
              alt="wave-icon"
              src="/images/wave-white.gif"
              width={10}
              height={10}
              className="w-6 h-6 object-contain absolute bottom-4 right-4"
            />
          ) : null}
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
              className="w-full h-full object-cover -z-10 absolute top-0 left-0"
            />
          ) : (
            <></>
          )}
          <div
            className={`absolute -top-4 right-4 rounded-full bg-slate-100 py-1 px-3 text-xs sm:text-sm font-medium text-black shadow-lg border-0 border-white border-t-2 border-b border-b-gray-500 ${
              props.currentPage == 2 ? 'hidden' : ''
            }`}
          >
            {moment.duration(props.post.time_duration, 'seconds').humanize() +
              ' ago'}
          </div>
          <div className="flex items-center">
            <div className="flex-1 flex items-center gap-2">
              {/* <div
            className="w-14 h-14 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              console.log('clicked');
            }}
          > */}
              <div className="w-max h-max border-solid border-0 border-white rounded-full p-1">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {}}
                >
                  <Image
                    src={
                      props.post.owner.profile_image &&
                      props.post.owner.profile_image != null
                        ? props.post.owner.profile_image
                        : '/images/avatar.jpg'
                    }
                    alt="profile-image"
                    onError={(e) => {
                      (e.target as any).onError = null;
                      (e.target as any).src = '/images/avatar.jpg';
                    }}
                    width={100}
                    height={100}
                    className="w-14 h-14 object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h3
                  className="text-base sm:text-lg text-white font-medium flex items-center cursor-pointer"
                  onClick={(e) => {
                    e?.stopPropagation();
                  }}
                >
                  {props.post.owner?.name}{' '}
                  {props.post.owner.language ? (
                    <span className="uppercase tracking-wide inline-flex items-center justify-center text-xs w-6 h-6 rounded-full bg-slate-800 text-white ml-1">
                      {props.post.owner.language}
                    </span>
                  ) : (
                    <></>
                  )}
                </h3>
                <p
                  className={`text-xs sm:text-sm font-light text-white ${
                    props.currentPage == 1 ? 'hidden' : ''
                  }`}
                >
                  {props.post.owner.country?.name}
                  {props.post.owner.country ? ' • ' : ' '}

                  {moment
                    .duration(props.post.time_duration, 'seconds')
                    .humanize() + ' ago'}
                </p>
                <p
                  className={`text-xs sm:text-sm font-light text-white ${
                    props.currentPage == 2 ? 'hidden' : ''
                  }`}
                >
                  {props.post.owner.country?.name}
                </p>
              </div>
            </div>
            <div
              className="flex justify-center items-center rounded-full w-10 h-10 cursor-pointer "
              onClick={(e) => {
                e?.stopPropagation();
              }}
            >
              <PostDropdown variant="white">
                {session.data?.user?.id == props.post.owner.id ? (
                  <ItemComponent
                    icon={<PencilSimpleLine size={16} />}
                    title="Edit"
                  />
                ) : null}
                {session.data?.user?.id == props.post.owner.id ? (
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
          </div>
          <h1 className="text-sm sm:text-base text-white font-light mt-3 line-clamp-2">
            {props.post.title}
          </h1>
          {/* <TextWrapper
        text={props.post.description}
        ellipsis={descriptionEllipsis}
        className="text-sm font-normal text-white mt-1"
      /> */}
          <div className="rounded-lg bg-white/10 backdrop-blur-sm my-3 px-4 py-1">
            <WavePlayer
              audioItem={{
                url: props?.post?.audio
                  ? apiPaths.baseUrl +
                    '/socialnetwork/audio/stream/' +
                    props?.post?.audio?.id +
                    '?isPostAudio=YES'
                  : '', // Check if props.post.audio exists
                duration: parseFloat(props?.post?.audio?.file_duration || '0'), // Use optional chaining and provide a default value
                info: {
                  title: props?.post?.audio
                    ? props?.post?.audio?.title || props?.post?.title
                    : props?.post?.title, // Check if props.post.audio.title exists
                  description: props?.post?.owner
                    ? props?.post?.owner?.name || ''
                    : '', // Check if props.post.owner and props.post.owner.name exist
                  // id: props.post.id || '', // Check if props.post.id exists
                },
              }}
              theme="dark"
              audioWaveData={
                props?.post?.audio
                  ? props?.post?.audio?.wave_data ||
                    JSON.stringify(defaultWaveData)
                  : JSON.stringify(defaultWaveData) // Check if props.post.audio.wave_data exists
              }
              size="large"
            />
          </div>
          <div className="flex gap-3 items-center">
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
            <button
              className="button cursor-pointer"
              onClick={(e) => {
                e?.stopPropagation();
                if (session.data?.user != undefined) {
                  toggleModelOpen(true);
                } else {
                  navigator.push('/login');
                }
              }}
            >
              <Playlist size="26" color="white" weight="regular" />
            </button>
          </div>
          <div className="mt-2">
            <div className="text-sm text-white font-light">
              <span onClick={handleViewPostLikes} className="cursor-pointer">
                {props?.post?.total_likes > 0
                  ? props?.post?.total_likes > 1
                    ? props?.post?.total_likes + ' likes'
                    : props?.post?.total_likes + ' like'
                  : null}
              </span>

              {props?.post?.total_likes > 0 && props?.post?.total_comments > 0
                ? ' • '
                : null}
              {props?.post?.total_comments && props?.post?.total_comments > 1
                ? props?.post?.total_comments + ' comments'
                : props.post.total_comments > 0
                ? props.post.total_comments + ' comment'
                : null}
              {/* <div
            className="flex items-center absolute bottom-[-8px] left-2/3"
            style={{ transform: 'translateX(-50%)' }}
          >
            {props.post.commenter_image &&
            props.post.commenter_image?.length > 0
              ? props.post.commenter_image.map((commenter, index) => (
                  <CommenterImage
                    key={`commenter_${index}`}
                    commenter_image={commenter}
                  />
                ))
              : null}
            <span className="text-xs w-max ml-1">+33 comments</span>
          </div> */}
            </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <LikeList onClose={handleOnLikeViewClose} postId={props.post.id!} />
      ) : null}
      {session.data?.user && (
        <AddToPlaylistPopup
          isModalOpen={isModalOpen}
          toggleModelOpen={toggleModelOpen}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isPlaying: state.nowPlaying.isPlaying,
    playlist: state.nowPlaying.playlist,
    currentPlaylistIndex: state.nowPlaying.currentPlaylistIndex,
    currentPage: state.homepage.currentPage,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PostDetailV4);
