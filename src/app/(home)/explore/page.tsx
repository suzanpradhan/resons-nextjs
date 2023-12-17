'use client';

import SearchBar from '@/app/(components)/SearchBar';
import { useState } from 'react';
import PopularPostsSection from './(components)/PopularPostsSection';
import TopicGenres from './(components)/TopicGenres';

export default function TopicPage() {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <div className="sm:container md:container lg:container mx-auto pt-10 flex flex-col h-full">
      <div className="overflow-y-scroll">
        {/* <div className="py-4 flex flex-col">
          <label
            htmlFor="selectTopic"
            className="text-xl font-bold text-gray-800 mb-1"
          >
            Select Topic
          </label>
          <div className="w-max relative">
            <select
              name="topic"
              id="selectTopic"
              className="w-60 text-base text-gray-600 focus-visible:outline-none py-2 pl-2 pr-5 rounded-sm shadow-sm appearance-none"
            >
              <option value="1">Politics</option>
              <option value="2">News</option>
              <option value="3">Hit Songs</option>
            </select>
            <span className="absolute right-1 -translate-y-1/2 top-1/2">
              <ArrowDown2 size="15" color="gray" />
            </span>
          </div>
        </div> */}

        <div className="sm:px-0 my-4">
          <SearchBar />
        </div>

        {/* <TopicListScroll title="My Cloud" /> */}
        <TopicGenres title="Top Categories" />
        <PopularPostsSection />
        {/* <TopicListScroll title="Newest" /> */}
        {/* <TopicListScroll title="Professionals" /> */}
        {/* <TopicListScroll title="More you like" /> */}
        {/* <Suggestion title="Artist to Follow" /> */}
        {/* <LanguagePostList title="Explore by language" /> */}
      </div>
    </div>
  );
}
