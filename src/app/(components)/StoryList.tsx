import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import storyApi from '@/modules/story/storyApi';
import { StoryListType } from '@/modules/story/storyType';
import { CaretDown, CaretUp } from 'phosphor-react';
import { useEffect, useState } from 'react';
import StoryCard from './StoryCard';

const StoryList = () => {
  const dispatch = useAppDispatch();
  const [showAll, setShowAll] = useState(false);
  const toggleStoryView = () => {
    setShowAll(!showAll);
  };

  const storyList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getUserStoryList']?.data as StoryListType
  );

  useEffect(() => {
    dispatch(
      storyApi.endpoints.getUserStoryList.initiate(undefined, {
        forceRefetch: true,
      })
    );
  }, [dispatch]);

  return storyList?.data && storyList?.data?.length ? (
    <div className="relative flex items-center flex-col w-full max-w-3xl rounded-lg backdrop-blur-sm transition-all">
      <div
        className={`h-[88px] overflow-hidden transition-all !duration-500 w-full ${
          showAll ? '!h-[350px] !overflow-y-auto' : ''
        }`}
        id="story-wrapper"
      >
        {storyList?.data &&
          storyList?.data?.length &&
          storyList.data.map((story) => {
            return <StoryCard key={story?.story_id} story={story} />;
          })}
      </div>
      <div className="max-w-3xl relative flex justify-center w-full bg-black/10 ">
        <span className="absolute left-2 text-sm text-black top-1/2 -translate-y-1/2">
          {showAll
            ? `Total ${storyList?.pagination?.total} stories`
            : `+ ${
                storyList?.pagination?.total > 0
                  ? storyList?.pagination?.total - 1
                  : storyList?.pagination?.total
              } more`}
        </span>
        <button
          className="inline-flex p-1 text-black px-4"
          onClick={toggleStoryView}
          id="story-resizer"
        >
          {showAll ? <CaretUp size={20} /> : <CaretDown size={20} />}
        </button>
      </div>
    </div>
  ) : (
    ''
  );
};

export default StoryList;
