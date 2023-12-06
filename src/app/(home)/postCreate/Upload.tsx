'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PlayPauseWithWave from './PlayPauseWithWave';

type UploadPropType = {
  audioDuration: number;
  setAudioFile: Dispatch<SetStateAction<File | undefined>>;
  setShouldNext: Dispatch<SetStateAction<boolean>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
  setAudioWaveData: Dispatch<SetStateAction<any>>;
};

const Upload = ({
  audioDuration,
  setAudioFile,
  setShouldNext,
  setAudioDuration,
  setAudioWaveData,
}: UploadPropType) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadTime, setUploadTime] = useState<number | undefined>(undefined);
  const audioRef = useRef<any>(null);
  const uploadedAudio = useRef<any>(null);

  const handleFileChange = (e: any) => {
    if (audioRef.current != null) {
      audioRef.current.destroy();
      audioRef.current = null;
    }

    const file = e.target.files[0];
    setUploadTime(0);
    let audioElement: any;

    if (file) {
      setAudioFile(undefined);
      audioElement = new Audio();
      audioElement.src = URL.createObjectURL(file);
      audioElement.load();
    }

    audioRef.current = WaveSurfer.create({
      container: uploadedAudio.current,
      waveColor: '#000000',
      progressColor: '#B00000',
      url: audioElement.src,
      barWidth: 3,
      height: 80,
      barRadius: 2,
    });

    setAudioFile(file);

    // setIsNextUploadVisible(true);
    setShouldNext(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.on('ready', () => {
        const getAudioDuration = audioRef.current.getDuration();
        console.log('audio Duration' + getAudioDuration);
        setUploadTime(getAudioDuration * 1000);
        setAudioDuration(getAudioDuration * 1000);
        setAudioWaveData?.(audioRef.current.exportPeaks()[0]);
      });
      audioRef.current.on('finish', () => {
        audioRef.current.setTime(0);
        setIsPlaying(false);
      });
    }
  }, [audioRef.current, setAudioDuration]);

  useEffect(() => {
    audioRef.current?.on('timeupdate', () => {
      const currentTime = audioRef.current.getCurrentTime();
      setUploadTime(audioDuration - currentTime * 1000);
    });
  }, [audioRef.current, audioDuration]);

  return (
    <>
      <div className={`flex flex-col`}>
        <PlayPauseWithWave
          audioTime={uploadTime}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audio={uploadedAudio}
          audioRef={audioRef}
        />
      </div>
      <div className="mt-4 text-center">
        <label htmlFor="audio" className="text-center">
          <div
            typeof="button"
            className="text-white bg-red-500 px-5 py-3 mx-auto rounded-md w-max active:scale-105 hover:shadow-md"
          >
            {audioRef.current == null
              ? 'Choose audio file to upload'
              : 'Choose new audio file'}
          </div>
          <input
            className="hidden"
            type="file"
            id="audio"
            accept="audio/*"
            onChange={(e) => handleFileChange(e)}
          />
        </label>
      </div>
    </>
  );
};

export default Upload;
