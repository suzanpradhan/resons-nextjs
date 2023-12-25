import { PlaylistDetailType } from '@/modules/playlist/playlistTypes';
import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
interface PlaylistCardProps {
  playlist: PlaylistDetailType;
}

export default function PlaylistCard(props: PlaylistCardProps) {
  console.log('images:' + props.playlist.image);

  return (
    <>
      <Link
        href={{
          pathname: `/playlist/${props.playlist.id}`,
          query: {
            title: props.playlist.title,
            description: props.playlist.description,
          },
        }}
        className="flex flex-col items-center group w-32 ml-4 last-of-type:mr-4 "
      >
        <div className="w-full h-32 rounded-md overflow-hidden group-hover:drop-shadow-md">
          <img
            src={props.playlist.image ?? '/images/audio_no_image.png'}
            alt={props.playlist.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h4
          className="text-sm w-full text-gray-800 py-0 mt-3 capitalize truncate text-center"
          title={props.playlist.title}
        >
          {props.playlist.title}
        </h4>
      </Link>
    </>
  );
}
