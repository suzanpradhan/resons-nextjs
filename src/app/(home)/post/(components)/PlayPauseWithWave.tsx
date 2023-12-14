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
  theme: 'light' | 'dark';
};

const PlayPauseWithWave = ({
  isPlaying,
  audioTime,
  audio,
  audioRef,
  setIsPlaying,
  wavePlayerVisible,
  theme,
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
        `rounded pl-12 pr-14 relative flex flex-col justify-center`,
        wavePlayerVisible ? 'block' : 'hidden',
        theme === 'dark' ? 'bg-slate-400' : 'transparent'
      )}
      ref={audio}
    >
      <button
        className="inline-flex absolute left-[0px] top-1/2 transform -translate-y-1/2"
        onClick={() => handlePlayPause()}
        type="button"
      >
        {isPlaying ? (
          <div
            className={`${
              theme === 'dark'
                ? ''
                : 'rounded-full bg-white p-2 hover:shadow-md shadow-gray-200'
            } `}
          >
            <Pause
              size="21"
              className={`${theme === 'dark' ? 'text-white' : 'text-accent'} `}
              weight="fill"
            />
          </div>
        ) : (
          <div
            className={`${
              theme === 'dark'
                ? ''
                : 'rounded-full bg-white p-2 hover:shadow-md shadow-gray-200'
            } `}
          >
            <Play
              size="21"
              className={`${theme === 'dark' ? 'text-white' : 'text-accent'} `}
              weight="fill"
            />
          </div>
        )}
      </button>
      <div className="inline-flex absolute right-[3px] top-1/2 transform -translate-y-1/2 py-0.5 px-2 bg-gray-600 text-white rounded-md">
        {audioTime ? formatTime(audioTime / 1000) : '0:00'}
      </div>
    </div>
  );
};

export default PlayPauseWithWave;
