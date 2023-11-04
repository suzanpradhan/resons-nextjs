import { Pause, Play } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';

interface TemporarySegmentProps {
  audioUrl: string;
  setAudioDuration?: (audioDuration: string) => void;
  setAudioWaveData?: (waveData: string) => void;
}

export function TemporarySegment({
  audioUrl,
  setAudioDuration,
  setAudioWaveData,
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

  // useEffect(() => {
  //   setCurrentAudioUrl(audioUrl);
  // }, []);

  useEffect(() => {
    console.log('checking');

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
        height: 60,
      });

      audioRef.current.load(audioUrl);

      // Handle any error events
      audioRef.current.on('error', (error: any) => {
        console.error('Wavesurfer error:', error);
      });

      // Update current time and duration on audio play
      audioRef.current.on('play', () => {
        const audioDuration =
          audioRef.current.getDuration();
        console.log(audioDuration);

        if (setAudioDuration) setAudioDuration(audioDuration.toString());
        setDuration(audioDuration);
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
        // Check if audioRef and backend exist
        if (!audioRef.current || !audioRef.current.backend) {
          return;
        }

        // Check if audio file is ready
        if (audioRef.current.isReady) {
          const mergedPeaks = audioRef.current.backend.mergedPeaks;
          if (setAudioWaveData) {
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

      // audioRef.current.on('ready', () => {
      //   if (setAudioWaveData && audioRef.current.backend.mergedPeaks) {
      //     const mergedPeaks = audioRef.current.backend.mergedPeaks;
      //     setAudioWaveData(JSON.stringify(mergedPeaks));
      //     const audioDuration = audioRef.current.getDuration();
      //     if (setAudioDuration) setAudioDuration(audioDuration.toString());
      //     setDuration(Math.round(audioDuration));
      //   }
      // });
      // setIsLoaded(true);
      // Clean up on component unmount
      return () => {
        audioRef.current.destroy();
      };
    };
    create();
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

  return (
    <div className="flex items-center justify-between w-full">
      <div className="basis-[75%] w-full flex">
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
        <div className="basis-[75%] w-full" ref={audioContainer}></div>
      </div>

      <div className="basis-[5%]">
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  );
}
