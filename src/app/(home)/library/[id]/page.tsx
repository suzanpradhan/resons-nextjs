/* eslint-disable @next/next/no-img-element */
'use client';

import  WavePlayer from '@/app/(components)/WavePlayer';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { AudioDetailType } from '@/modules/audio/audioType';
import { NowPlayingAudioItem } from '@/modules/nowPlaying/nowPlayingAudioType';
import {
  addNewPlaylist,
  playNext,
  updateIsPlaying,
} from '@/modules/nowPlaying/nowPlayingReducer';
import playlistApi from '@/modules/playlist/playlistApi';
import { Next, Pause, Play, Previous } from 'iconsax-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlaylistAudioCard from '../(components)/PlaylistAudioCard';

export default function PlaylistEachPage({
  params,
}: {
  params: { id: number };
}) {
  const dispatch = useAppDispatch();
  const [audioIndex, setAudioIndex] = useState<number>(0);
  const searchParams = useSearchParams();

  const playlistId = useSelector(
    (state: RootState) => state.nowPlaying.playlistId
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

  // useEffect(() => {
  //   dispatch(playlistApi.endpoints.getPlaylistAudioList.initiate(params.id));
  // }, [dispatch, params.id])

  useEffect(() => {
    dispatch(playlistApi.endpoints.getPlaylistAudioList.initiate(params.id));
  }, [dispatch, params.id]);

  const playlistAudioData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPlaylistAudioList`]?.data as AudioDetailType[]
  );

  // const handlePrevious = async () => {
  //   if (currentPlaylistIndex - 1 >= 0) {
  //     dispatch(playNext(currentPlaylistIndex - 1));
  //   }
  // };

  // const handleNext = async () => {
  //   if (playlist.length > currentPlaylistIndex + 1) {
  //     dispatch(playNext(currentPlaylistIndex + 1));
  //   }
  // };

  const handlePlayPauseAllComments = async () => {
    if (playlistId && params.id && playlistId == params.id.toString()) {
      if (isPlaying) {
        dispatch(updateIsPlaying(false));
      } else {
        dispatch(updateIsPlaying(true));
      }
      return;
    }

    if (playlistAudioData) {
      var audios = playlistAudioData!.map((audio) => {
        return {
          url: apiPaths.baseUrl + '/socialnetwork/audio/stream/' + audio.id!,
          duration: audio.file_duration ? parseFloat(audio.file_duration) : 0,
          info: {
            // title: audio.title ?? audio.file_name,
            title: '',
            description: '',
          },
        };
      });
      dispatch(
        addNewPlaylist({
          id: params.id?.toString(),
          playlist: audios,
        })
      );
    }
  };
  const handleEachPlayPause = ({
    audio,
    index,
  }: {
    audio: AudioDetailType;
    index: number;
  }) => {
    if (
      playlist[currentPlaylistIndex]?.url ==
      apiPaths.baseUrl + '/socialnetwork/audio/stream/' + audio?.id
    ) {
      if (isPlaying) {
        dispatch(updateIsPlaying(false));
      } else {
        dispatch(updateIsPlaying(true));
      }
    } else {
      if (playlist[index]) {
        //dispatch(playNext(index));
      }
    }
  };

  return (
    <div className="container mx-auto mb-20 sm:my-5 sm:px-4 min-h-screen">
      <div className="">
        <div className="bg-white rounded-sm shadow-lg">
          <div className="py-5 px-5 bg-slate-100">
            <div className="">
              <div className="flex">
                <div className="w-full basis-[10%]">
                  <div className="w-[90px] md:w-[150px] h-[90px] md:h-[150px] rounded-sm overflow-hidden shadow-xl">
                    <img
                      src="https://lh4.googleusercontent.com/1KhTU6BWGm_8lVaVuEWxPcNKS4r0KB_njoaWjtuGMq12IaJ1xn7lSlDR8mdQjjkSoce3S59xAN1Aa96TRzePcHmpc-kJ6MkyuYVJ41OGX5Gj147pyG5uknAEqXAZ-bOTneJeEovUqQmbrqjWfXu8SLk"
                      alt="post_owner_avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full basis-[90%] pl-5">
                  <h3 className="text-base sm:text-xl text-gray-800 font-bold capitalize">
                    {searchParams?.get('title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-normal uppercase mt-1">
                    {searchParams?.get('description')}
                  </p>
                  {playlistAudioData && audioIndex ? (
                    <p className="text-xs sm:text-sm text-gray-700 font-medium uppercase mt-1">
                      Now Playing:{' '}
                      {/* {playlistAudioData[audioIndex]?.title ??
                        playlistAudioData[audioIndex]?.file_name} */}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {playlistAudioData && playlistAudioData.length > 0 ? (
                <div className="flex mt-3">
                  <div className="w-full basis-[10%]">
                    <div className="w-[90px] md:w-[150px] flex justify-between items-center">
                      <button
                    
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
                        type="button"
                        className="border-none rounded-full bg-red-500 p-2"
                        onClick={handlePlayPauseAllComments}
                      >
                        {playlistId &&
                        playlistId == params.id?.toString() &&
                        isPlaying ? (
                          <Pause size="20" color="#fff" variant="Bulk" />
                        ) : (
                          <Play size="20" color="#fff" variant="Bulk" />
                        )}
                      </button>
                      <button
                        //onClick={handleNext}
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
                  </div>
                  <div className="w-full basis-[90%] pl-5 mt-[3px]">
                    {playlistAudioData.length > 0 ? (
                      <WavePlayer
                        audioItem={{
                          url:
                            apiPaths.baseUrl +
                            '/socialnetwork/audio/stream/' +
                            playlistAudioData[
                              playlistId &&
                              params.id &&
                              playlistId == params.id.toString()
                                ? currentPlaylistIndex ?? 0
                                : 0
                            ].id,
                          duration: playlistAudioData[
                            playlistId &&
                            params.id &&
                            playlistId == params.id.toString()
                              ? currentPlaylistIndex ?? 0
                              : 0
                          ].file_duration
                            ? parseFloat(
                                playlistAudioData[
                                  playlistId &&
                                  params.id &&
                                  playlistId == params.id.toString()
                                    ? currentPlaylistIndex ?? 0
                                    : 0
                                ].file_duration
                              )
                            : 0,
                        }}
                        controls={false}
                        audioWaveData={
                          playlistAudioData[
                            playlistId &&
                            params.id &&
                            playlistId == params.id.toString()
                              ? currentPlaylistIndex ?? 0
                              : 0
                          ]?.wave_data
                        }
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="">
            <div className="">
              {playlistAudioData &&
                playlistAudioData.map((audio, index) => {
                  return (
                    <PlaylistAudioCard
                      playlistId={params.id}
                      audio={audio}
                      index={index}
                      key={'audio_' + index}
                      isPlaying={
                        isPlaying &&
                        playlist[currentPlaylistIndex]?.url ==
                          apiPaths.baseUrl +
                            '/socialnetwork/audio/stream/' +
                            audio?.id
                      }
                      onPlay={() => {
                        setAudioIndex(index);
                        handleEachPlayPause({
                          audio: audio,
                          index: index,
                        });
                      }}
                    />
                  );
                })}

              {/* new design replace letter */}

              {/* <div className="py-2 first-of-type:pt-4 last-of-type:pb-4 px-5 hover:bg-slate-100 cursor-pointer">
                <div className="flex items-start">
                  <div className="w-[45px] md:w-[50px] h-auto md:h-[50px] rounded-full overflow-hidden shadow-xl">
                    <img
                      src="https://lh4.googleusercontent.com/1KhTU6BWGm_8lVaVuEWxPcNKS4r0KB_njoaWjtuGMq12IaJ1xn7lSlDR8mdQjjkSoce3S59xAN1Aa96TRzePcHmpc-kJ6MkyuYVJ41OGX5Gj147pyG5uknAEqXAZ-bOTneJeEovUqQmbrqjWfXu8SLk"
                      alt="post_owner_avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full basis-[90%] pl-2">
                    <h3 className="text-sm sm:text-base text-gray-800 font-bold capitalize">
                      Give It All
                    </h3>
                    <p className="text-xs text-gray-700 font-normal uppercase">
                      LUCAS CHAMBON
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
