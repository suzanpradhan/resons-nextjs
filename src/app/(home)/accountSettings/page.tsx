'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  CaretLeft,
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
  const router = useRouter();
  // Logout function
  const handleLogout = async () => {
    signOut({ callbackUrl: '/login', redirect: true });
  };

  return (
    <div className="sm:container md:container lg:container mx-auto h-full">
      <div
        className="h-11 w-full bg-white px-4 shadow-sm flex gap-2 fixed z-50 cursor-pointer"
        onClick={() => router.back()}
      >
        <div className="text-3xl font-light flex items-center">
          <CaretLeft size={18} weight="bold" />
        </div>
        <div className="text-sm font-normal flex items-center">
          Account Settings
        </div>
      </div>

      <div className="overflow-y-scroll h-screen px-4 bg-white pt-14">
        <div className="flex flex-col gap-4">
          <ul className="bg-whiteShade rounded-lg overflow-hidden">
            <li className="relative hover:bg-gray-200">
              <Link
                href="/accountSettings/personalDetails"
                className="text-sm font-normal text-black px-3 pb-2 pt-3 flex justify-between"
              >
                <p className="flex gap-2 items-center">
                  <UserCircle size={24} />
                  Personal Details
                </p>
                <CaretRight size={21} className="text-dark-400" />
              </Link>
            </li>
            <li className="relative hover:bg-gray-200">
              <Link
                href="/accountSettings/security"
                className="text-sm font-normal text-black px-3 py-2 flex justify-between"
              >
                <p className="flex gap-2 items-center">
                  <Lock size={24} />
                  Password and security
                </p>
                <CaretRight size={21} className="text-dark-400" />
              </Link>
            </li>
            <li className="relative hover:bg-gray-200">
              <Link
                href="/accountSettings/notification"
                className="text-sm font-normal text-black flex justify-between px-3 py-2"
              >
                <p className="flex gap-2 items-center">
                  <Bell size={24} />
                  Notification
                </p>
                <CaretRight size={21} className="text-dark-400" />
              </Link>
            </li>
            <li className="relative hover:bg-gray-200">
              <Link
                href="/"
                className="text-sm font-normal text-black flex justify-between px-3 py-2"
              >
                <p className="flex gap-2 items-center">
                  <Shield size={24} />
                  Protect account
                </p>
                <CaretRight size={21} className="text-dark-400" />
              </Link>
            </li>
            <li className="relative hover:bg-gray-200">
              <Link
                href="/accountSettings/deactivation"
                className="text-sm font-normal text-black flex justify-between px-3 pt-2 pb-3"
              >
                <p className="flex gap-2 items-center">
                  <Trash size={24} className="text-black" />
                  Deactivation or deletion
                </p>
                <CaretRight size={21} className="text-dark-400" />
              </Link>
            </li>
          </ul>
          <ul className="bg-whiteShade rounded-lg overflow-hidden">
            <li className="relative hover:bg-gray-200">
              <Link
                href="/"
                className="text-sm font-normal text-black flex justify-between px-4 pt-3 pb-2"
              >
                <p className="flex gap-2 items-center">
                  <FileText size={24} />
                  Terms and conditions
                </p>
                <CaretRight size={21} className="text-dark-400" />
              </Link>
            </li>
            <li className="relative hover:bg-gray-200">
              <Link
                href="/"
                className="text-sm font-normal text-black flex justify-between px-4 pt-2 pb-3"
              >
                <p className="flex gap-2 items-center">
                  <ShieldCheck size={24} />
                  Privacy policy
                </p>
                <CaretRight size={21} className="text-dark-400" />
              </Link>
            </li>
          </ul>

          <form>
            <button
              onClick={handleLogout}
              type="button"
              className="text-white w-full py-3 rounded-md flex items-center px-4 gap-2 text-sm hover:bg-accent bg-accentRed"
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
