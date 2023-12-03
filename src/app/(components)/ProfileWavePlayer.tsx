import { apiPaths } from '@/core/api/apiConstants';
import { defaultWaveData } from '@/core/constants/appConstants';
import { PostDetailType } from '@/modules/post/postType';
import Image from 'next/image';
import { ChatCircle, Heart, ShareNetwork } from 'phosphor-react';
import WavePlayer from './WavePlayer';

const ProfileWavePlayer = (post: PostDetailType) => {
  return (
    <div
      className="relative flex flex-col w-full mt-2 rounded-md overflow-hidden"
      style={{
        background: post.cover_image
          ? `linear-gradient(rgb(0,0,0,0.2), rgb(0,0,0,0.4), rgb(0,0,0,0.2))`
          : '#2D2D2E',
      }}
    >
      {post?.cover_image ? (
        <div className="relative">
          <Image
            alt="wave-icon"
            src={post?.cover_image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            objectFit="cover"
            className="w-full h-full object-cover object-center right-0 left-0 bottom-0"
          />
        </div>
      ) : (
        <Image
          alt="wave-icon"
          src="/images/wave-white.gif"
          width={500}
          height={100}
          className="w-full h-10 object-contain object-center absolute right-0 left-0 bottom-[18px]"
        />
      )}
      <div className="py-2 px-3 backdrop-blur-md bg-black/40">
        <div className="flex w-full items-center justify-between">
          <span className="text-[14px] font-bold text-white">
            {post?.title}
          </span>
          <span className="inline-flex items-center text-white">
            <Heart size={20} weight="fill" />
            <ChatCircle size={20} weight="fill" className="ml-2" />
            <ShareNetwork size={20} weight="fill" className="ml-2" />
          </span>
        </div>
        <WavePlayer
          key={post?.id}
          audioItem={{
            url: post?.audio
              ? apiPaths.baseUrl +
                '/socialnetwork/audio/stream/' +
                post?.audio?.id +
                '?isPostAudio=YES'
              : '',
            duration: parseFloat(post?.audio?.file_duration || '0'),
            info: {
              title: post?.audio
                ? post?.audio?.title || post?.title
                : post?.title,
              description: post?.owner ? post?.owner?.name : '',
            },
          }}
          theme="dark"
          audioWaveData={
            post?.audio
              ? post?.audio?.wave_data || JSON.stringify(defaultWaveData)
              : JSON.stringify(defaultWaveData) // Check if props.post.audio.wave_data exists
          }
          size="large"
        />
        <div className="flex w-full items-center justify-between">
          <span className="text-[12px] font-normal text-white">
            {post?.total_likes} Likes
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProfileWavePlayer;
