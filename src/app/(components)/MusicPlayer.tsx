'use client';

import { apiPaths } from '@/core/api/apiConstants';
import { defaultWaveData } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import genresApi from '@/modules/genres/genresApi';
import {
  GenrePlaylist,
  GenresDetailType,
  NowPlayingType,
} from '@/modules/genres/genresType';
import {
  addNewPlaylist,
  updateIsPlaying,
} from '@/modules/nowPlaying/nowPlayingReducer';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import { DotsThreeOutlineVertical, PlayCircle, ThumbsUp } from 'phosphor-react';
import { useEffect, useState } from 'react';
import WavePlayer from './WavePlayer';

interface MusicPlayerType {
  params: Params;
}

const MusicPlayer = ({ params }: MusicPlayerType) => {
  // const getCategoryName = params.categories[1];
  // const convertToString = getCategoryName.replace(/%20/g, ' '); //Replace %20 by " "

  const [categoryName, setCategoryName] = useState(
    params.categories[1].replace(/%20/g, ' ')
  );
  const [genreDetail, setGenreDetail] = useState<GenresDetailType | undefined>(
    undefined
  );

  const [nowPlayingItem, setNowPlayingItem] = useState<
    NowPlayingType | undefined
  >(undefined);

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    setNowPlayingItem(undefined);
    const fetchData = async () => {
      await dispatch(
        genresApi.endpoints.requestGenrePlaylist.initiate(categoryName)
      );
    };
    fetchData();
  }, [categoryName]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        genresApi.endpoints.getCurrentItem.initiate(
          playlist[currentPlaylistIndex]?.info?.cid!
        )
      );
    };
    if (playlist[currentPlaylistIndex]?.info?.cid != undefined) {
      fetchData();
    }
  }, [currentPlaylistIndex]);

  const newCurrentItem = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries.getCurrentItem?.data as NowPlayingType
  );

  const postsListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries.requestGenrePlaylist?.data as GenrePlaylist
  );

  useEffect(() => {
    if (genreDetail == undefined && postsListData?.genre != undefined) {
      setGenreDetail(postsListData.genre);
    }

    if (nowPlayingItem == undefined && postsListData?.nowPlaying != undefined) {
      setNowPlayingItem(postsListData.nowPlaying);
    }
  }, [postsListData, genreDetail, nowPlayingItem]);

  useEffect(() => {
    if (newCurrentItem != undefined) {
      setNowPlayingItem(newCurrentItem);
    }
  }, [newCurrentItem]);

  const handlePlayPauseAllComments = async () => {
    if (
      playlistId &&
      genreDetail?.id &&
      playlistId == genreDetail?.id.toString()
    ) {
      if (isPlaying) {
        dispatch(updateIsPlaying(false));
      } else {
        dispatch(updateIsPlaying(true));
      }
      return;
    }

    if (postsListData) {
      var audios = postsListData!.items.data.map((item) => {
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
          id: genreDetail?.id?.toString(),
          playlist: audios,
        })
      );
    }
  };

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
              {postsListData?.genre?.image != undefined ? (
                <Image
                  src={postsListData.genre.image ?? '/images/default.jpg'}
                  alt="song cover image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="-z-10 rounded-md"
                  fill
                  objectFit="cover"
                />
              ) : (
                <></>
              )}
            </div>
            <div className="text-white max-w-[200px]">
              <div className="font-medium max-w-[200px]">
                {genreDetail?.title}
              </div>
              <div className="text-sm">
                {nowPlayingItem?.title ?? 'No audio'}
              </div>
              <div className="text-xs">{nowPlayingItem?.owner ?? ''}</div>
            </div>
          </div>

          <div className="rounded-lg bg-white/10 backdrop-blur-sm mt-2 px-4 py-1">
            {nowPlayingItem && (
              <WavePlayer
                onPlay={handlePlayPauseAllComments}
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
            )}
          </div>
        </div>
      </div>
      <div className="border-b-2 flex justify-between items-center px-4 h-12">
        <h2 className="text-base mb-0 ">{categoryName}</h2>
        <span className="text-sm"></span>
      </div>
      <div className="flex flex-col my-2 gap-1">
        {postsListData?.items.data.map((item, index) => (
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
    </div>
  );
};

export default MusicPlayer;
