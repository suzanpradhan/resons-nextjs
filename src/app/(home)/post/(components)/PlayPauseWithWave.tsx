import classNames from 'classnames';
import { Pause, Play } from 'phosphor-react';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

type PlayPauseWithWavePropType = {
  isPlaying: boolean;
  audioTime: number | undefined;
  audio: MutableRefObject<any>;
  audioRef: MutableRefObject<any>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  wavePlayerVisible: boolean;
};

const PlayPauseWithWave = ({
  isPlaying,
  audioTime,
  audio,
  audioRef,
  setIsPlaying,
  wavePlayerVisible,
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
      className={classNames(
        `bg-slate-400 rounded pl-10 pr-[65px] relative flex flex-col justify-center`,
        wavePlayerVisible ? 'block' : 'hidden'
      )}
      ref={audio}
    >
      <button
        className="inline-flex absolute left-[0px] bottom-7"
        onClick={() => handlePlayPause()}
      >
        {isPlaying ? (
          <Pause size="24" className="text-white" weight="fill" />
        ) : (
          <Play size="24" className="text-white" weight="fill" />
        )}
      </button>
      <div className="inline-flex absolute right-[3px] py-0.5 px-2 bottom-7 bg-gray-600 text-white rounded-md">
        {audioTime ? formatTime(audioTime / 1000) : '0:00'}
      </div>
    </div>
  );
};

export default PlayPauseWithWave;
