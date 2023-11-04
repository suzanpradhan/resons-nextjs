import { PlaylistDetailType } from '@/modules/playlist/playlistTypes';
import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
interface PlaylistCardProps {
  playlist: PlaylistDetailType;
}

export default function PlaylistCard(props: PlaylistCardProps) {
  return (
    <>
      <Link
        href={{
          pathname: `/library/${props.playlist.id}`,
          query: {
            title: props.playlist.title,
            description: props.playlist.description,
          },
        }}
        className="flex flex-col items-center last-of-type:mr-0 group"
      >
        <div className="w-full h-full rounded-md overflow-hidden drop-shadow-sm group-hover:drop-shadow-xl">
          <img
            src="https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg"
            alt={props.playlist.title}
            className="w-full h-full object-contain"
          />
        </div>
        <h4
          className="text-[1rem] w-full text-gray-800 font-bold py-0 mt-3 capitalize truncate text-center"
          title={props.playlist.title}
        >
          {props.playlist.title}
        </h4>
      </Link>
    </>
  );
}
