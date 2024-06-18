'use client';

import MusicPlayer from '@/app/(components)/MusicPlayer';

export default function PlaylistEachPage({
  params,
}: {
  params: { name: string };
}) {
  // const params = useParams();

  return (
    <div className="w-full h-screen max-h-screen gap-6 pt-10 pb-16 overflow-scroll">
      {/* explore by {params.categories[0]}: {params.categories[1]} */}
      <MusicPlayer name={params.name} />
    </div>
  );
}
