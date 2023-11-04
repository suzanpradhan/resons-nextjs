'use client';
import React, { useCallback, useRef, useState } from 'react';
import AppBar from '@/app/(components)/AppBar';
import MobileNavigation from '@/app/(components)/MobileNavigation';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateHomePage } from '@/modules/post/homePageReducer';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LibraryLayout({
  children,
  view,
}: {
  children: React.ReactNode;
  view?: React.ReactNode;
}) {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  
  const currentPage = useAppSelector(
    (state: RootState) => state.homepage.currentPage
  );
  const homePagePostId = useAppSelector(
    (state: RootState) => state.homepage.homePagePostId
  );

  useEffect(() => {
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      if (currentPage == 2) {
        history.go(1);
        dispatch(updateHomePage({ page: 1 }));
      } else {
        history.back();
      }
    };
  }, [currentPage]);

  const scrollableDivRef = useRef<any>(null);
  return (
    <>
      <div className="relative h-[calc(100dvh)] max-h-screen overflow-hidden">
        <AppBar />
        <div
          className="w-full flex flex-col items-center h-screen max-h-screen overflow-hidden"
          ref={scrollableDivRef}
          id="feed-listing"
          style={{ display: "none" }}
        ></div>
        <div
          id="homePageScroller"
          className={`absolute transition-all duration-200 ease-in-out w-full ${currentPage == 1 ? '' : '-translate-x-full'
            } h-[calc(100dvh)] top-0`}
        >
          {children}
        </div>
        <div
          className={`absolute transition-all duration-200 ease-in-out top-0 h-[calc(100dvh)] w-full left-full ${currentPage == 2 ? '-translate-x-full' : ''
            }`}
        >
        </div>
      </div>
      {currentPage == 1 ? <MobileNavigation /> : <></>}
    </>
  );
}
