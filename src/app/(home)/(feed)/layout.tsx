// Import necessary libraries and components
"use client"
import AppBar from '@/app/(components)/AppBar';
import MobileNavigation from '@/app/(components)/MobileNavigation';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateHomePage } from '@/modules/post/homePageReducer';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import PostDetailComponent from '../(components)/PostDetailComponent';
import NowPlayingBarV3 from '../../(components)/(nowPlayingPlayer)/NowPlayingBarV3';

export default function HomeLayout({
  children,
  view,
}: {
  children: React.ReactNode;
  view?: React.ReactNode;
}) {
  const navigator = useRouter();
  const [authenticateChecked, setAuthenticateChecked] = useState(false);
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

  useEffect(() => {
    // Check if the authentication cookie is present
    const isAuthenticated = Cookies.get('authenticated') === 'true';

    if (isAuthenticated) {
      setAuthenticateChecked(true);
    } else {
      navigator.push("/login");
    }
  }, []);

  if (!authenticateChecked) {
    return null;
  }

  return (
    <>
      <div className="relative h-[calc(100dvh)] max-h-screen overflow-hidden">
        <AppBar />
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
          {homePagePostId ? (
            <PostDetailComponent params={{ id: homePagePostId }} />
          ) : (
            <PostDetailComponent />
          )}
        </div>
        <NowPlayingBarV3 />
      </div>
      {currentPage == 1 ? <MobileNavigation /> : <></>}

    </>
  );
}
