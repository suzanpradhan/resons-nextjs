import WavePlayer from '@/app/(components)/WavePlayer';
import { apiPaths } from '@/core/api/apiConstants';
import { defaultWaveData } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import postApi from '@/modules/post/postApi';
import { PostDetailType } from '@/modules/post/postType';
import Image from 'next/image';
import { ChatTeardropDots, Playlist, ThumbsUp } from 'phosphor-react';
import { useEffect } from 'react';

const PopularPostsSection = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(postApi.endpoints.getPopularPostList.initiate());
    };

    fetchData();
  }, [dispatch]);

  const postsListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPopularPostList`]
        ?.data as PaginatedResponseType<PostDetailType>
  );

  return (
    <>
      <div className="flex flex-col mb-4 py-4 bg-white overflow-x-hidden last-of-type:mb-28">
        <h3 className="text-base font-medium text-gray-800 mb-4 pb-2 capitalize border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 mx-4">
          Popular Posts
        </h3>
        {postsListData?.data.map((post, index) => {
          return (
            <div
              key={`popular_post_${index}`}
              className="relative mb-4 mx-4 px-4 rounded-lg overflow-hidden last-of-type:mb-0"
            >
              {post.cover_image ? (
                <Image
                  alt="post-cover"
                  src={
                    post.cover_image && post.cover_image != null
                      ? post.cover_image
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
                  background: post.cover_image
                    ? `linear-gradient(rgb(0,0,0,0.2), rgb(0,0,0,0.4), rgb(0,0,0,0.2))`
                    : '#2D2D2E',
                }}
              ></div>

              <div className="relative">
                <h1 className="text-sm sm:text-base text-white font-light mt-3 line-clamp-2 z-10">
                  {post.title}
                </h1>

                <div className="rounded-lg bg-white/10 backdrop-blur-sm my-3 px-4 py-1 z-10">
                  <WavePlayer
                    audioItem={{
                      url: post?.audio
                        ? apiPaths.baseUrl +
                          '/socialnetwork/audio/stream/' +
                          post?.audio?.id +
                          '?isPostAudio=YES'
                        : '', // Check if props.post.audio exists
                      duration: parseFloat(post?.audio?.file_duration || '0'), // Use optional chaining and provide a default value
                      info: {
                        title: post?.audio
                          ? post?.audio?.title || post?.title
                          : post?.title, // Check if props.post.audio.title exists
                        description: post?.owner ? post?.owner?.name || '' : '', // Check if props.post.owner and props.post.owner.name exist
                        // id: props.post.id || '', // Check if props.post.id exists
                      },
                    }}
                    theme="dark"
                    audioWaveData={
                      post?.audio
                        ? post?.audio?.wave_data ||
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
                    <ChatTeardropDots
                      size="26"
                      color="white"
                      weight="regular"
                    />
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
        })}
      </div>
    </>
  );
};

export default PopularPostsSection;
