'use client';
import { useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GlobeHemisphereEast,
  House,
  Playlist,
  Record,
  UserCircle,
} from 'phosphor-react';
import { useState } from 'react';
import useScrollDirection from './useScrollDirection';

const MobileNavigation = () => {
  const pathName = usePathname();
  const scrollDirection = useScrollDirection();
  const currentPage = useAppSelector(
    (state: RootState) => state.homepage.currentPage
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const notificationCount = 5; // Replace with your actual notification count

  return (
    <div
      className={
        'sticky md:hidden bottom-0 left-0 w-full bg-white/80 z-40 border-0 border-t border-gray-100 backdrop-filter backdrop-blur-lg'
        // (scrollDirection === 'up' || scrollDirection === 'down' ? 'hidden' : '')
      }
    >
      <ul className="flex justify-evenly list-none m-0 p-0 h-12">
        <li className="basis-[20%]">
          <Link
            href="/"
            className={`flex items-center px-4 h-full text-gray-400`}
          >
            <div className="w-max mx-auto">
              <House
                size="24"
                weight="fill"
                className={`${
                  pathName === '/' ? 'text-accent' : 'text-primary-400'
                }`}
              />
            </div>
          </Link>
        </li>

        <li title="Explore" className="basis-[20%]">
          <Link href="/explore" className={`flex items-center px-4 h-full`}>
            <div className="w-max mx-auto">
              <GlobeHemisphereEast
                size="24"
                weight="fill"
                className={`${
                  pathName === '/explore' ? 'text-accent' : 'text-primary-400'
                }`}
              />
            </div>
          </Link>
        </li>
        <li title="Create Post" className="basis-[20%]">
          <Link href="/post" className={`flex items-center px-4 h-full`}>
            <div className="w-max mx-auto">
              <Record
                size="24"
                color={`${pathName === '/post' ? '#cf4a4a' : '#cf4a4a'}`}
                weight="duotone"
              />
            </div>
          </Link>
        </li>
        <li title="Library" className="basis-[20%]">
          <Link href="/library" className={`flex items-center px-4 h-full`}>
            <div className="w-max mx-auto">
              <Playlist
                size="24"
                weight="fill"
                className={`${
                  pathName === '/library' ? 'text-accent' : 'text-primary-400'
                }`}
              />
            </div>
          </Link>
        </li>

        <li className="basis-[20%]">
          <Link href="/profile" className={`flex items-center px-4 h-full`}>
            <div className="w-max mx-auto relative">
              {/* {notificationCount > 0 && (
                <span className="absolute top-0 -mt-4 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {notificationCount}
                </span>
              )} */}
              <UserCircle
                size="24"
                weight="fill"
                className={`${
                  pathName === '/profile' ? 'text-accent' : 'text-primary-400'
                }`}
              />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavigation;
