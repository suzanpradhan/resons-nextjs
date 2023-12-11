'use client';

import { Microphone, StopCircle } from 'phosphor-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';

type RecorderPropType = {
  setAudioDuration: Dispatch<SetStateAction<number>>;
  setShouldNext: Dispatch<SetStateAction<boolean>>;
  setAudioFile: Dispatch<SetStateAction<File | undefined>>;
  setAudioWaveData: Dispatch<SetStateAction<any>>;
};

const Recorder = ({
  setAudioDuration,
  setShouldNext,
  setAudioFile,
  setAudioWaveData,
}: RecorderPropType) => {
  const [recordTime, setRecordTime] = useState(0);
  const [recording, setRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const recordedAudio = useRef<any>(null);
  const waveRef = useRef<any>(null);
  const record = useRef<any>(null);
  const audioRef = useRef<any>(null);

  const startNewRecording = async () => {
    if (audioRef.current) {
      audioRef.current.destroy();
    }
    setIsPlaying(false);
    setAudioFile(undefined);
    setRecording(true);
    setRecordTime(0);
    const recordInitiate = () => {
      waveRef.current = WaveSurfer.create({
        container: recordedAudio?.current,
        waveColor: '#000000',
        progressColor: '#B00000',
        barWidth: 3,
        height: 80,
        barRadius: 2,
      });
      record.current = waveRef.current.registerPlugin(RecordPlugin.create());

      record.current.startRecording();

      // When we click on stop record button this function would be run.
      record.current.on('record-end', (blob: Blob) => {
        const recordedUrl = URL.createObjectURL(blob);
        // Create wavesurfer from the recorded audio
        audioRef.current = WaveSurfer.create({
          container: recordedAudio.current,
          waveColor: '#000000',
          progressColor: '#B00000',
          url: recordedUrl,
          barWidth: 3,
          height: 80,
          barRadius: 2,
        });

        audioRef.current.on('finish', () => {
          audioRef.current.setTime(0);
          setIsPlaying(false);
        });

        const file = new File([blob], 'audio.wav');
        setAudioFile(file);
        setRecording(false);
      });
    };
    recordInitiate();
  };

  const stopTheRecording = () => {
    if (waveRef.current) {
      waveRef.current.on('decode', () => {
        const getAudioDuration = waveRef.current.getDuration();
        setRecordTime(getAudioDuration * 1000);
        setAudioDuration(recordTime);
        console.log(waveRef.current.exportPeaks()[0]);
        setAudioWaveData?.(waveRef.current.exportPeaks()[0]);
        setShouldNext(true);
      });
      waveRef.current.destroy();
    }
    if (record.current) {
      record.current.stopRecording();
      record.current.destroy();
    }
    // setShouldNext(true);
    // console.log(shouldNext);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.on('timeupdate', (currentTime: number) => {
      const getRemainaingTime = recordTime - currentTime * 1000;
      setRecordTime(getRemainaingTime);
      console.log(recordTime);
    });
  }, [audioRef.current]);

  useEffect(() => {
    let interval: any;
    if (recording) {
      interval = setInterval(() => {
        setRecordTime((prevTime) => prevTime + 100);
      }, 100);
    } else if (!recording) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording]);

  return (
    <div className="flex flex-col">
      {/* <PlayPauseWithWave
        audio={recordedAudio}
        audioTime={recordTime}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      /> */}
      <div className="mt-4 text-right flex flex-col items-center">
        <h2 className="text-gray-900 text-2xl font-thin min-w-[140px] inline-flex justify-center items-center">
          <>
            <span className="inline-flex w-9 justify-center">
              {('0' + Math.floor((recordTime / 60000) % 60)).slice(-2)}
            </span>
            <span className="inline-flex">:</span>
            <span className="inline-flex w-9 justify-center">
              {('0' + Math.floor((recordTime / 1000) % 60)).slice(-2)}
            </span>
          </>
        </h2>
        <button
          onClick={recording ? stopTheRecording : startNewRecording}
          type="button"
          className="flex justify-center items-center border-none bg-red-400 h-[48px] w-[48px] rounded-full"
        >
          {recording ? (
            <StopCircle size="32" color="white" weight="fill" />
          ) : (
            <Microphone size="24" color="white" weight="fill" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Recorder;
