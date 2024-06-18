'use client';

import { useAppDispatch } from '@/core/redux/clientStore';
import postDeleteApi from '@/modules/postDelete/postDeleteApi';
import profileApi from '@/modules/profile/profileApi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CaretLeft } from 'phosphor-react';
import { toast } from 'react-toastify';

export default function DeactivationPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    signOut({ callbackUrl: '/login', redirect: true });
  };

  const handleAccountDelete = async () => {
    try {
      await dispatch(profileApi.endpoints.accountDelete.initiate());
      toast.success('All account deleted');
      handleLogout();
    } catch (error) {
      // Handle error
      toast.success('Opps! cant delete account');
      console.log(error);
    }
  };

  const handleAllPostDelete = async () => {
    try {
      await dispatch(postDeleteApi.endpoints.allPostDelete.initiate());
      toast.success('All post deleted');
    } catch (error) {
      // Handle error
      toast.error('Opps! cant delete post');
      console.log(error);
    }
  };

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
          Deactivation and Deletion
        </span>
      </h2>

      <div className="overflow-y-scroll h-screen px-4 bg-white pt-11">
        <h3 className="text-sm font-semibold text-gray-700 my-4">
          Deactivation and deletion
        </h3>
        <div className="flex flex-col gap-2 bg-slate-100 rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5 border-0 border-b border-gray-300">
            <div className="rounded-sm pb-2 basis-2/6 w-full md:mr-5">
              <h3 className="text-base text-gray-700 font-bold">
                Delete Account
              </h3>
              <p className="text-sm text-gray-500 font-normal">
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently.
              </p>
            </div>
            <div className="md:mt-0 md:py-0 basis-4/6 w-full">
              <div className="py-2">
                <button
                  onClick={handleAccountDelete}
                  className="bg-[#d8566c] py-2 px-3 text-white rounded-md text-sm"
                >
                  Yes, delete my account
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5">
            <div className="rounded-sm pb-2 basis-2/6 w-full md:mr-5">
              <h3 className="text-base text-gray-700 font-bold">Delete Post</h3>
              <p className="text-sm text-gray-500 font-normal">
                You can delete your all post here. This action is not
                reversible. All information related to the post will be deleted
                permanently.
              </p>
            </div>
            <div className="md:mt-0 md:py-0 basis-4/6 w-full">
              <div className="py-2">
                <button
                  onClick={handleAllPostDelete}
                  className="bg-[#d8566c] py-2 px-3 text-white rounded-md text-sm"
                >
                  Yes, delete my all post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
