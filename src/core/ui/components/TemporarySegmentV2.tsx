import PlayResons from '@/app/(components)/(icons)/PlayResons';
import { Pause } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';

interface TemporarySegmentV2Props {
  audioUrl: string;
  setAudioDuration?: (audioDuration: string) => void;
  setAudioWaveData?: (waveData: string) => void;
}

export function TemporarySegmentV2({
  audioUrl,
  setAudioDuration,
  setAudioWaveData,
}: TemporarySegmentV2Props) {
  const audioContainer = useRef(null);
  const audioRef = useRef<any>(null);
  const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // if (isLoaded) return;
    // audioRef.current = undefined;
    if (typeof window === 'undefined') return;
    const create = async () => {
      if (audioRef.current) {
        audioRef.current.destroy();
        audioRef.current = undefined;
      }
      if (!audioContainer.current) return;
      const WaveSurfer = (await import('wavesurfer.js')).default;
      // Create a new instance of WaveSurfer
      audioRef.current = WaveSurfer.create({
        container: audioContainer.current,
        waveColor: 'gray',
        progressColor: '#B00000',
        cursorColor: 'transparent',
        barWidth: 3,
        barRadius: 3,
        // responsive: true,
        height: 30,
      });

      audioRef.current.load(audioUrl);

      // Handle any error events
      audioRef.current.on('error', (error: any) => {
        console.error('Wavesurfer error:', error);
      });

      // Update current time and duration on audio play
      audioRef.current.on('play', () => {
        const audioDuration = audioRef.current.getDuration();
        setDuration(audioDuration);

        if (setAudioDuration) setAudioDuration(audioDuration.toString());
        const updateCurrentTime = () => {
          const audioCurrentTime = audioRef.current.getCurrentTime();
          // setCurrentTime(audioCurrentTime);
          if (audioCurrentTime < audioDuration) {
            requestAnimationFrame(updateCurrentTime);
          }
        };

        updateCurrentTime();
      });

      audioRef.current.on('ready', () => {
        if (setAudioWaveData && audioRef.current.backend.mergedPeaks) {
          const mergedPeaks = audioRef.current.backend.mergedPeaks;
          setAudioWaveData(JSON.stringify(mergedPeaks));
          const audioDuration = audioRef.current.getDuration();
          if (setAudioDuration) setAudioDuration(audioDuration.toString());
          setDuration(Math.round(audioDuration));
        }
      });
      // setIsLoaded(true);
      // Clean up on component unmount
      return () => {
        audioRef.current.destroy();
      };
    };
    create();
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex items-center py-2 my-1">
      <div ref={audioContainer} className="w-full"></div>
      <div className="basis-5 w-full bg-gray-600 text-white text-xs py-[1px] px-1 mr-1 last-of-type:mr-0">
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
      <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
    </div>
  );
}
