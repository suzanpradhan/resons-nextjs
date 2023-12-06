import { Pause, Play } from 'phosphor-react';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

type PlayPauseWithWavePropType = {
  isPlaying: boolean;
  audioTime: number | undefined;
  audio: MutableRefObject<any>;
  audioRef: MutableRefObject<any>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
};

const PlayPauseWithWave = ({
  isPlaying,
  audioTime,
  audio,
  audioRef,
  setIsPlaying,
}: PlayPauseWithWavePropType) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div
      className={`bg-slate-200 pl-10 pr-[80px] mt-4 relative h-[150px] flex flex-col justify-center`}
      ref={audio}
    >
      <button
        className="inline-flex absolute left-[10px]"
        onClick={() => handlePlayPause()}
      >
        {isPlaying ? (
          <Pause size="24" className="text-white" weight="fill" />
        ) : (
          <Play size="24" className="text-white" weight="fill" />
        )}
      </button>
      <div className="inline-flex absolute right-[15px] py-0.5 px-2 bg-gray-600 text-white rounded-md">
        {audioTime ? formatTime(audioTime / 1000) : '0:00'}
      </div>
    </div>
  );
};

export default PlayPauseWithWave;
