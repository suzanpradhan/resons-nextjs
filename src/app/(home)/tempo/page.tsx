'use client';
import DraggableList from '@/app/(components)/(popUpComponent)/DraggableList';
import Image from 'next/image';
import { ChatTeardropDots, Playlist, ThumbsUp, X } from 'phosphor-react';

const page = () => {
  return (
    <div className="sm:container md:container lg:container mx-auto h-full">
      <div className="overflow-y-scroll h-full pb-20">
        <div className="px-4 py-3 bg-white shadow-sm flex items-center gap-2 text-lg my-0">
          <span className="text-4xl -my-2 font-light">
            <X size={24} />
          </span>
          <span className="font-medium">Next up</span>
        </div>

        <div className="relative w-full p-4">
          <Image
            alt="post-cover"
            src={'/images/background-gradient.jpg'}
            width={500}
            height={500}
            className="w-full h-full object-cover -z-10 absolute top-0 left-0"
          />
          <div className="flex items-center">
            <div className="flex-1 flex items-center gap-2">
              <div className="w-14 h-14 rounded-full overflow-hidden cursor-pointer">
                <Image
                  src={'/images/avatar.jpg'}
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
              <div className="flex flex-col">
                <h3 className="text-base sm:text-lg text-white font-medium flex items-center cursor-pointer">
                  Lisha Mana
                </h3>
                <p className="text-xs sm:text-sm font-light text-white">
                  Afghanistan
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-sm sm:text-base text-white font-light mt-3 line-clamp-2">
            Test Title
          </h1>
          <div className="rounded-lg bg-white/10 backdrop-blur-sm my-3 px-4 py-8"></div>

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
            <div
              className="button cursor-pointer"
              onClick={(e) => {
                e?.stopPropagation();
              }}
            >
              <Playlist size="26" color="white" weight="regular" />
            </div>
          </div>

          <div className="mt-2">
            <div className="text-sm text-white font-light">
              <span className="cursor-pointer">likes</span> • comments
            </div>
          </div>
        </div>

        <DraggableList />
      </div>
    </div>
  );
};

export default page;
