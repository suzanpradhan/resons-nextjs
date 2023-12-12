'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  Bell,
  CaretRight,
  FileText,
  Lock,
  Shield,
  ShieldCheck,
  SignOut,
  Trash,
  UserCircle,
} from 'phosphor-react';

export default function AccountSettingPage() {
  // Logout function
  const handleLogout = async () => {
    signOut({ callbackUrl: '/login', redirect: true });
  };

  return (
    <div className="sm:container md:container lg:container mx-auto h-full">
      <h2 className="h-11 w-full px-4 bg-white shadow-sm flex gap-2 mb-0 fixed z-50">
        <span className="text-3xl font-light flex items-center">&#60;</span>
        <span className="text-sm font-medium flex items-center">
          Account Settings
        </span>
      </h2> */}

      <div className="overflow-y-scroll h-screen px-4 bg-white pt-11">
        <h3 className="text-sm font-semibold text-gray-700 my-4">
          Account settings
        </h3>
        <div className="flex flex-col gap-5">
          <ul className="bg-slate-100 rounded-lg overflow-hidden py-2">
            <li className="relative hover:bg-slate-200 rounded-md">
              <Link
                href="/accountSettings/personalDetails"
                className="text-sm font-medium text-gray-700 block px-2 py-2"
              >
                <p className="flex gap-2 items-center">
                  <UserCircle size={24} />
                  Personal Details
                </p>
              </Link>
              <CaretRight
                size={21}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-700"
              />
            </li>
            <li className="relative hover:bg-slate-200 rounded-md">
              <Link
                href="/accountSettings/security"
                className="text-sm font-medium text-gray-700 block px-2 py-2"
              >
                <p className="flex gap-2 items-center">
                  <Lock size={24} />
                  Password and security
                </p>
              </Link>
              <CaretRight
                size={21}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-700"
              />
            </li>
            <li className="relative hover:bg-slate-200 rounded-md">
              <Link
                href="/accountSettings/notification"
                className="text-sm font-medium text-gray-700 block px-2 py-2"
              >
                <p className="flex gap-2 items-center">
                  <Bell size={24} />
                  Notification
                </p>
              </Link>
              <CaretRight
                size={21}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-700"
              />
            </li>
            <li className="relative hover:bg-slate-200 rounded-md">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 block px-2 py-2"
              >
                <p className="flex gap-2 items-center">
                  <Shield size={24} />
                  Protect account
                </p>
              </Link>
              <CaretRight
                size={21}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-700"
              />
            </li>
            <li className="relative hover:bg-slate-200 rounded-md">
              <Link
                href="/accountSettings/deactivation"
                className="text-sm font-medium text-gray-700 block px-2 py-2"
              >
                <p className="flex gap-2 items-center">
                  <Trash size={24} />
                  Deactivation or deletion
                </p>
              </Link>
              <CaretRight
                size={21}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-700"
              />
            </li>
          </ul>
          <ul className="bg-slate-100 rounded-lg overflow-hidden py-2">
            <li className="relative hover:bg-slate-200 rounded-md">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 block px-2 py-2"
              >
                <p className="flex gap-2 items-center">
                  <FileText size={24} />
                  Terms and conditions
                </p>
              </Link>
              <CaretRight
                size={21}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-700"
              />
            </li>
            <li className="relative hover:bg-slate-200 rounded-md">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 block px-2 py-2"
              >
                <p className="flex gap-2 items-center">
                  <ShieldCheck size={24} />
                  Privacy policy
                </p>
              </Link>
              <CaretRight
                size={21}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-700"
              />
            </li>
          </ul>

          <form>
            <button
              onClick={handleLogout}
              type="button"
              className="bg-[#d8566c] text-white rounded-lg w-full h-11 flex items-center px-3 gap-4 text-sm hover:shadow-md shadow-[#f35973] hover:bg-[#f35973]"
            >
              <SignOut size={24} />
              Log out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
