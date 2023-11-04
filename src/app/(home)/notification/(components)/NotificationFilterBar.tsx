/* eslint-disable @next/next/no-img-element */

'use client';

import { useState } from 'react';

const NotificationFilterBar = ({ onTypeChange }: any) => {
  const [selectedType, setSelectedTab] = useState('');
  const handelTypeChange = (event: any) => {
    event.preventDefault();
    const attributeValue = event.target.getAttribute('tab-name');
    setSelectedTab(attributeValue);
    onTypeChange(attributeValue);
  };

  return (
    <div className="w-full">
      <div
        onClick={handelTypeChange}
        className={`${
          selectedType === '' ? 'text-[crimson] bg-[#f3f3f3]' : 'text-gray-700'
        } px-4 py-2 text-sm cursor-pointer`}
        tab-name=""
      >
        All Notifications
      </div>
      <div
        onClick={handelTypeChange}
        className={`${
          selectedType === 'unread'
            ? 'text-[crimson] bg-[#f3f3f3]'
            : 'text-gray-700'
        } px-4 py-2 text-sm cursor-pointer`}
        tab-name="unread"
      >
        Unread
      </div>
      <div
        onClick={handelTypeChange}
        className={`${
          selectedType === 'post_like'
            ? 'text-[crimson] bg-[#f3f3f3]'
            : 'text-gray-700'
        } px-4 py-2 text-sm cursor-pointer`}
        tab-name="post_like"
      >
        Like
      </div>
      <div
        onClick={handelTypeChange}
        className={`${
          selectedType === 'follow'
            ? 'text-[crimson] bg-[#f3f3f3]'
            : 'text-gray-700'
        } px-4 py-2 text-sm cursor-pointer`}
        tab-name="follow"
      >
        Follow
      </div>
      <div
        onClick={handelTypeChange}
        className={`${
          selectedType === 'post_comment'
            ? 'text-[crimson] bg-[#f3f3f3]'
            : 'text-gray-700'
        } px-4 py-2 text-sm cursor-pointer`}
        tab-name="post_comment"
      >
        Comment
      </div>
      {/* <div className="text-gray-700 block px-4 py-2 text-sm">
        Repost
      </div> */}
    </div>
  );
};

export default NotificationFilterBar;
