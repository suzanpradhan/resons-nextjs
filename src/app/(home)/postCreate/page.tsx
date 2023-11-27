'use client';

import { useAppDispatch } from '@/core/redux/clientStore';
import genresApi from '@/modules/genres/genresApi';
import topicsApi from '@/modules/topics/topicsApi';
import { MutableRefObject, useEffect, useState } from 'react';
import NextPageComponent from './NextPageComponent';
import Recorder from './Recorder';
import Upload from './Upload';

const UserPostCreatePage = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'recorder' | 'upload'>('upload');

  // data required for audio upload to feed or story
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioWaveData, setAudioWaveData] = useState<any>([0, 1, 0.5, -0.3]);
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);

  const [shouldNext, setShouldNext] = useState(false);
  const [isNextPageVisible, setIsNextPageVisible] = useState(false); // Declare isNextPageVisible here
  const [isNextUploadVisible, setIsNextUploadVisible] = useState(false);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTabClick = (tab: 'recorder' | 'upload') => {
    setActiveTab(tab);
  };

  const onNextButtonClick = (ref: MutableRefObject<any>) => {
    setAudioDuration?.(ref.current.getDuration());
    setAudioWaveData?.(ref.current.exportPeaks()?.[0]);
    setIsNextPageVisible(true);
  };

  const handleOpenNextPage = () => {
    setIsNextPageVisible(true);
  };
  const toggleNextPageVisibility = (visible: boolean) => {
    setIsNextPageVisible(visible);
  };

  useEffect(() => {
    const fetchSharedAudioFiles = async () => {
      try {
        const cache = await caches.open('sharedAudioCache');
        const keys = await cache.keys();
        if (!keys || keys.length <= 0) return;
        const response = await cache.match(keys[0]);
        if (!response) return;
        const audioBlob = await response.blob();
        setAudioFile(audioBlob as File);
        keys.forEach((request, index, array) => {
          cache.delete(request);
        });
      } catch (error) {
        return;
      }
    };
    fetchSharedAudioFiles();
  }, []);

  useEffect(() => {
    dispatch(genresApi.endpoints.getGenres.initiate());
    dispatch(topicsApi.endpoints.getTopics.initiate());
  }, [dispatch]);

  return (
    <div
      className="overflow-y-auto pt-11 pb-[60px]"
      style={{ height: '100vh' }}
    >
      <div className="relative flex justify-been items-center px-6 py-4">
        <h3 className="text-xl">New Post</h3>
        <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
      </div>
      <div
        style={{ display: isNextPageVisible ? 'none' : 'block' }}
        className="px-6 py-4 h-full relative text-center"
      >
        <div className="flex justify-between items-center gap-2">
          <button
            className={`px-5 w-1/2 rounded-md md:w-auto cursor-pointer ${
              activeTab === 'recorder' ? 'bg-red-500' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('recorder')}
          >
            <div className="w-full text-white font-semibold py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105">
              Recorder
            </div>
          </button>
          <button
            className={`px-5 w-1/2 ml-2 rounded-md md:w-auto cursor-pointer ${
              activeTab === 'upload' ? 'bg-red-500' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('upload')}
          >
            <div className="w-full text-white font-semibold py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105">
              Upload
            </div>
          </button>
        </div>

        {activeTab == 'recorder' && (
          <Recorder
            setAudioDuration={setAudioDuration}
            setShouldNext={setShouldNext}
            setAudioFile={setAudioFile}
          />
        )}
        {activeTab == 'upload' && (
          <Upload
            audioDuration={audioDuration}
            setAudioDuration={setAudioDuration}
            setAudioFile={setAudioFile}
            setShouldNext={setShouldNext}
          />
        )}
        {shouldNext && (
          <button
            onClick={handleOpenNextPage}
            className="text-white my-2 bg-red-400 px-5 py-3 rounded-md active:scale-105 hover:shadow-md"
          >
            Next
          </button>
        )}
      </div>
      {isNextPageVisible && (
        <NextPageComponent
          audioFile={audioFile}
          toggleNextPageVisibility={toggleNextPageVisibility}
          audioDuration={audioDuration}
          audioWaveData={audioWaveData}
        />
      )}
    </div>
  );
};

export default UserPostCreatePage;
