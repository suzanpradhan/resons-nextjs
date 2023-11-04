'use client';

/* eslint-disable @next/next/no-img-element */
import { Logout, Messages1, Notification, RecordCircle } from 'iconsax-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import useScrollDirection from './useScrollDirection';

const MobileHeader = () => {
  const handleLogout = async () => {
    signOut({ callbackUrl: '/login', redirect: true });
  };
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={`sm:hidden sticky ${
        scrollDirection === 'down' ? '-top-24' : 'top-0'
      } transition-all duration-500 w-full z-50`}
    >
      <div className="flex justify-between items-center bg-white w-full">
        <div className="flex items-end py-3 px-4">
          <div className="overflow-hidden">
            <img
              src="/images/logo_on_light.png"
              alt="reason"
              className="w-[140px] object-contain"
            />
          </div>
        </div>
        <div className="basis-20 flex items-center">
          <Link
            href="/notification"
            className="relative block text-center py-4 px-3"
          >
            <Notification size="24" color="#333" variant="Bulk" />
            <span className="absolute top-4 right-2">
              <RecordCircle size="12" color="#e65151" variant="Bulk" />
            </span>
          </Link>
          <a className="relative block text-center py-4 px-3">
            <Messages1 size="24" color="#333" variant="TwoTone" />
            <span className="absolute top-4 right-2">
              <RecordCircle size="12" color="#e65151" variant="Bulk" />
            </span>
          </a>
          <button
            className="relative block text-center py-4 px-3"
            onClick={handleLogout}
          >
            <Logout size="24" className="text-accentRed" variant="TwoTone" />
          </button>
        </div>
        {/* <div className="basis-20">
          <a onClick={handleLogout} className="block text-center py-4 px-3">
            <Logout size="24" color="#cf4a4a" variant="Broken" />
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default MobileHeader;
