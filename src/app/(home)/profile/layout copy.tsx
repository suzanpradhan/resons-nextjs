'use client';

import AppBar from '@/app/(components)/AppBar';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateHomePage } from '@/modules/post/homePageReducer';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LibrayLayout({
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
      </div>
    </>
  );
}
