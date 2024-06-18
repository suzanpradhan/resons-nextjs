'use client';

import { useState } from 'react';
import PostStoryTab from './(components)/PostStoryTab';
import PostToFeed from './(components)/PostToFeed';
import PostToStory from './(components)/PostToStory';

const PostCreatePage = () => {
  const [activeTab, setActiveTab] = useState<'Post' | 'Story'>('Post');
  return (
    <>
      <div className="px-4 max-[356px]:px-3 sticky top-0 h-12 max-[356px]:h-10 shadow-sm flex items-center gap-2 my-0 bg-white">
        <div className="text-base max-[356px]:text-sm font-normal flex-1">
          {activeTab == 'Post' ? 'Create a post' : 'Create a story'}
        </div>
        <button
          type="submit"
          className="text-red-500 text-base max-[356px]:text-sm"
        >
          Post
        </button>
      </div>
      <div className="h-[calc(100vh-3rem)]">
        {activeTab === 'Post' && <PostToFeed />}
        {activeTab === 'Story' && <PostToStory />}

        <PostStoryTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
};

export default PostCreatePage;
