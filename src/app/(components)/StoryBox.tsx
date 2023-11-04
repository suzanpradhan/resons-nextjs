/* eslint-disable @next/next/no-img-element */
'use client';

import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import storyApi from '@/modules/story/storyApi';
import { MyStoryDetailType, StoryDetailType } from '@/modules/story/storyType';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ViewMyStoryCarouselV2 from './(carousel)/ViewMyStoryCarouselV2';
import ViewStoryCarouselV2 from './(carousel)/ViewStoryCarouselV2';
import CreatePopUp from './(popups)/CreatePopUp';

const StoryBox = () => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedStory, setSelectedStory] = useState<
    StoryDetailType[] | undefined
  >(undefined);
  const [selectedMyStory, setSelectedMyStory] = useState<
    MyStoryDetailType[] | undefined
  >(undefined);

  useEffect(() => {
    dispatch(storyApi.endpoints.getUserStoryList.initiate());
  }, [dispatch]);

  const storyListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getUserStoryList`]?.data as {
        [key: number]: StoryDetailType[];
      }
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(storyApi.endpoints.getMyStoryList.initiate());
    };
    fetchData();
  }, [dispatch]);

  const myStoryListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMyStoryList`]?.data as MyStoryDetailType[]
  );

  return (
    <>
      <div className="pt-4 overflow-y-scroll full-hide-scrollbar">
        <ul className="flex space-x-4">
          <li className="flex flex-col items-center space-y-1 w-16">
            <div
              className={`relative p-1 rounded-full ${
                myStoryListData && myStoryListData[0]?.owner
                  ? 'bg-gradient-to-tr from-[#2E3192] to-[#1BFFFF]'
                  : ''
              }`}
            >
              <div
                onClick={() => setSelectedMyStory(myStoryListData)}
                className="block bg-white p-1 rounded-full transform transition hover:-rotate-6"
              >
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img
                    src={
                      session.data?.user?.profile_image ?? '/images/avatar.jpg'
                    }
                    alt="post_owner_avatar"
                    onError={(e) => {
                      (e.target as any).onError = '/images/avatar.jpg';
                      (e.target as any).src = '/images/avatar.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowCreate(true)}
                className="absolute bg-blue-500 text-white text-xl font-medium w-5 h-5 rounded-full bottom-0 right-1 border-2 border-white flex justify-center items-center font-mono hover:bg-blue-700 focus:outline-none"
              >
                <div className="transform -translate-y-px">+</div>
              </button>
            </div>

            <a href="/profile" className="truncate w-[60px] text-sm font-bold">
              {myStoryListData
                ? myStoryListData[0]?.owner.name
                : session.data?.user?.name}
            </a>
          </li>

          {storyListData && Object.keys(storyListData)?.length > 0 ? (
            <>
              {storyListData &&
                Object.entries(storyListData).map(([key, stories], index) => (
                  <li
                    onClick={() => setSelectedStory(stories)}
                    key={`story_${key}`}
                    className="flex flex-col items-center space-y-1 w-16"
                  >
                    <div className="bg-gradient-to-tr from-[#2E3192] to-[#1BFFFF] p-1 rounded-full">
                      <a
                        href="#"
                        className="block bg-white p-1 rounded-full transform transition hover:-rotate-6"
                      >
                        <div className="w-12 h-12 overflow-hidden rounded-full">
                          <img
                            src={
                              stories[0].profile_image &&
                              stories[0].profile_image != null
                                ? apiPaths.rootPath +
                                  '/storage/' +
                                  stories[0].profile_image
                                : '/images/avatar.jpg'
                            }
                            alt="post_owner_avatar"
                            onError={(e) => {
                              (e.target as any).onError = '/images/avatar.jpg';
                              (e.target as any).src = '/images/avatar.jpg';
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </a>
                    </div>

                    <a href="#" className="truncate w-[60px]">
                      {stories[0].owner_name}
                    </a>
                  </li>
                ))}
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>

      {/* popup */}
      {selectedMyStory ? (
        <>
          <ViewMyStoryCarouselV2
            story={selectedMyStory}
            onClose={() => {
              setSelectedMyStory(undefined);
            }}
          />
        </>
      ) : (
        <></>
      )}

      {selectedStory ? (
        <>
          <ViewStoryCarouselV2
            story={selectedStory}
            onClose={() => {
              setSelectedStory(undefined);
            }}
          />
        </>
      ) : (
        <></>
      )}

      {showCreate ? (
        <CreatePopUp onClose={() => setShowCreate(false)} />
      ) : (
        <></>
      )}
    </>
  );
};

export default StoryBox;
