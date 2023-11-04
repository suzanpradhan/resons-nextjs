'use client';

import SearchBar from '@/app/(components)/SearchBar';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import playlistApi from '@/modules/playlist/playlistApi';
import { PlaylistDetailType } from '@/modules/playlist/playlistTypes';
import { useEffect } from 'react';
import PlayListScroll from '../profile/(components)/PlayListScroll';
import MyPlaylistListing from './(components)/MyPlaylistListing';

export default function PlaylistPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(playlistApi.endpoints.getMyPlaylistList.initiate());
  }, [dispatch]);

  const playlistData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMyPlaylistList`]?.data as PlaylistDetailType[]
  );
  return (
    <div className="sm:container md:container lg:container mx-auto mb-[4.6rem] min-h-screen" style={{ overflowY: 'auto' }}>
      <div className="sm:px-0 py-4 mx-4">
        <SearchBar />
      </div>
      {playlistData ? (
        <MyPlaylistListing playlists={playlistData} />
      ) : (
        <>
          <div className="bg-white mb-4 px-4 py-4 mx-4">
            <div className="flex animate-pulse">
              <div className="flex-shrink-0">
                <span className="w-12 h-12 block bg-gray-300 rounded-full dark:bg-gray-300"></span>
              </div>
              <div className="ml-4 mt-2 w-full">
                <h3
                  className="h-4 bg-gray-300 rounded-md dark:bg-gray-300"
                  style={{ width: '40%' }}
                ></h3>
                <ul className="mt-5 space-y-3">
                  <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                  <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                  <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                  <li className="w-full h-4 bg-gray-300 rounded-md dark:bg-gray-300"></li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      <PlayListScroll />
    </div>
  );
}
