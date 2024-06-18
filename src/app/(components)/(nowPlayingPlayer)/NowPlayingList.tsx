'use client';
import { useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  ChatTeardropDots,
  DotsSix,
  DotsThreeOutlineVertical,
  Play,
  Playlist,
  ThumbsUp,
  X,
} from 'phosphor-react';

interface PlayListProps {
  onClose: () => void;
}

export default function NowPlayingList(props: PlayListProps) {
  const dropIn = {
    hidden: {
      y: '200vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 2,
        type: 'spring',
        damping: 90,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };

  const playlist = useAppSelector(
    (state: RootState) => state.nowPlaying.playlist
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mx-auto h-full absolute top-0 left-0 w-full z-50 bg-white"
      >
        <div className="px-4 py-3 bg-white shadow-sm flex items-center gap-2 text-lg my-0">
          <span
            onClick={() => {
              props.onClose();
            }}
            className="text-4xl -my-2 font-light"
          >
            <X size={24} />
          </span>
          <span className="font-medium">Next up</span>
        </div>
        <div className="overflow-y-scroll h-full pb-20">
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

          {/* <DraggableList playlist={playlist} /> */}
          <div className="flex flex-col bg-white">
            {playlist.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer p-2 m-2 flex justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center">
                    <Play size={21} weight="fill" className="text-white" />
                  </span>
                  <div className="flex flex-col">
                    <p className="text-xs sm:text-sm text-gray-900 font-medium">
                      {item.info?.title} - undefined
                    </p>
                    <span className="text-xs font-light text-gray-690">
                      Tommy Shaw • 4.51
                    </span>
                  </div>
                </div>

                <div className="w-4 hidden items-center justify-center group-hover:flex">
                  <DotsThreeOutlineVertical size={32} weight="fill" />
                </div>
                <div className="w-4 flex items-center justify-center group-hover:hidden">
                  <DotsSix size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
