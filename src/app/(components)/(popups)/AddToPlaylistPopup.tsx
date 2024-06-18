import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import TextField from '@/core/ui/components/TextField';
import playlistApi from '@/modules/playlist/playlistApi';
import { PlaylistDetailType } from '@/modules/playlist/playlistTypes';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'phosphor-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CommonPopup from './CommonPopup';

interface AddToPlaylistPopupType {
  toggleModelOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  postId: number;
}

const AddToPlaylistPopup = ({
  toggleModelOpen,
  isModalOpen,
  postId,
}: AddToPlaylistPopupType) => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAddButtonClick = async (id: number) => {
    try {
      const responseData = await Promise.resolve(
        dispatch(
          playlistApi.endpoints.addPostOnPlaylist.initiate({
            post_id: postId,
            playlist_id: id.toString(),
          })
        )
      );
      toggleModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const playlistList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getMyPlaylistList']
        ?.data as PaginatedResponseType<PlaylistDetailType>
  );

  useEffect(() => {
    if (session?.data?.user != undefined && playlistList == undefined) {
      dispatch(playlistApi.endpoints.getMyPlaylistList.initiate());
    }
  }, [dispatch, session.data?.user]);

  // const playlistList = async () => {
  //   const response = await playlistApi.endpoints.getMyPlaylistList;

  // console.log(playlistList);
  // const playlistList = playlistApi.endpoints.getMyPlaylistList.initiate();
  // console.log(playlistList);

  return (
    <CommonPopup
      isModalOpen={isModalOpen}
      toggleModelOpen={toggleModelOpen}
      popupName="Add to playlist"
      className="rounded-lg w-screen"
    >
      <div className="w-full">
        <div className="px-4">
          <TextField
            id="search"
            type="text"
            placeholder="Search"
            decorationclassname="bg-transparent border-gray-400 placeholder:text-gray-400"
            // {...formik.getFieldProps('date_of_birth')}
          />
        </div>
        <div className="flex flex-col min-h-[200px] overflow-y-scroll pt-2 px-2">
          {playlistList &&
            playlistList?.data.map((item, index) => (
              <div
                key={index}
                className={
                  'flex p-2 items-center rounded-md group cursor-pointer hover:bg-white ' +
                  (selectedIndex == item.id ? 'bg-white' : 'bg-transparent')
                }
                onClick={() => {
                  setSelectedIndex(selectedIndex != item.id ? item.id ?? 0 : 0);
                }}
              >
                <div className="w-14 h-14 relative">
                  <Image
                    className="rounded"
                    src={item.image ?? '/images/cover.webp'}
                    alt="Playlist Image"
                    fill
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <span className="flex-1 font-normal pl-2">{item.title!}</span>
                <button
                  className={
                    'bg-accent px-4 py-1 rounded text-white group-hover:visible ' +
                    (selectedIndex == item.id ? 'visible' : 'invisible')
                  }
                  onClick={() => handleAddButtonClick(item.id!)}
                >
                  Add
                </button>
              </div>
            ))}
        </div>
        <div className="">
          <Link
            href="/library/createNewPlaylist"
            className="flex items-center gap-2 px-4 py-2 bg-white"
          >
            <span className="p-2 rounded bg-gray-100">
              <Plus size={24} />
            </span>
            <span className="text-base font-medium">Create New Playlist</span>
          </Link>
        </div>
      </div>
    </CommonPopup>
  );
};

export default AddToPlaylistPopup;
