import SearchBar from '@/app/(components)/SearchBar';
import { useState } from 'react';
import PopularPostsSection from './(components)/PopularPostsSection';
import TopicGenres from './(components)/TopicGenres';

export default function TopicPage() {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <div className="sm:container md:container lg:container mx-auto pt-10 flex flex-col h-full">
      <div className="overflow-y-scroll">
        <div className="sm:px-0 my-4">
          <SearchBar />
        </div>

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
