'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import playlistApi from '@/modules/playlist/playlistApi';
import { PlaylistDetailType } from '@/modules/playlist/playlistTypes';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Playlist() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (myPlaylistData == undefined && session.data?.user != undefined) {
      dispatch(playlistApi.endpoints.getMyPlaylistList.initiate());
    }
  }, [session.data?.user]);

  const myPlaylistData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMyPlaylistList`]
        ?.data as PaginatedResponseType<PlaylistDetailType>
  );

  console.log(myPlaylistData?.data[0].image);
  return (
    <div className="w-full h-screen max-h-screen bg-white pb-16 overflow-scroll">
      <div className="mt-12"></div>
      <div className="overflow-y-scroll bg-white">
        <h2 className="px-4 py-3 flex items-center gap-2 text-lg my-0">
          <button
            onClick={() => router.back()}
            className="text-4xl -my-2 font-light"
          >
            &#60;
          </button>
          <span className="font-medium">Top Categories</span>
        </h2>
        <div className="px-4">
          <input
            type="search"
            className="border-[1px] w-full border-[#ccc] py-3 px-4 rounded"
            placeholder="search"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {myPlaylistData?.data.map((item) => (
              <Link
                href={{
                  pathname: `/playlist/${item.id}`,
                  query: {
                    title: item.title,
                    description: item.description,
                  },
                }}
                key={item.id}
                className="h-44 relative rounded-md"
              >
                <Image
                  className="rounded-md "
                  alt="category image"
                  fill
                  objectFit="cover"
                  src={`${item.image ?? '/images/audio_no_image.png'}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <p className="z-50 sticky mx-4 mt-4 font-semibold text-black">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
