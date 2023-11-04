'use client';

import {
  Backward,
  Forward,
  Heart,
  MessageText1,
  Pause,
  Play,
} from 'iconsax-react';
/* eslint-disable @next/next/no-img-element */
import HashtagCover from '@/app/(components)/HashtagCover';
import { apiPaths } from '@/core/api/apiConstants';
import { TemporarySegment } from '@/core/ui/components/TemporarySegment';
import { PostDetailType } from '@/modules/post/postType';
import { useEffect, useRef, useState } from 'react';

export interface FeedProfileProps {
  post: PostDetailType;
}

const FeedProfile = (props: FeedProfileProps) => {
  const wavesurfer = useRef<any>(null);
  const waveformRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setIsLiked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const create = async () => {
      if (!waveformRef.current) return;
      const WaveSurfer = (await import('wavesurfer.js')).default;
      // Create a new instance of WaveSurfer
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'gray',
        progressColor: '#B00000',
        cursorColor: 'transparant',
        barWidth: 3,
        barRadius: 3,
        // responsive: true,
        height: 75,
      });

      wavesurfer.current.load(
        apiPaths.baseUrl +
        '/socialnetwork/audio/stream/' +
        props.post.audio.id + "?isPostAudio=YES"
      );

      // Handle any error events
      wavesurfer.current.on('error', (error: any) => {
        console.error('Wavesurfer error:', error);
      });

      // Update current time and duration on audio play
      wavesurfer.current.on('play', () => {
        const audioDuration = wavesurfer.current.getDuration();
        setDuration(audioDuration);

        const updateCurrentTime = () => {
          const audioCurrentTime = wavesurfer.current.getCurrentTime();
          setCurrentTime(audioCurrentTime);
          if (audioCurrentTime < audioDuration) {
            requestAnimationFrame(updateCurrentTime);
          }
        };

        updateCurrentTime();
      });

      // Clean up on component unmount
      return () => {
        wavesurfer.current.destroy();
      };
    };
    create();
  }, [props.post.audio]);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      wavesurfer.current.pause();
    } else {
      wavesurfer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full mb-5 sm:mb-0 drop-shadow-xl">
      <div className="w-full mb-5">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex justify-been items-center ">
              <div className="w-1/2 bg-white">
                <div className="relative flex flex-col py-4 px-4 w-full">
                  <div className="relative flex flex-col">
                    <h3 className=" text-gray-800 text-[1.2rem] mr-2 font-medium">
                      <HashtagCover text={props.post.title} />
                    </h3>
                    <p className=" text-gray-400 text-[.8rem] mr-2 font-bold">
                      {props.post.created_at_human} by {props.post.owner.name}
                    </p>
                    <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
                  </div>
                  <TemporarySegment
                    audioUrl={
                      apiPaths.baseUrl +
                      '/socialnetwork/audio/stream/' +
                      props.post.audio.id + "?isPostAudio=YES"
                    }
                  />
                  <div className="flex justify-been w-28">
                    <span className="text-[.8rem] font-bold">
                      <Heart size="24" color="gray" />
                      {props.post.total_likes}
                    </span>
                    <span className="text-[.8rem] font-bold">
                      <Play size="26" color="#333" variant="Outline" />
                      {props.post.total_comments}
                    </span>
                  </div>

                  <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
                </div>

                <div className="relative flex p-4 justify-between">
                  <div className="flex basis-24 justify-been">
                    <div
                      className="flex mr-5 items-start cursor-pointer"
                      onClick={() => {
                        setIsLiked(!liked);
                      }}
                    >
                      <button className="border-none bg-transparent mr-2">
                        {liked ? (
                          <Heart size="24" color="#cf4a4a" variant="Bold" />
                        ) : (
                          <Heart size="24" color="gray" />
                        )}
                      </button>
                      <span className="text-[1rem]">
                        {props.post.total_likes}
                      </span>
                    </div>
                    <div className="flex mr-5 items-start">
                      <button className="border-none bg-transparent mr-2">
                        <MessageText1 size="24" color="gray" variant="Bold" />
                      </button>
                      <span className="text-[1rem]">
                        {props.post.total_comments}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-around items-center">
                    <button className="border-none bg-transparent w-[30px]">
                      <Backward size="24" color="#333" variant="Bold" />
                    </button>
                    <button
                      onClick={handlePlayPause}
                      className="border-none bg-transparent w-[30px]"
                    >
                      {isPlaying ? (
                        <Pause size="26" color="#333" variant="Outline" />
                      ) : (
                        <Play size="26" color="#333" variant="Outline" />
                      )}
                    </button>

                    <button className="border-none bg-transparent w-[30px]">
                      <Forward size="21" color="#333" variant="Bold" />
                    </button>
                  </div>
                  <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedProfile;
