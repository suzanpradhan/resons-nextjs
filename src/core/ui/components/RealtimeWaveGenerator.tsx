import { Pause, Play } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface TemporarySegmentProps {
  audioUrl: string;
  setAudioDuration?: (audioDuration: string) => void;
  setAudioWaveData?: (waveData: string) => void;
  isNextPageVisible: boolean,
  openNextPage: () => void;
}

export function RealtimeWaveGenerator({
  audioUrl,
  setAudioDuration,
  setAudioWaveData,
  isNextPageVisible,
  openNextPage
}: TemporarySegmentProps) {
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | undefined>(
    undefined
  );
  const audioContainer = useRef(null);
  const audioRef = useRef<any>(null);
  const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!audioUrl) return;
    if (typeof window === 'undefined') return;
    const create = async () => {
      if (audioRef.current) {
        audioRef.current.destroy();
        audioRef.current = undefined;
      }
      if (!audioContainer.current) return;
      // Create a new instance of WaveSurfer
      audioRef.current = WaveSurfer.create({
        container: audioContainer.current,
        waveColor: '#000000',
        progressColor: '#B00000',
        cursorColor: 'transparent',
        barWidth: 3,
        barRadius: 3,
        // responsive: true,
        height: 60,
      });

      audioRef.current.load(audioUrl);


      console.log("audioRef.current.getDuration();", audioRef.current.getCurrentTime());

      // Handle any error events
      audioRef.current.on('error', (error: any) => {
        console.error('Wavesurfer error:', error);
      });

      // Update current time and duration on audio play
      audioRef.current.on('ready', () => {
        // Check if audioRef and backend exist
        if (!audioRef.current || !audioRef.current.backend) {
          return;
        }

        // Check if audio file is ready
        if (audioRef.current.isReady) {
          console.log("ready file");
          const mergedPeaks = audioRef.current.backend.mergedPeaks;
          if (setAudioWaveData) {
            console.log("ready file peaks");
            setAudioWaveData(JSON.stringify(mergedPeaks));
          }

          const audioDuration = audioRef.current.getDuration();
          if (setAudioDuration) {
            setAudioDuration(audioDuration.toString());
          }

          setDuration(Math.round(audioDuration));
        } else {
          // Handle the case where the audio is not yet ready
          console.log("Audio is not ready yet");
        }
      });

      return () => {
        audioRef.current.destroy();
      };
    };
    create();
  }, [audioUrl]);

  useEffect(() => {
    if (!audioUrl) return;
    audioRef.current.on('play', () => {
      const audioDuration =
        audioRef.current.getDuration();
      console.log(audioDuration);

      if (setAudioDuration) setAudioDuration(audioDuration.toString());
      setDuration(audioDuration);
      const updateCurrentTime = () => {
        const audioCurrentTime = audioRef.current.getCurrentTime();
        if (audioCurrentTime < audioDuration) {
          requestAnimationFrame(updateCurrentTime);
        }
      };

      updateCurrentTime();
    });
  }, []);

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


  const onNextButtonClick = () => {
    setAudioDuration?.(audioRef.current.getDuration());
    setAudioWaveData?.(audioRef.current.exportPeaks()?.[0]);
    if (isNextPageVisible) {
      openNextPage();
    }
  }

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 flex">
          <button
            type="button"
            onClick={handlePlayPause}
            className="border-none bg-transparent mr-1"
          >
            {isPlaying ? (
              <Pause size="18" color="#333" variant="Outline" />
            ) : (
              <Play size="18" color="#333" variant="Outline" />
            )}
          </button>
          <div className="flex-1 px-2">
            <div className='audio-wave-ref w-auto' ref={audioContainer}></div>
          </div>
        </div>

        <div className="w-max">
          <div>{formatTime(duration)}</div>
        </div>
      </div>
      <button
        className={`absolute right-0 top-full mt-3 bg-red-500 inline-flex text-white ${isNextPageVisible
          ? "bg-blue-500 cursor-pointer"
          : "bg-slate-200 cursor-not-allowed"
          }  font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform`}
        onClick={onNextButtonClick}
      >
        Next
      </button>
    </>
  );
}
