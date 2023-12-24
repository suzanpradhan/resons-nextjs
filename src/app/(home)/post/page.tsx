'use client';

import { useState } from 'react';
import PostStoryTab from './(components)/PostStoryTab';
import PostToFeed from './(components)/PostToFeed';
import PostToStory from './(components)/PostToStory';

const PostCreatePage = () => {
  const [activeTab, setActiveTab] = useState<'Post' | 'Story'>('Post');
  return (
    <div className="relative h-full pt-10">
      {activeTab === 'Post' && <PostToFeed />}
      {activeTab === 'Story' && <PostToStory />}

      <PostStoryTab activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default PostCreatePage;
