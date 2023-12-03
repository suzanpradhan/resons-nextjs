import { defaultWaveData } from '@/core/constants/appConstants';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import { DotsThreeOutlineVertical, PlayCircle, ThumbsUp } from 'phosphor-react';
import { useState } from 'react';
import WavePlayer from './WavePlayer';

interface MusicPlayerType {
  params: Params;
}

const postDetails = [
  {
    postCreator: 'Avishek Dahal',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Ram Sekhar',
    postName: 'Count On You',
    coverImage: '/images/cover.webp',
    audioDuration: '3:08',
  },
  {
    postCreator: 'DJ something',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Man on knight',
    postName: 'Count On You',
    coverImage: '/images/cover.webp',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Suraksha Mishra',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Suraksha Mishra',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Man on knight',
    postName: 'Count On You',
    coverImage: '/images/cover.webp',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Suraksha Mishra',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Suraksha Mishra',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Suraksha Mishra',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Suraksha Mishra',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Man on knight',
    postName: 'Count On You',
    coverImage: '/images/cover.webp',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Suraksha Mishra',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
  {
    postCreator: 'Suraksha Mishra',
    postName: 'Count On You',
    coverImage: '/images/login-cover.jpg',
    audioDuration: '3:08',
  },
];

const MusicPlayer = ({ params }: MusicPlayerType) => {
  const getCategoryName = params.categories[1];
  const convertToString = getCategoryName.replace(/%20/g, ' '); //Replace %20 by " "
  const [selectedSongId, toggleSongsId] = useState(0);
  return (
    <div>
      <div
        className="w-full relative"
        style={{
          background: `linear-gradient(rgb(0,0,0,0.2), rgb(0,0,0,0.4), rgb(0,0,0,0.2))`,
        }}
      >
        <Image
          alt="category image"
          fill
          objectFit="cover"
          src="/images/cover.webp"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="-z-10"
        />
        <div className="px-4 py-4">
          <div className="flex gap-2 items-center">
            <div className="w-24 h-24 rounded-md relative">
              <Image
                src={postDetails[selectedSongId].coverImage}
                alt="song cover image"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="-z-10 rounded-md"
                fill
                objectFit="cover"
              />
            </div>
            <div className="text-white">
              <div className="font-medium">Morning Vibes</div>
              <div>Count on you</div>
              <div className="text-xs">By Suraksha Mishra</div>
            </div>
          </div>

          <div className="rounded-lg bg-white/10 backdrop-blur-sm mt-2 px-4 py-1">
            <WavePlayer
              audioItem={{
                url: '', // Check if props.post.audio exists
                duration: parseFloat('0'), // Use optional chaining and provide a default value
                info: {
                  title: 'asasxax', // Check if props.post.audio.title exists
                  description: 'asxas', // Check if props.post.owner and props.post.owner.name exist
                  // id: props.post.id || '', // Check if props.post.id exists
                },
              }}
              theme="dark"
              audioWaveData={JSON.stringify(defaultWaveData)}
              size="large"
            />
          </div>
        </div>
      </div>
      <div className="border-b-2 flex justify-between items-center px-4 h-12">
        <h2 className="text-base mb-0 ">{convertToString}</h2>
        <span className="text-sm">23 audios</span>
      </div>
      <div className="flex flex-col my-2 gap-1">
        {postDetails.map((item, index) => (
          <div
            role="button"
            key={index}
            onClick={() => toggleSongsId(index)}
            className="flex px-4 py-2 gap-2 items-center"
          >
            <PlayCircle size={42} className="rounded-full" weight="fill" />
            <div className="grow flex flex-col">
              <p className="text-base font-medium">{item.postName}</p>
              <div className="text-slate-500 text-xs">
                {item.postCreator} • {item.audioDuration}
              </div>
            </div>
            <div className="flex gap-2">
              <ThumbsUp size={24} />
              <DotsThreeOutlineVertical size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
