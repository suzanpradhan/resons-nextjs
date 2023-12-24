'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CaretLeft, CaretRight, Password } from 'phosphor-react';

export default function SecurityPage() {
  const router = useRouter();
  return (
    <div className="sm:container md:container lg:container mx-auto h-full">
      <h2 className="h-11 w-full px-4 bg-white shadow-sm flex gap-2 mb-0 fixed z-50">
        <span
          onClick={() => router.back()}
          className="text-3xl font-light flex items-center"
        >
          <CaretLeft size={18} weight="bold" />
        </span>
        <span className="text-sm font-medium flex items-center">
          Password and Security
        </span>
      </h2>

      <div className="overflow-y-scroll h-screen px-4 bg-white pt-11">
        <h3 className="text-sm font-semibold text-gray-700 my-4">
          Password and security
        </h3>
        <div className="flex flex-col gap-5">
          <ul className="bg-slate-100 rounded-lg overflow-hidden py-2">
            <li className="relative hover:bg-slate-200 rounded-md">
              <Link
                href="/accountSettings/security/changePassword"
                className="text-sm font-medium text-gray-700 block px-2 py-2"
              >
                <p className="flex gap-2 items-center">
                  <Password size={24} />
                  Change Password
                </p>
              </Link>
              <CaretRight
                size={21}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-700"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
