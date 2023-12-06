'use client';

import MusicPlayer from '@/app/(components)/MusicPlayer';
import { useParams } from 'next/navigation';

export default function PlaylistEachPage() {
  const params = useParams();
  console.log(params);
  return (
    <div className="w-full h-screen max-h-screen gap-6 pt-10 pb-16 overflow-scroll">
      {/* explore by {params.categories[0]}: {params.categories[1]} */}
      <MusicPlayer params={params} />
    </div>
  );
}
