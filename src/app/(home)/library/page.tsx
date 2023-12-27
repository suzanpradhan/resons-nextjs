'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import playlistApi from '@/modules/playlist/playlistApi';
import { PlaylistDetailType } from '@/modules/playlist/playlistTypes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Plus } from 'phosphor-react';
import { useEffect } from 'react';
import MyPlaylistListing from './(components)/MyPlaylistListing';

export default function PlaylistPage() {
  const dispatch = useAppDispatch();
  const navigator = useRouter();
  const session = useSession();

  useEffect(() => {
    dispatch(playlistApi.endpoints.getPopularPlaylistList.initiate());
    dispatch(playlistApi.endpoints.getNewReleasesPlaylistList.initiate());
  }, [dispatch]);

  const myPlaylistData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMyPlaylistList`]
        ?.data as PaginatedResponseType<PlaylistDetailType>
  );

  useEffect(() => {
    if (myPlaylistData == undefined && session.data?.user != undefined) {
      dispatch(playlistApi.endpoints.getMyPlaylistList.initiate());
    }
  }, [session.data?.user]);

  const popularPlaylistData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPopularPlaylistList`]
        ?.data as PaginatedResponseType<PlaylistDetailType>
  );

  const newReleasesPlaylistData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getNewReleasesPlaylistList`]
        ?.data as PaginatedResponseType<PlaylistDetailType>
  );

  const handleCreateNewPlaylist = async () => {
    const response = await dispatch(
      playlistApi.endpoints.addDefaultPlaylist.initiate()
    );
    // dispatch(genresApi.endpoints.getCurrentItem.util.resetApiState());
    if ((response as any).data) {
      navigator.push('playlist/' + (response as any).data.id);
    }
  };
  return (
    <div className="w-full h-screen max-h-screen bg-white pb-16 overflow-scroll">
      {/* <div className="sm:px-0 py-4 mx-4">
        <SearchBar />{' '}
      </div> */}
      {/* {playlistData ? (
        <MyPlaylistListing playlists={playlistData} />
      ) : ( */}
      <>
        <div className="mt-12"></div>
        {myPlaylistData?.data ? (
          <div className="mt-4 w-screen overflow-hidden">
            <div className="px-4 font-medium flex justify-between text-base mb-3">
              <div>My Playlists</div>
              <button onClick={() => navigator.push('library/myPlaylists')}>
                <Plus size={24} weight="light" />
              </button>
            </div>

            <MyPlaylistListing playlists={myPlaylistData.data} />
            <div className="mx-4 ">
              <button
                type="button"
                onClick={handleCreateNewPlaylist}
                className=" w-full mt-4 py-2 flex justify-center gap-2 border-[1px] px-2 rounded-md border-[#b3adad] bg-whiteShade"
              >
                <Plus size={24} />
                <span>Create new Playlist</span>
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="mt-4 w-screen overflow-hidden">
          <div className="px-4 font-medium text-base mb-3">Popular</div>
          {popularPlaylistData?.data ? (
            <MyPlaylistListing playlists={popularPlaylistData.data} />
          ) : (
            <div className="inline-flex overflow-hidden animate-pulse">
              <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
              <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
              <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
              <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
            </div>
          )}
        </div>
        <div className="mt-4 w-screen overflow-hidden">
          <div className="px-4 font-medium text-base mb-3">New Releases</div>
          {newReleasesPlaylistData?.data ? (
            <MyPlaylistListing playlists={newReleasesPlaylistData.data} />
          ) : (
            <div className="inline-flex overflow-hidden animate-pulse">
              <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
              <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
              <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
              <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
            </div>
          )}
        </div>
        <div className="mt-4 w-screen overflow-hidden">
          <div className="px-4 font-medium text-base mb-3">
            Artists Playlists
          </div>
          <div className="inline-flex overflow-hidden animate-pulse">
            <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
            <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
            <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
            <div className="w-32 h-32 ml-4 bg-grey-200 rounded-lg"></div>
          </div>
        </div>
      </>
      {/* )} */}

      {/* <PlayListScroll /> */}
    </div>
  );
}
