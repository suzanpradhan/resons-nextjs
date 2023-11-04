import { useAppDispatch } from '@/core/redux/clientStore';
import { AudioDetailType } from '@/modules/audio/audioType';
import playlistApi from '@/modules/playlist/playlistApi';
import { Pause, Play, Trash } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */
interface PlaylistAudioCardProps {
  playlistId: number;
  audio: AudioDetailType;
  index: number;
  isPlaying: boolean;
  onPlay?: () => void;
}

export default function PlaylistAudioCard(props: PlaylistAudioCardProps) {
  const [hover, toggleHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    if (props.audio.id) {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        await Promise.resolve(
          dispatch(
            playlistApi.endpoints.removeAudioFromPlaylist.initiate({
              playlist_id: props.playlistId,
              audio_id: props.audio.id,
            })
          )
        );
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="group relative h-16 w-full flex p-4 gap-4 justify-between items-center cursor-pointer hover:bg-whiteShade">
      <div
        className="flex flex-1 items-center"
        onMouseOver={() => toggleHover(true)}
        onMouseOut={() => toggleHover(false)}
      >
        <button onClick={props.onPlay} type="button">
          {props.isPlaying ? (
            <Pause
              size={22}
              variant="Bold"
              className="text-dark-500 cursor-pointer mr-4"
            />
          ) : (
            <Play
              size={22}
              variant="Bold"
              className="text-dark-500 cursor-pointer mr-4"
            />
          )}
        </button>
        <div className="flex flex-col flex-1">
          <div className="text-dark-500 font-medium text-base line-clamp-1">
            {/* {props.audio.title ?? props.audio.file_name} */}
          </div>
          <div className="text-sm text-primaryGray-500">Caption</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {props.isPlaying ? (
          <img src="/images/wave.gif" alt="" className="w-8 h-8" />
        ) : (
          <></>
        )}
      </div>
      <div className="hidden group-hover:flex absolute items-center justify-center h-full w-max right-5 top-0">
        <ul className="flex">
          <li>
            <button
              onClick={handleSubmit}
              className="block p-2 rounded-full bg-white hover:bg-gray-50"
            >
              <Trash size="21" color="#f47373" variant="Bulk" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
