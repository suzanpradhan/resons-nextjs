'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import Button from '@/core/ui/components/Button';
import notificationApi from '@/modules/notification/notificationApi';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, UploadSimple } from 'phosphor-react';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import useScrollDirection from './useScrollDirection';
//import useScrollDirection from './useScrollDirection';

const Header = () => {
  const scrollDirection = useScrollDirection();
  const navigator = useRouter();
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const session = useSession();

  // const scrollDirection = useScrollDirection();

  const handleLogout = async () => {
    Cookies.remove('token');
    Cookies.remove('token');
    signOut({ callbackUrl: '/login', redirect: true });
  };

  useEffect(() => {
    if (session.data?.user) {
      dispatch(
        notificationApi.endpoints.unreadNotificationCount.initiate(undefined, {
          subscriptionOptions: { pollingInterval: 10000 },
        })
      );
    }
  }, [dispatch]);

  const currentPage = useAppSelector(
    (state: RootState) => state.homepage.currentPage
  );

  const unreadNotificationCount = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`unreadNotificationCount(undefined)`]
        ?.data as number
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`bg-white text-slate-950 sticky left-0 transition-all duration-500 w-full z-40 shadow-sm ${
          currentPage == 1 ? '' : 'hidden'
        } ${
          scrollDirection === 'up' || scrollDirection === 'down'
            ? '-translate-y-[105%]'
            : ''
        }`}
      >
        <header className="static sm:container md:container lg:container mx-auto px-4 sm:px-0 py-2 md:py-0">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row">
                <div className="w-[100px] max-h-12 mx-auto mr-2 flex gap-3 items-center">
                  <div className="w-[35px]">
                    <Image
                      width={100}
                      height={100}
                      src="/images/logo.png"
                      alt="logo"
                      className="h-[100%] w-[100%] object-contain mx-auto"
                    />
                  </div>
                  <div>Resons</div>
                </div>
                <ul className="hidden md:flex flex-row">
                  <li className="basis-1/3">
                    <Link
                      href="/"
                      className={`block py-[.8rem] px-4 text-center ${
                        pathName === '/'
                          ? 'text-accentRed bg-redShade font-bold'
                          : 'text-dark-500 font-normal'
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="basis-1/3">
                    <Link
                      href="/library"
                      className={`block py-[.8rem] px-4 text-center `}
                    >
                      Library
                    </Link>
                  </li>
                  <li className="basis-1/3">
                    <Link
                      href="/explore"
                      className={`block py-[.8rem] px-4 text-center `}
                    >
                      Explore
                    </Link>
                  </li>
                </ul>
              </div>
              <SearchBar />

              <Button
                type="link"
                href="/postCreate"
                text="Upload"
                kind="default"
                prefix={
                  <UploadSimple
                    className="text-white"
                    size={18}
                    weight="fill"
                  />
                }
                textClassName="ml-1"
                className="hidden md:block font-bold pointer-events-none"
              />
            </div>
            <div className="basis-[15%] flex flex-row justify-end gap-3 items-center hidden md:flex flex-row">
              <Link href="/notification">
                <Bell size="27" className="text-primary-700" weight="regular" />
                {unreadNotificationCount ? (
                  <>
                    <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-accentRed text-[8px] flex items-center justify-center">
                      {/* <RecordCircle size="12" color="#e65151" variant="Bulk" /> */}
                      {unreadNotificationCount}
                    </span>
                  </>
                ) : null}
              </Link>
              <div className="relative">
                <button onClick={toggleDropdown}>
                  <div className="flex flex-row items-center">
                    <div className="h-8 w-8 overflow-hidden bg-gray-800 rounded-full border-gray-300 border-solid border-[.12rem]">
                      <Image
                        width={100}
                        height={100}
                        src={
                          session.data?.user?.profile_image ??
                          '/images/avatar.jpg'
                        }
                        alt="profile"
                        className="h-full w-full object-cover mx-auto"
                      />
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <div className="absolute top-12 right-0 bg-white border rounded shadow-lg w-48">
                    <ul>
                      <li className="hover:bg-gray-100 pt-5 pb-5 pl-10">
                        <Link href="/settings">Settings</Link>
                      </li>
                      <li
                        className="hover:bg-gray-100 pt-5 pb-5 pl-10 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <Link href="#" onClick={(e) => e.preventDefault()}>
                          Logout
                        </Link>
                      </li>
                      <li className="hover:bg-gray-100 pt-5 pl-10 pb-5">
                        <Link href="/signup">Sign Up</Link>
                      </li>
                      <li className="hover:bg-gray-100 pt-5 pl-10 pb-5">
                        <Link href="/profile">Profile</Link>
                      </li>
                      {/* Add more dropdown items here */}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
