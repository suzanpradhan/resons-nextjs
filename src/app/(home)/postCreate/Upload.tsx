import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PlayPauseWithWave from './PlayPauseWithWave';

type UploadPropType = {
  setAudioFile: Dispatch<SetStateAction<File | undefined>>;
  setShouldNext: Dispatch<SetStateAction<boolean>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
};

const Upload = ({
  setAudioFile,
  setShouldNext,
  setAudioDuration,
}: UploadPropType) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadTime, setUploadTime] = useState<number | undefined>(undefined);
  const audioRef = useRef<any>(null);
  const uploadedAudio = useRef<any>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
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

    const getDuration = audioRef.current.getDuration();
    setUploadTime(getDuration);
    setAudioFile(file);

    console.log('KKK', getDuration, uploadTime);
    // setIsNextUploadVisible(true);
    setShouldNext(true);
  };

  useEffect(() => {
    const handleDecode = () => {
      const getAudioDuration = audioRef.current.getDuration();
      setUploadTime(() => {
        const newUploadTime = getAudioDuration * 1000;
        return newUploadTime;
      });
    };

    // const handleFinish = () => {
    //   audioRef.current.setTime(0);
    //   setIsPlaying(false);
    // };

    const handleTimeUpdate = () => {
      const currentTime = audioRef.current.getCurrentTime();
      console.log('Current time', currentTime);

      uploadTime &&
        setUploadTime(() => {
          const getRemainingTime = uploadTime - currentTime;
          return getRemainingTime;
        });
      console.log('upload time', uploadTime);
    };

    if (audioRef.current) {
      audioRef.current.on('decode', handleDecode);
      // audioRef.current.on('finish', handleFinish);
      audioRef.current?.on('timeupdate', handleTimeUpdate);
    }
  }, [audioRef.current]);

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
            {uploadedAudio
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
        {/* {isUploaded && (
          <button className="text-white bg-red-500 px-5 py-3 rounded-md active:scale-105 hover:shadow-md">
            Next
          </button>
        )} */}
      </div>
    </>
  );
};

export default Upload;
