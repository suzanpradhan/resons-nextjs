/* eslint-disable @next/next/no-img-element */
'use client';

import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { formatTime } from '@/core/utils/helpers';
import { NowPlayingAudioItem } from '@/modules/nowPlaying/nowPlayingAudioType';
import {
  playNext,
  playSong,
  // updateCurrentDuration,
  updateCurrentTime,
  updateFlag,
  updateIsPlaying,
} from '@/modules/nowPlaying/nowPlayingReducer';
import { Next, Pause, Play, Previous } from 'iconsax-react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const NowPlayingBarV2 = () => {
  const dispatch = useAppDispatch();
  const progressRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | undefined>(undefined);
  const animationRef = useRef<number | undefined>();
  const currentDuration = useSelector(
    (state: RootState) =>
      state.nowPlaying.playlist[state.nowPlaying.currentPlaylistIndex]?.duration
  );
  const currentTime = useSelector(
    (state: RootState) => state.nowPlaying.currentTime
  );
  const isPlaying = useSelector(
    (state: RootState) => state.nowPlaying.isPlaying
  );
  const playlist = useSelector(
    (state: RootState) => state.nowPlaying.playlist as NowPlayingAudioItem[]
  );
  const currentPlaylistIndex = useSelector(
    (state: RootState) => state.nowPlaying.currentPlaylistIndex as number
  );

  const flag = useSelector(
    (state: RootState) => state.nowPlaying.flag as boolean
  );
  useEffect(() => {
    if (!flag) return;
    if (typeof window === 'undefined') return;
    if (audioRef.current) {
      audioRef.current?.pause();
    }
    if (playlist[currentPlaylistIndex] && currentTime == 0) {
      console.log('creating new song');

      var tempAudio = new Audio(playlist[currentPlaylistIndex].url);
      audioRef.current = tempAudio;
      dispatch(updateFlag(false));
    }
  }, [flag]);

  useEffect(() => {
    console.log('----------------------------PLAY/PAUSE : ' + isPlaying);

    if (audioRef.current) {
      isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    }
  }, [isPlaying, flag]);

  const getCurrentTime = () => {
    dispatch(updateCurrentTime(audioRef.current?.currentTime ?? 0));
    animationRef.current = requestAnimationFrame(getCurrentTime);
  };

  useEffect(() => {
    // audioRef.current?.addEventListener('loadedmetadata', () => {
    //   dispatch(updateCurrentDuration(audioRef.current?.duration ?? 0));
    // });
    audioRef.current?.addEventListener('ended', () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (playlist.length > currentPlaylistIndex + 1) {
        console.log('next attempting');

        // dispatch(playNext(currentPlaylistIndex + 1));
      } else {
        console.log('next not attempting');
        if (isPlaying) {
          dispatch(updateIsPlaying(false));
        }
      }
    });
    audioRef.current?.addEventListener('pause', () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // if (isPlaying) {
      //   dispatch(updateIsPlaying(false));
      // }
    });
    audioRef.current?.addEventListener('play', () => {
      console.log('play Event Trigger');
      // if (!isPlaying) {
      //   dispatch(updateIsPlaying(true));
      // }
      getCurrentTime();
    });
    return () => {
      audioRef.current?.removeEventListener('ended', () => {});
    };
  }, [audioRef.current]);

  useEffect(() => {
    progressRef.current.value = currentTime;
    progressRef.current.style.setProperty(
      '--range-progress',
      `${(progressRef.current.value / currentDuration) * 100}%`
    );
  }, [currentTime, currentDuration]);

  useEffect(() => {
    progressRef.current.max = Math.round(currentDuration);
  }, [currentDuration]);

  const handlePrevious = async () => {
    if (currentPlaylistIndex - 1 >= 0) {
      // dispatch(playNext(currentPlaylistIndex - 1));
    }
  };

  const handleNext = async () => {
    if (playlist.length > currentPlaylistIndex + 1) {
      // dispatch(playNext(currentPlaylistIndex + 1));
    }
  };

  return (
    <div className="min-h-[48px] w-full bg-white sticky bottom-14 sm:bottom-0 z-50 flex justify-center">
      <div className="flex flex-col-reverse min-[400px]:flex-row sm:container md:container lg:container w-full px-4 items-center">
        <div className="flex flex-1">
          <div className="m-2 flex items-center gap-2">
            <button
              onClick={handlePrevious}
              type="button"
              className="w-8 h-8 bg-whiteShade rounded-full flex justify-center items-center hover:opacity-90"
            >
              <Previous
                size={20}
                variant="Bold"
                className={
                  currentPlaylistIndex - 1 >= 0
                    ? 'text-dark-500'
                    : 'text-slate-400'
                }
              />
            </button>
            <button
              onClick={() => {
                if (isPlaying) {
                  dispatch(updateIsPlaying(false));
                } else {
                  if (playlist[currentPlaylistIndex]?.url && currentTime == 0) {
                    dispatch(playSong(playlist[currentPlaylistIndex]));
                  } else {
                    dispatch(updateIsPlaying(true));
                  }
                }
              }}
              type="button"
              className="w-10 h-10 bg-accentRed rounded-full flex justify-center items-center hover:opacity-90 shadow-lg"
            >
              {isPlaying ? (
                <Pause size={24} variant="Bold" className="text-white" />
              ) : (
                <Play size={24} variant="Bold" className="text-white" />
              )}
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="w-8 h-8 bg-whiteShade rounded-full flex justify-center items-center hover:opacity-90"
            >
              <Next
                size={20}
                variant="Bold"
                className={
                  playlist.length > currentPlaylistIndex + 1
                    ? 'text-dark-500'
                    : 'text-slate-400'
                }
              />
            </button>
          </div>
          <div className="progress flex-1 flex items-center">
            <span className="current w-12 px-1 text-end">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              ref={progressRef}
              defaultValue={0}
              className="flex-1"
              // onChange={handleProgressChange}
            />
            <span className="w-12 px-1">
              {currentDuration ? formatTime(currentDuration) : '00:00'}
            </span>
          </div>
        </div>
        {playlist[currentPlaylistIndex]?.info ? (
          <div className="flex w-48 items-center ml-2">
            <div className="w-10 h-10 rounded-md overflow-hidden">
              <img
                src="https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg"
                alt="playlist_cover"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col ml-2">
              <div className="text-base line-clamp-1">
                {playlist[currentPlaylistIndex]!.info!.title}
              </div>
              <div className="text-sm line-clamp-1">
                {playlist[currentPlaylistIndex]!.info!.description}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NowPlayingBarV2;
