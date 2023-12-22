'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import playlistApi from '@/modules/playlist/playlistApi';
import { PlaylistDetailType } from '@/modules/playlist/playlistTypes';
import { Add, CloseCircle } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface postData {
  audio_id: number | undefined;
  title: string | undefined;
}

interface PlayListProps {
  postData: postData;
  onClose?: () => void;
}

const PlayListPopUp = (props: PlayListProps) => {
  const dispatch = useAppDispatch();
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistDesc, setPlaylistDesc] = useState('');
  const [selectedValue, setSelectedValue] = useState('0');
  const [selectPrivacy, setSelectPrivacy] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [showPlaylistAdd, setShowPlaylistAdd] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    dispatch(playlistApi.endpoints.getPlaylistListMin.initiate());
  }, [dispatch]);

  const getPlayListMin = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPlaylistListMin`]?.data as PlaylistDetailType[]
  );

  const handelPlaylistValue = (event: any) => {
    setSelectedValue(event.target.value);
    setSelectedPlaylist(event.target.options[event.target.selectedIndex].text);
  };

  const handlePlaylistTitleChange = (event: any) => {
    setPlaylistTitle(event.target.value);
  };

  const handlePlaylistDescChange = (event: any) => {
    setPlaylistDesc(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    if (props.postData?.audio_id) {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        await Promise.resolve(
          dispatch(
            playlistApi.endpoints.addPostOnPlaylist.initiate({
              playlist_id: selectedValue,
              post_id: props.postData!.audio_id,
            })
          )
        );
        setSelectedValue('');
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  const handleAddPlaylistSubmit = async (event: any) => {
    setIsLoading2(true);
    event.preventDefault();
    if (props.postData?.audio_id) {
      if (isLoading) {
        return;
      }
      setIsLoading2(true);
      try {
        await Promise.resolve(
          dispatch(
            playlistApi.endpoints.addPlaylist.initiate({
              title: playlistTitle,
              description: playlistDesc,
              privacy_code: selectPrivacy,
            })
          )
        );
        setSelectPrivacy(0);
        setPlaylistDesc('');
        setPlaylistTitle('');
        // navigate.push('/');
      } catch (error) {
        console.log(error);
      }
      setIsLoading2(false);
      setShowPlaylistAdd(false);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute w-[90%] md:w-[30%] top-[60px] md:top-[10%]">
          <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rounded-sm transition-all ease-in-out duration-500">
            <div className="flex items-center justify-between border-b py-2 px-3">
              <h3 className="text-base text-gray-600 font-semibold">
                Playlist
              </h3>
              <button
                className="ml-auto bg-transparent border-0 text-gray-800 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={props.onClose}
              >
                <CloseCircle size="30" color="gray" variant="Outline" />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center">
                  <div className="py-1 px-2 w-full bg-gray-100 rounded-sm">
                    <div className="basis-auto w-full border-b-gray-500">
                      <select
                        id="playlist"
                        value={selectedValue}
                        onChange={handelPlaylistValue}
                        className="bg-transparent text-sm text-gray-500 w-full mb-0 font-light focus:outline-none"
                      >
                        <option value="">Select Playlist</option>
                        {getPlayListMin?.length > 0 ? (
                          <>
                            {getPlayListMin?.map((value, index) => (
                              <option value={value.id} key={index}>
                                {value.title}
                              </option>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </select>
                    </div>
                    <input type="hidden" value={props.postData.audio_id} />
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="flex justify-center items-center border-none bg-gray-400 h-[32px] w-[32px] ml-3 rounded-sm hover:bg-gray-500"
                      onClick={(event) => {
                        event.preventDefault();
                        setShowPlaylistAdd(!showPlaylistAdd);
                      }}
                    >
                      <Add size="18" color="white" />
                    </button>
                  </div>
                </div>

                <div className="my-2">
                  <h3 className="text-sm font-light text-gray-500">
                    You are adding{' '}
                    <span className="text-sm font-bold capitalize text-gray-700">
                      {props.postData.title}
                    </span>{' '}
                    to{' '}
                    <span className="text-sm font-bold capitalize text-gray-700">
                      {selectedPlaylist}
                    </span>
                  </h3>
                </div>

                <hr className="mt-4 mb-3" />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex justify-center items-center border border-red-400 rounded-sm text-red-400 px-4 py-1 text-xs"
                  >
                    {isLoading ? (
                      <>
                        <Add size="18" color="red" /> Loading...
                      </>
                    ) : (
                      <>
                        <Add size="18" color="red" /> Add to Playlist
                      </>
                    )}
                  </button>
                </div>
              </form>
              {showPlaylistAdd ? (
                <>
                  <div className="">
                    <form onSubmit={handleAddPlaylistSubmit}>
                      <h3 className="text-gray-700 text-sm font-medium mt-4">
                        Add new playlist
                      </h3>
                      <div className="bg-gray-100 p-2 rounded-sm">
                        <div className="relative z-0 pt-4">
                          <input
                            type="text"
                            id="title"
                            value={playlistTitle}
                            onChange={handlePlaylistTitleChange}
                            className="block pt-2.5 pb-1 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b border-gray-100 appearance-none dark:text-gray-500 dark:border-gray-200 dark:focus:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor="title"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform translate-y-0 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-800 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-5 peer-focus:scale-75 peer-focus:-translate-y-0"
                          >
                            Title
                          </label>
                        </div>
                        <div className="relative z-0 pt-4">
                          <textarea
                            id="desc"
                            value={playlistDesc}
                            onChange={handlePlaylistDescChange}
                            className="block pt-2.5 pb-1 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b border-gray-100 appearance-none dark:text-gray-500 dark:border-gray-200 dark:focus:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                            placeholder=" "
                          ></textarea>
                          <label
                            htmlFor="desc"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform translate-y-0 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-800 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-5 peer-focus:scale-75 peer-focus:-translate-y-0"
                          >
                            Description
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end my-4">
                        <button
                          type="submit"
                          className="flex justify-center items-center border border-green-500 rounded-sm text-gray-500 px-4 py-1 text-xs"
                        >
                          {isLoading2 ? (
                            <>
                              <Add size="18" color="green" /> Loading...
                            </>
                          ) : (
                            <>
                              <Add size="18" color="green" /> add new playlist
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-70 fixed inset-0 z-40 bg-gray-800 cursor-pointer"></div>
    </>
  );
};

export default PlayListPopUp;
