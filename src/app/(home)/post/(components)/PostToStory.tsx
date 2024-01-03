import { useAppDispatch } from '@/core/redux/clientStore';
import storyApi from '@/modules/story/storyApi';
import {
  CreateStoryDetailType,
  createStoryDetailSchema,
} from '@/modules/story/storyType';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import {
  Microphone,
  Pause,
  Play,
  StopCircle,
  UploadSimple,
  X,
} from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { ZodError } from 'zod';

const PostToStory = () => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const recordedAudio = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordTime, setRecordTime] = useState<number | undefined>(undefined);
  const [hiddenButton, setHiddenButton] = useState<
    'upload' | 'record' | undefined
  >(undefined);
  const [recording, setRecording] = useState(false);
  const waveRef = useRef<any>(null);
  const record = useRef<any>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioWaveData, setAudioWaveData] = useState<any>([0, 1, 0.5, -0.3]);

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

  const onSubmit = async (data: CreateStoryDetailType) => {
    console.log(data);
    try {
      const responseData = await Promise.resolve(
        dispatch(
          storyApi.endpoints.addStory.initiate({
            audio_file: data.audio_file!,
            file_duration: data.file_duration,
            wave_data: audioWaveData,
          })
        )
      );
      if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
        await dispatch(storyApi.endpoints.getMyStoryList.initiate());
        navigate.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startNewRecording = async () => {
    setHiddenButton('upload');
    if (audioRef.current) {
      audioRef.current.destroy();
    }
    setIsPlaying(false);

    setRecording(true);
    setRecordTime(0);
    const recordInitiate = () => {
      waveRef.current = WaveSurfer.create({
        container: recordedAudio?.current,
        waveColor: '#000000',
        progressColor: '#B00000',
        barWidth: 3,
        height: 300,
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
          height: 300,
          barRadius: 2,
        });

        audioRef.current.on('finish', () => {
          audioRef.current.setTime(0);
          setIsPlaying(false);
        });
        const file = new File([blob], 'audio.wav');
        formik.setFieldValue('audio_file', file);
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
        setAudioDuration(recordTime!);
        console.log(waveRef.current.exportPeaks()[0]);
        setAudioWaveData?.(waveRef.current.exportPeaks()[0]);
        // setShouldNext(true);
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
      const getRemainaingTime = recordTime! - currentTime * 1000;
      setRecordTime(getRemainaingTime);
    });
  }, [audioRef.current]);

  useEffect(() => {
    let interval: any;
    if (recording) {
      interval = setInterval(() => {
        setRecordTime((prevTime) => prevTime! + 100);
      }, 100);
    } else if (!recording) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const handleFileChange = (e: any) => {
    // e.preventdefault();
    console.log(audioRef);
    setHiddenButton('record');

    if (audioRef.current != null) {
      console.log(audioRef);
      audioRef.current.destroy();
      audioRef.current = null;
    }

    const file = e.target.files[0];
    let audioElement: any;

    if (file) {
      audioElement = new Audio();
      audioElement.src = URL.createObjectURL(file);
      audioElement.load();
    }

    audioRef.current = WaveSurfer.create({
      container: recordedAudio.current,
      waveColor: '#000000',
      progressColor: '#B00000',
      url: audioElement.src,
      barWidth: 3,
      height: 300,
      barRadius: 2,
    });

    formik.setFieldValue('audio_file', file);

    // setIsNextUploadVisible(true);
    // setShouldNext(true);
  };

  const handleCancelAudio = () => {
    if (audioRef?.current) {
      audioRef.current.destroy();
    }
    if (waveRef?.current) {
      waveRef.current.destroy();
    }
    formik.setFieldValue('audio_file', undefined);
    setHiddenButton(undefined);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.on('ready', () => {
        const getAudioDuration = audioRef.current.getDuration();
        // console.log('audio Duration' + getAudioDuration);
        setRecordTime(getAudioDuration * 1000);
        setAudioDuration(getAudioDuration * 1000);
        setAudioWaveData?.(audioRef.current.exportPeaks()[0]);
      });
      audioRef.current.on('finish', () => {
        audioRef.current.setTime(0);
        setIsPlaying(false);
      });
    }
    audioRef.current?.on('timeupdate', () => {
      const currentTime = audioRef.current.getCurrentTime();
      setRecordTime(audioDuration - currentTime * 1000);
    });
  }, [audioRef.current, audioDuration]);

  const validateForm = (values: CreateStoryDetailType) => {
    try {
      createStoryDetailSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);

        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<CreateStoryDetailType>({
    enableReinitialize: true,
    initialValues: {
      audio_file: undefined,
      file_duration: '',
      wave_data: '',
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target);
        formik.handleSubmit(e);
      }}
      className="overflow-y-scroll h-full pb-20 flex flex-col items-center max-h-[95%] bg-white"
    >
      <div className="px-4 h-12 bg-white shadow-sm flex items-center gap-2 my-0 w-full">
        <div className="text-base font-normal flex-1">Create a story</div>
        <button type="submit" className="text-red-500 text-base">
          Post
        </button>
      </div>

      <div className="relative bg-[#f5f6fa] grow w-full flex flex-col justify-center">
        <div ref={recordedAudio}></div>
        <div className="flex absolute bottom-2 left-0 right-0 w-full justify-center">
          {recordTime && (
            <span className="inline-flex  py-0.5 px-2 bg-gray-600 text-white rounded-md">
              {formatTime(recordTime / 1000)}
            </span>
          )}
        </div>
        {formik.values.audio_file == undefined && !recording ? (
          <div className="absolute text-dark-400 text-center w-full">
            Record or Upload audio
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex gap-4 mt-5">
        {!formik.values.audio_file && (
          <button
            type="button"
            className={classNames(
              'rounded-full bg-black p-4 text-white ',
              hiddenButton === 'record' ? 'hidden' : 'block'
            )}
            onClick={recording ? stopTheRecording : startNewRecording}
          >
            {recording ? <StopCircle size={35} /> : <Microphone size={35} />}
          </button>
        )}
        {formik.values.audio_file && (
          <button
            type="button"
            className={classNames('rounded-full bg-red-500 p-4 text-white ')}
            onClick={handleCancelAudio}
          >
            <X size={35} weight="bold" />
          </button>
        )}
        {formik.values.audio_file && (
          <button
            className="bg-black p-4 rounded-full"
            onClick={() => handlePlayPause()}
            type="button"
          >
            {isPlaying ? (
              <Pause size={35} className={`text-white`} weight="fill" />
            ) : (
              <Play size={35} className={`text-white`} weight="fill" />
            )}
          </button>
        )}

        {!formik.values.audio_file && (
          <div>
            <div
              className={classNames(
                'rounded-full bg-black p-4 mb-0',
                hiddenButton === 'upload' ? 'hidden' : 'block'
              )}
            >
              <label htmlFor="audioUpload" className="text-white mb-0">
                <UploadSimple size={35} />
              </label>
            </div>
            <input
              //   style={{ display: 'none' }}
              hidden
              id="audioUpload"
              type="file"
              accept="audio/*"
              onClick={(e) => {
                (e.target as HTMLInputElement).value = '';
              }}
              onChange={(e) => handleFileChange(e)}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default PostToStory;
