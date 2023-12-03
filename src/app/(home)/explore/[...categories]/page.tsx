'use client';

import MusicPlayer from '@/app/(components)/MusicPlayer';
import { useParams } from 'next/navigation';

export default function PlaylistEachPage() {
  const params = useParams();
  console.log(params);
  return (
    <div className="sm:container md:container lg:container mx-auto">
      <div className="pt-10">
        {/* explore by {params.categories[0]}: {params.categories[1]} */}
        <MusicPlayer params={params} />
      </div>
    </div>
  );
}
