'use client';

import EditPlaylistPopUp from '@/app/(components)/(popups)/EditPlaylistPopUp';
import WavePlayer from '@/app/(components)/WavePlayer';
import { apiPaths } from '@/core/api/apiConstants';
import { defaultWaveData } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import genresApi from '@/modules/genres/genresApi';
import { NowPlayingType } from '@/modules/genres/genresType';
import {
  addNewPlaylist,
  updateIsPlaying,
} from '@/modules/nowPlaying/nowPlayingReducer';
import playlistApi from '@/modules/playlist/playlistApi';
import {
  PlaylistDetailType,
  PlaylistItemType,
} from '@/modules/playlist/playlistTypes';
import Image from 'next/image';
import {
  DotsThreeOutlineVertical,
  PencilSimple,
  PlayCircle,
  ThumbsUp,
} from 'phosphor-react';
import { useEffect, useState } from 'react';

const PlaylistComponent = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();

  const [nowPlayingItem, setNowPlayingItem] = useState<
    NowPlayingType | undefined
  >(undefined);

  const [currentId, setCurrentId] = useState<number | undefined>(undefined);

  const [isModalOpen, toggleModelOpen] = useState(false);

  const playlistId = useAppSelector(
    (state: RootState) => state.nowPlaying.playlistId
  );

  const isPlaying = useAppSelector(
    (state: RootState) => state.nowPlaying.isPlaying
  );

  const playlist = useAppSelector(
    (state: RootState) => state.nowPlaying.playlist
  );

  const currentPlaylistIndex = useAppSelector(
    (state: RootState) => state.nowPlaying.currentPlaylistIndex
  );

  useEffect(() => {
    if (params.id == undefined) return;
    const fetchData = async () => {
      await dispatch(
        playlistApi.endpoints.getPlaylistFromId.initiate(parseInt(params.id))
      );
      await dispatch(
        playlistApi.endpoints.getPlaylistAudioList.initiate(parseInt(params.id))
      );
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        genresApi.endpoints.getCurrentItem.initiate(
          playlist[currentPlaylistIndex]?.info?.cid!
        )
      );
      setCurrentId(playlist[currentPlaylistIndex]?.info?.cid!);
    };
    if (playlist[currentPlaylistIndex]?.info?.cid != undefined) {
      fetchData();
    }
  }, [currentPlaylistIndex]);

  const playlistDetailData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPlaylistFromId(${params.id})`]
        ?.data as PlaylistDetailType
  );

  const newCurrentItem = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCurrentItem(${currentId})`]
        ?.data as NowPlayingType
  );

  const playlistAudiosList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPlaylistAudioList(${params.id})`]
        ?.data as PaginatedResponseType<PlaylistItemType>
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        genresApi.endpoints.getCurrentItem.initiate(
          playlistAudiosList.data[0].id
        )
      );
      setCurrentId(playlistAudiosList.data[0].id);
    };
    if (
      nowPlayingItem == undefined &&
      playlistAudiosList?.data != undefined &&
      playlistAudiosList.data.length > 0
    ) {
      fetchData();
    }
  }, [playlistAudiosList, nowPlayingItem]);

  useEffect(() => {
    if (newCurrentItem != undefined) {
      setNowPlayingItem(newCurrentItem);
    }
  }, [newCurrentItem]);

  const handlePlayPauseAllComments = async () => {
    if (
      playlistId &&
      playlistDetailData?.id &&
      playlistId == playlistDetailData?.id.toString()
    ) {
      if (isPlaying) {
        dispatch(updateIsPlaying(false));
      } else {
        dispatch(updateIsPlaying(true));
      }
      return;
    }

    if (playlistAudiosList?.data) {
      var audios = playlistAudiosList.data!.map((item) => {
        return {
          url:
            apiPaths.baseUrl +
            '/socialnetwork/audio/stream/' +
            item.audio_id +
            '?isPostAudio=YES',
          duration: item.duration ? parseFloat(item.duration) : 0,
          info: {
            id: item.audio_id,
            title: item.title,
            description: item.owner,
            cid: item.id,
          },
        };
      });
      dispatch(
        addNewPlaylist({
          id: playlistDetailData?.id?.toString(),
          playlist: audios,
        })
      );
    }
  };
  return (
    <div className="w-full h-screen max-h-screen gap-6 pt-10 pb-16 overflow-scroll">
      <div
        className="w-full relative"
        style={{
          background: `linear-gradient(rgb(0,0,0,0.2), rgb(0,0,0,0.4), rgb(0,0,0,0.2))`,
        }}
      >
        <Image
          alt=""
          fill
          objectFit="cover"
          src={nowPlayingItem?.cover_image ?? '/images/audio_no_image.png'}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="-z-10"
        />
        <div className="px-4 py-4">
          <div className="flex gap-2 items-center">
            <div className="w-24 h-24 rounded-md relative">
              <Image
                src={playlistDetailData?.image ?? '/images/audio_no_image.png'}
                alt="song cover image"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-md"
                fill
                objectFit="cover"
              />
            </div>
            <div className="flex-1 text-white">
              <div className="font-medium ">{playlistDetailData?.title}</div>
              <div className="text-sm max-w-[200px]">
                {nowPlayingItem?.title ?? 'No audio'}
              </div>
              <div className="text-xs max-w-[200px]">
                {nowPlayingItem?.owner ?? ''}
              </div>
            </div>
            {playlistDetailData?.isMine ? (
              <div
                className="w-9 h-9 bg-white rounded-md flex justify-center items-center cursor-pointer"
                onClick={() => toggleModelOpen(true)}
              >
                <PencilSimple size={24} className="text-black" />
              </div>
            ) : (
              ''
            )}
          </div>
          {nowPlayingItem != undefined ? (
            <div className="rounded-lg bg-white/10 backdrop-blur-sm mt-2 px-4 py-1">
              <WavePlayer
                onPlay={handlePlayPauseAllComments}
                playBackControls={true}
                controls={true}
                audioItem={{
                  url: nowPlayingItem?.audio
                    ? apiPaths.baseUrl +
                      '/socialnetwork/audio/stream/' +
                      nowPlayingItem?.audio?.id +
                      '?isPostAudio=YES'
                    : '',
                  duration: parseFloat(
                    nowPlayingItem?.audio?.file_duration || '0'
                  ),
                  info: {
                    title: nowPlayingItem?.audio
                      ? nowPlayingItem?.audio?.title || nowPlayingItem?.title
                      : nowPlayingItem?.title,
                    description: nowPlayingItem.owner ?? '',
                  },
                }}
                theme="dark"
                audioWaveData={
                  nowPlayingItem.audio?.wave_data != undefined
                    ? nowPlayingItem.audio.wave_data
                    : JSON.stringify(defaultWaveData)
                }
                size="large"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="border-b-2 flex justify-between items-center px-4 h-12">
        <h2 className="text-base mb-0 ">{playlistDetailData?.title ?? ''}</h2>
        <span className="text-sm"></span>
      </div>
      <div className="flex flex-col my-2 gap-1">
        {playlistAudiosList?.data.map((item, index) => (
          <div
            role="button"
            key={index}
            // onClick={() => toggleSongsId(index)}
            className="flex px-4 py-2 gap-2 items-center"
          >
            <PlayCircle size={42} className="rounded-full" weight="fill" />
            <div className="grow flex flex-col">
              <p className="text-base font-medium">{item.title}</p>
              <div className="text-slate-500 text-xs">
                {item.owner} • {item.duration}
              </div>
            </div>
            <div className="flex gap-2">
              <ThumbsUp size={24} />
              <DotsThreeOutlineVertical size={24} />
            </div>
          </div>
        ))}
      </div>
      {playlistDetailData ? (
        <EditPlaylistPopUp
          isModalOpen={isModalOpen}
          toggleModelOpen={toggleModelOpen}
          playlist={playlistDetailData}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PlaylistComponent;
