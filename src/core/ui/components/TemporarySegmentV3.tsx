import PlayResons from '@/app/(components)/(icons)/PlayResons';
import { Pause } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';

interface TemporarySegmentV3Props {
  audioUrl: string;
  onDuration: (duration: number) => void; // Update the prop name to "onDuration"
  autoplay?: boolean; // Include the autoplay prop
  // onProgressBarWidth: (width: string) => void;
}

export function TemporarySegmentV3({
  audioUrl,
  onDuration,
}: // onProgressBarWidth,
TemporarySegmentV3Props) {
  const audioContainer = useRef(null);
  const audioRef = useRef<any>(null);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const createWaveSurferInstance = async () => {
      if (audioRef.current) {
        audioRef.current.destroy();
        audioRef.current = undefined;
      }
      if (!audioContainer.current) return;
      const WaveSurfer = (await import('wavesurfer.js')).default;
      audioRef.current = WaveSurfer.create({
        container: audioContainer.current,
        waveColor: 'gray',
        progressColor: '#B00000',
        cursorColor: 'transparent',
        barWidth: 2,
        barRadius: 1,
        // responsive: true,
        height: 90,
      });

      audioRef.current.load(audioUrl);

      audioRef.current.on('ready', () => {
        const audioDuration = audioRef.current.getDuration();
        onDuration(audioDuration * 1000);
        setDuration(audioDuration);
        // audioRef.current.play();
      });

      audioRef.current.on('error', (error: any) => {
        console.error('Wavesurfer error:', error);
      });

      audioRef.current.on('play', () => {
        const audioDuration = audioRef.current.getDuration();
        setDuration(audioDuration);

        // const currentTime = audioRef.current.getCurrentTime();
        // setCurrentTime(currentTime);
      });

      return () => {
        audioRef.current.destroy();
      };
    };

    createWaveSurferInstance();
  }, [audioUrl, onDuration]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col justify-center items-center py-2 my-1">
      <div ref={audioContainer} className="w-full"></div>
      <div className="flex justify-between w-full mr-1 last-of-type:mr-0">
        <div className="w-max bg-gray-600 text-white text-xs py-[1px] px-1">
          {formatTime(duration)}
        </div>
        <div className="flex mr-1 last-of-type:mr-0 items-center cursor-pointer">
          <button
            type="button"
            className="border-none bg-transparent mr-1"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause size="20" color="#333" variant="Outline" />
            ) : (
              <PlayResons width="20" height="20" gradient={false} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
