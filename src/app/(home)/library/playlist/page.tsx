/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';

export default function Playlist() {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="sm:container md:container lg:container mx-auto mb-[4.6rem] min-h-screen">
      <div className="py-4 bg-white">
        <h3 className="px-4 text-lg font-bold text-gray-800">My Playlist</h3>
        <p className="px-4 text-base text-gray-600">Hear your own playlists:</p>
        <div className="py-4 flex flex-wrap">
          {number.map((n, index) => (
            <div className="w-1/6 p-4 ml-0" key={index}>
              <Link href="" className="cursor-pointer">
                <div className="w-full rounded-sm overflow-hidden shadow-sm">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/6/63/Tool_-_Lateralus.jpg"
                    alt="playlist"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm text-gray-600 mt-2">My Playlist</h3>
                <p className="text-sm text-gray-500 m-full truncate">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </Link>
            </div>
          ))}

          {/* Repeat the above code for other div elements */}
        </div>
      </div>
    </div>
  );
}
