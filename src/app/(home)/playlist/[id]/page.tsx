'use client';

import PlaylistComponent from '../components/PlaylistComponent';

export default function PlaylistEachPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PlaylistComponent params={{ id: params.id }} />
    </>
  );
}
