import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import playlistApi from '@/modules/playlist/playlistApi';
import { PlaylistDetailType } from '@/modules/playlist/playlistTypes';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'phosphor-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CommonPopup from './CommonPopup';

interface AddToPlaylistPopupType {
  toggleModelOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const PLAYLIST_LIST = [
  { id: 0, name: 'Playlist 1', image: '/images/avatar.jpg' },
  { id: 1, name: 'Playlist 1', image: '/images/cover.webp' },
  { id: 2, name: 'Playlist 1', image: '/images/avatar.jpg' },
  { id: 3, name: 'Playlist 1', image: '/images/avatar.jpg' },
  { id: 4, name: 'Playlist 1', image: '/images/cover.webp' },
  { id: 5, name: 'Playlist 1', image: '/images/avatar.jpg' },
];

const AddToPlaylistPopup = ({
  toggleModelOpen,
  isModalOpen,
}: AddToPlaylistPopupType) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(0);
  const dispatch = useAppDispatch();

  const handleAddButtonClick = async (id: number) => {
    console.log(id);
    try {
      const responseData = await Promise.resolve(
        dispatch(
          playlistApi.endpoints.addAudioOnPlaylist.initiate({
            audio_id: id,
            playlist_id: '1',
          })
        )
      );
      console.log(responseData);
      toggleModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const playlistList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getMyPlaylistList']?.data as PlaylistDetailType[]
  );

  useEffect(() => {
    dispatch(
      playlistApi.endpoints.getMyPlaylistList.initiate(undefined, {
        forceRefetch: true,
      })
    );
  }, [dispatch]);

  // const playlistList = async () => {
  //   const response = await playlistApi.endpoints.getMyPlaylistList;

  // console.log(playlistList);
  // const playlistList = playlistApi.endpoints.getMyPlaylistList.initiate();
  // console.log(playlistList);

  return (
    <CommonPopup
      isModalOpen={isModalOpen}
      toggleModelOpen={toggleModelOpen}
      popupName="Add To Playlist"
      className="rounded-lg"
    >
      <input type="text" placeholder="search" />
      <div className="flex flex-col gap-2 my-4 h-[300px] overflow-y-scroll">
        {PLAYLIST_LIST.map((item, index) => (
          <div
            key={index}
            className={classNames(
              'flex gap-2 items-center p-3 rounded-md',
              selectedPlaylist == item.id && 'bg-[#e9e7e7]'
            )}
            onClick={() => setSelectedPlaylist(item.id)}
          >
            <div className="w-14 h-14 relative">
              <Image
                className="rounded"
                src={item.image}
                alt="Playlist Image"
                fill
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <span className="w-44 font-semibold">{item.name}</span>
            {selectedPlaylist == item.id && (
              <button
                className="bg-red-400 px-4 py-1 rounded text-white"
                onClick={(e) => handleAddButtonClick(item.id)}
              >
                Add
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="shadow-upper -mx-4 pt-4 px-4 -mb-4 pb-4">
        <Link
          href="/library/createNewPlaylist"
          className="flex items-center gap-2 "
        >
          <span className="bg-[#e9e7e7] p-2 rounded">
            <Plus size={32} />
          </span>
          <span className="text-lg">Create New Playlist</span>
        </Link>
      </div>
    </CommonPopup>
  );
};

export default AddToPlaylistPopup;
