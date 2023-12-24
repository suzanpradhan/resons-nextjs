'use client';

import { privacy_code } from '@/core/constants/appConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import Button from '@/core/ui/components/Button';
import { TemporarySegment } from '@/core/ui/components/TemporarySegment';
import storyApi from '@/modules/story/storyApi';
import {
  CloseCircle,
  ExportCurve,
  Microphone,
  StopCircle,
} from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

interface CreateStoryProps {
  onClose?: () => void;
}

const CreatePopUp = (props: CreateStoryProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectGenre, setSelectGenre] = useState('');
  const [selectPrivacy, setSelectPrivacy] = useState('0');
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioDuration, setAudioDuration] = useState<any>(0);
  const [audioWaveData, setAudioWaveData] = useState<any>(null);
  const navigate = useRouter();

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handlePrivacyChange = (event: any) => {
    setSelectPrivacy(event.target.value);
  };

  const handleFileChange = (event: any) => {
    setAudioFile(undefined);
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const startRecording = async () => {
    try {
      setAudioFile(undefined);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      // eslint-disable-next-line no-undef
      type BlobPart = string | Blob | BufferSource;
      const audioChunks: BlobPart[] = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, {
          type: 'audio/wav',
        });
        var file = new File([audioBlob], 'audio.wav');
        setAudioFile(file);
      });

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    if (audioFile) {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        await Promise.resolve(
          dispatch(
            storyApi.endpoints.addStory.initiate({
              title: title,
              is_ai_generated: "0",
              // genre: selectGenre,
              privacy_code: selectPrivacy,
              audio_file: audioFile!,
              description: description,
              file_duration: audioDuration,
              wave_data: audioWaveData,
            })
          )
        );
        setSelectGenre('');
        setSelectPrivacy('0');
        setTitle('');
        setDescription('');
        setAudioFile(undefined);
        navigate.push('/');
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute w-screen h-screen md:w-[35%] top-0 bg-white z-[50]">
          <div className="flex flex-col h-screen px-6">
            <div className="relative flex justify-between items-center py-4">
              <h3 className="text-xl text-gray-700 font-bold"></h3>
              <button
                className="ml-auto bg-transparent border-0 text-gray-800 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={props.onClose}
              >
                <CloseCircle size="33" color="gray" variant="Outline" />
              </button>
            </div>
            <div className="relative flex flex-col py-2 my-1">
              <h3 className="text-base text-gray-700 capitalize font-bold">
                Add audio story
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="relative z-0 pt-4">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="block pt-2.5 pb-1 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b border-gray-100 appearance-none dark:text-gray-500 dark:border-gray-200 dark:focus:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="title"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform translate-y-0 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-800 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-5 peer-focus:scale-75 peer-focus:-translate-y-0"
                  >
                    Title
                  </label>
                </div>

                <div className="relative z-0 pt-4">
                  <select
                    value={selectPrivacy}
                    onChange={handlePrivacyChange}
                    className="block pt-2.5 pb-1 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-500 dark:border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    {privacy_code?.length > 0 ? (
                      <>
                        {privacy_code?.map((value, index) => (
                          <option value={value.id} key={index}>
                            {value.name}
                          </option>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </select>
                </div>

                <div className="relative z-0 pt-4">
                  <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="block pt-2.5 pb-1 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b border-gray-100 appearance-none dark:text-gray-500 dark:border-gray-200 dark:focus:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="description"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform translate-y-0 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-800 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-5 peer-focus:scale-75 peer-focus:-translate-y-0"
                  >
                    Description
                  </label>
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="relative flex mt-4 mb-4 first-of-type:mb-0 md:mb-0 pt-28 bg-slate-200 border-gray-500 flex-1 cursor-pointer">
                    <label
                      htmlFor="audio"
                      className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer"
                    >
                      <ExportCurve size="48" color="#999" variant="Bulk" />
                    </label>
                    <input
                      type="file"
                      id="audio"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <div
                    className="md:ml-4 relative flex mt-4 mb-4 first-of-type:mb-0 md:mb-0 pt-28 bg-slate-200 border-gray-500 flex-1 cursor-pointer"
                    onClick={recording ? stopRecording : startRecording}
                  >
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                      {recording ? (
                        <button
                          type="button"
                          className="flex justify-center items-center border-none bg-red-400 h-[32px] w-[32px] rounded-full"
                        >
                          <StopCircle size="18" color="white" variant="Bulk" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex justify-center items-center border-none bg-gray-400 h-[32px] w-[32px] rounded-full"
                        >
                          <Microphone size="18" color="white" variant="Bulk" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mx-12">
                  {audioFile ? (
                    <TemporarySegment
                      audioUrl={URL.createObjectURL(audioFile)}
                      setAudioDuration={(audioDuration: string) => {
                        setAudioDuration(audioDuration);
                      }}
                      setAudioWaveData={(audioWaveData: string) => {
                        setAudioWaveData(audioWaveData);
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>

                <div className="w-full flex justify-end px-12 mb-8">
                  <Button
                    text="Publish Post"
                    type="submit"
                    isLoading={isLoading}
                    className="font-bold w-full shadow-accent-400 shadow-md"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-[45] bg-gray-800"></div>
    </>
  );
};

export default CreatePopUp;