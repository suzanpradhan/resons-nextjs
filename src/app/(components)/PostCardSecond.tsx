'use client';

import { DocumentUpload, Send, StopCircle } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import CommentResons from './(icons)/CommentResons';
import LikeResons from './(icons)/LikeResons';
import PlayListResons from './(icons)/PlayListResons';
import PlayResons from './(icons)/PlayResons';
import ShareResons from './(icons)/ShareResons';

/* eslint-disable @next/next/no-img-element */
const PostCardSecond = () => {
  const wavesurfer = useRef<any>(null);
  const waveformRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const create = async () => {
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
        height: 25,
      });

      wavesurfer.current.load('/sweed_app.mp3');

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
  }, []);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="flex flex-col bg-white w-[100%] rounded-xl mt-5 sm:mb-5 shadow-xl">
        <div className="relative flex justify-between items-center px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-max h-max border-solid border-2 border-accentRed rounded-full drop-shadow-2xl">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <img
                  src="/images/avatar.jpg"
                  alt="post_owner_avatar"
                  onError={(e) => {
                    (e.target as any).onError = null;
                    (e.target as any).src = '/images/avatar.jpg';
                  }}
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm md:text-lg font-medium text-dark-500 flex items-center">
                Tamar Moshe
              </div>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                United Kingdom{' '}
                <span className="mx-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500 text-[.5rem] text-white">
                  EN
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm font-medium">
            <span>903k Followers</span>&nbsp;|&nbsp;
            <span className="text-red-400">Follow</span>
          </div>
          <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-stretch px-4 py-4">
          <div className="basis-2/3 w-full md:border md:border-l-0 md:border-t-0 md:border-r md:border-b-0 md:border-gray-100 md:pr-2">
            <h3 className="text-base md:text-lg font-bold text-gray-900 m-0 text-left">
              A guitar playing for school
            </h3>
            <div className="basis-full w-full sm:w-4/5 mb-4">
              <p className="inline-block text-sm font-light text-gray-400 text-left m-0">
                Just trying to play my part for school. Anyone can help?
              </p>
            </div>

            <div className="relative flex items-center py-2 my-1">
              <div ref={waveformRef} className="w-full"></div>
              <div className="basis-5 w-full bg-gray-600 text-white text-xs py-[1px] px-1 mr-1 last-of-type:mr-0">
                {formatTime(duration)}
              </div>
              <div className="flex mr-1 last-of-type:mr-0 items-center cursor-pointer">
                <button className="border-none bg-transparent mr-1">
                  <PlayResons width="20" height="20" gradient={false} />
                </button>
              </div>
              <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
            </div>

            <div className="relative flex justify-between items-center py-1 my-1">
              <div className="flex items-center">
                <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
                  <button className="border-none bg-transparent mr-1">
                    <ShareResons width="20" height="20" gradient={false} />
                  </button>
                </div>
                <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
                  <button className="border-none bg-transparent mr-1">
                    <CommentResons width="20" height="20" gradient={false} />
                  </button>
                  <span className="text-xs">50k</span>
                </div>
                <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
                  <button className="border-none bg-transparent mr-1">
                    <LikeResons width="20" height="20" gradient={false} />
                  </button>
                  <span className="text-xs">803k</span>
                </div>
                <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
                  <button className="border-none bg-transparent mr-1">
                    <PlayListResons width="20" height="20" gradient={false} />
                  </button>
                </div>
              </div>
              <div className="mx-1 text-xs md:text-sm text-gray-500">
                3 weeks ago
              </div>
              <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
            </div>

            <div className="flex items-start pl-4 pb-2 pt-1">
              <div className="w-[35px] h-[35px] border-solid border-2 border-accentRed rounded-full drop-shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/images/avatar.jpg"
                    alt="post_owner_avatar"
                    onError={(e) => {
                      (e.target as any).onError = null;
                      (e.target as any).src = '/images/avatar.jpg';
                    }}
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center basis-[calc(100%-35px)] w-full pl-2">
                <h3 className="text-sm font-medium text-dark-500 flex items-center">
                  Linor Yamini
                  <span className="text-xs md:text-sm font-light text-gray-500 ml-2">
                    Ok try this Moshe
                  </span>
                </h3>
                <p className="text-xs font-normal text-gray-500">3 hours ago</p>
                <div className="relative flex items-center py-2 my-1">
                  <div ref={waveformRef} className="w-full"></div>
                  <div className="basis-5 w-full bg-gray-600 text-white text-xs py-[1px] px-1 mr-1 last-of-type:mr-0">
                    {formatTime(duration)}
                  </div>
                  <div className="flex mr-1 last-of-type:mr-0 items-center cursor-pointer">
                    <button className="border-none bg-transparent mr-1">
                      <PlayResons width="20" height="20" gradient={false} />
                    </button>
                  </div>
                  <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-start pl-4 pb-2 pt-1">
              <div className="w-[35px] h-[35px] border-solid border-2 border-accentRed rounded-full drop-shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/images/avatar.jpg"
                    alt="post_owner_avatar"
                    onError={(e) => {
                      (e.target as any).onError = null;
                      (e.target as any).src = '/images/avatar.jpg';
                    }}
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center basis-[calc(100%-35px)] w-full pl-2">
                <h3 className="text-sm font-medium text-dark-500 flex items-center">
                  Linor Yamini
                  <span className="text-xs md:text-sm font-light text-gray-500 ml-2">
                    Ok try this Moshe
                  </span>
                </h3>
                <p className="text-xs font-normal text-gray-500">3 hours ago</p>
                <div className="relative flex items-center py-2 my-1">
                  <div ref={waveformRef} className="w-full"></div>
                  <div className="basis-5 w-full bg-gray-600 text-white text-xs py-[1px] px-1 mr-1 last-of-type:mr-0">
                    {formatTime(duration)}
                  </div>
                  <div className="flex mr-1 last-of-type:mr-0 items-center cursor-pointer">
                    <button className="border-none bg-transparent mr-1">
                      <PlayResons width="20" height="20" gradient={false} />
                    </button>
                  </div>
                  <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
                </div>
              </div>
            </div>

            <a
              className="pl-4 pb-2 pt-1 text-[#50b5ff] hover:text-[#449ad9] text-xs"
              href=""
            >
              View all 315 comments
            </a>
          </div>

          <div className="basis-1/3 px-4 flex flex-col justify-between mt-5 md:mt-0">
            <div>
              <div className="flex items-center mb-4">
                <div className="border-2 border-gray-400 rounded-full p-2">
                  <PlayResons width="30" height="30" gradient={false} />
                </div>
                <div className="flex text-sm text-gray-500 ml-2">
                  <p>Listen to 6.23 hours (314 comments)</p>
                </div>
              </div>
              <div className="text-base text-gray-500 mb-4">
                <h4 className="font-medium inline-block md:block">
                  Topics<span className="md:hidden">:&nbsp;</span>
                </h4>
                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  Rock
                </span>
                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  Guitar
                </span>
                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  80&apos;s
                </span>

                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  Romance
                </span>
                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  90&apos;s
                </span>
              </div>
              <div className="text-base text-gray-500 mb-4">
                <h4 className="font-medium inline-block md:block">
                  Similar<span className="md:hidden">:&nbsp;</span>
                </h4>
                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  Rock
                </span>
                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  Guitar
                </span>
                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  80&apos;s
                </span>

                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  Romance
                </span>
                <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                  90&apos;s
                </span>
              </div>
            </div>

            <div>
              <div className="basis-auto w-full">
                <input
                  type="hidden"
                  name="post_id"
                  placeholder="Write a comment here..."
                  className="border-b border-solid border-t-0 border-r-0 border-l-0 border-b-gray-300 bg-transparent text-[1rem] text-gray-500 w-full"
                />
                <input
                  type="text"
                  name="comment"
                  required
                  placeholder="Write a comment here..."
                  className="focus-visible:outline-none border-b border-solid border-t-0 border-r-0 border-l-0 border-b-gray-300 bg-transparent text-[1rem] text-gray-500 w-full"
                />
              </div>
              <div className="flex basis-[9rem] lg:basis-[6rem] justify-end mt-2">
                <button
                  type="button"
                  className="flex justify-center items-center border-none bg-red-400 h-[32px] w-[32px] rounded-full mr-2 last-of-type:mr-0"
                >
                  <StopCircle size="18" color="white" variant="Bulk" />
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center border-none bg-gray-400 h-[32px] w-[32px] rounded-full mr-2 last-of-type:mr-0"
                >
                  <DocumentUpload size="18" color="white" variant="Bulk" />
                </button>
                <button
                  type="submit"
                  className="flex justify-center items-center border-none bg-blue-400 h-[32px] w-[32px] rounded-full mr-2 last-of-type:mr-0"
                >
                  <Send size="18" color="white" variant="TwoTone" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCardSecond;
