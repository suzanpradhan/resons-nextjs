import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import { DotsThreeOutlineVertical, PlayCircle, ThumbsUp } from 'phosphor-react';
import { useState } from 'react';

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
];

const MusicPlayer = ({ params }: MusicPlayerType) => {
  const getCategoryName = params.categories[1];
  const convertToString = getCategoryName.replace(/%20/g, ' '); //Replace %20 by " "
  const [selectedSongId, toggleSongsId] = useState(0);
  return (
    <div>
      <div className="w-full h-64 relative">
        <Image
          alt="category image"
          fill
          objectFit="cover"
          src="/images/cover.webp"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="-z-10"
        />
        <div className="mx-4">
          <a href="/" className="text-3xl text-white font-light">
            {'<'}
          </a>
          <div className="w-28 h-28 rounded-md relative mt-6">
            <Image
              src={postDetails[selectedSongId].coverImage}
              alt="song cover image"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="-z-10 rounded-md"
              fill
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="border-b-2 flex justify-between items-center px-4 py-3 font-medium">
        <h2 className="text-xl mb-0 ">{convertToString}</h2>
        <span className="text-sm">23 audios</span>
      </div>
      <div className="flex flex-col gap-4 my-3">
        {postDetails.map((item, index) => (
          <div
            role="button"
            key={index}
            onClick={() => toggleSongsId(index)}
            className="flex px-6 gap-3 items-center "
          >
            <div>
              <PlayCircle size={40} className="rounded-full" weight="fill" />
            </div>
            <div className="grow flex flex-col">
              <p className="text-lg font-semibold">{item.postName}</p>
              <div className="text-slate-500 -mt-3 text-sm">
                <span className="after:content-['\00B7'] after:font-extrabold after:text-2xl after:mx-1 ">
                  {item.postCreator}
                </span>
                {item.audioDuration}
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
