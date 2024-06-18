// Import necessary libraries and components
'use client';
import AppBar from '@/app/(components)/AppBar';
import { useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import React, { useCallback, useEffect } from 'react';
import NowPlayingBarV3 from '../(components)/(nowPlayingPlayer)/NowPlayingBarV3';
import MobileNavigation from '../(components)/MobileNavigation';
import PostDetailComponent from './(components)/PostDetailComponent';

export default function HomeLayout({
  children,
  view,
}: {
  children: React.ReactNode;
  view?: React.ReactNode;
}) {
  const currentPage = useAppSelector(
    (state: RootState) => state.homepage.currentPage
  );
  const homePagePostId = useAppSelector(
    (state: RootState) => state.homepage.homePagePostId
  );

  const handleScroll = useCallback(() => {
    const scrollableDiv = document.getElementById('detailScroller');
    if (scrollableDiv) {
      scrollableDiv.scrollHeight - scrollableDiv.scrollTop <=
        scrollableDiv.clientHeight - 200;
    }
  }, [false, false]);

  useEffect(() => {
    const scrollableDiv = document.getElementById('detailScroller');
    if (scrollableDiv) {
      scrollableDiv.addEventListener('scroll', handleScroll);

      return () => {
        scrollableDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  useEffect(() => {
    // Your additional logic here (if needed)
  }, [handleScroll]);

  return (
    <>
      <AppBar />
      <div className="relative h-full overflow-hidden overscroll-y-contain">
        <div
          id="homePageScroller"
          className={`transition-all duration-200 ease-in-out w-full ${
            currentPage == 1 ? '' : '-translate-x-full'
          } top-0`}
        >
          {children}
        </div>
        <div
          className={`absolute transition-all duration-200 ease-in-out top-0 h-[calc(100dvh)] w-full left-full ${
            currentPage == 2 ? '-translate-x-full' : ''
          }`}
        >
          {homePagePostId ? (
            <PostDetailComponent params={{ id: homePagePostId }} />
          ) : (
            <PostDetailComponent />
          )}
        </div>
      </div>
      <NowPlayingBarV3 />
      {currentPage == 1 ? <MobileNavigation /> : <></>}
    </>
  );
}
