'use client'

import { useAppDispatch } from '@/core/redux/clientStore';
import genresApi from '@/modules/genres/genresApi';
import topicsApi from '@/modules/topics/topicsApi';
import classNames from 'classnames';
import { Microphone, Pause, Play, StopCircle } from 'phosphor-react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import NextPageComponent from './nextPageComp/page';


const UserPostCreatePage = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<'recorder' | 'upload'>('upload');
    const [audioDuration, setAudioDuration] = useState<number>(0);
    const [audioWaveData, setAudioWaveData] = useState<any>([0, 1, 0.5, -0.3]);
    const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
    const [recording, setRecording] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [shouldNext, setShouldNext] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false)
    const [uploadTime, setUploadTime] = useState<undefined | number>(undefined)
    const audioRef = useRef<any>(null);
    const waveRef = useRef<any>(null);
    const record = useRef<any>(null);
    const recordedAudio = useRef<any>(null);
    const uploadedAudio = useRef<any>(null)
    const uploadedAudioRef = useRef<any>(null)

    const [isNextPageVisible, setIsNextPageVisible] = useState(false); // Declare isNextPageVisible here
    const [isNextUploadVisible, setIsNextUploadVisible] = useState(false);


    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleTabClick = (tab: "recorder" | "upload") => {
        setActiveTab(tab);
    };

    const onNextButtonClick = (ref: MutableRefObject<any>) => {
        setAudioDuration?.(ref.current.getDuration());
        setAudioWaveData?.(ref.current.exportPeaks()?.[0]);
        setIsNextPageVisible(true);
    }

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleUploadPlayPause = () => {
        if (!uploadedAudioRef.current) return;
        if (isPlaying) {
            uploadedAudioRef.current.pause();
        } else {
            uploadedAudioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const stopTheRecording = () => {
        if (waveRef.current) {
            waveRef.current.on("decode", () => {
                const getAudioDuration = waveRef.current.getDuration();
                setRecordTime(getAudioDuration * 1000);
                console.log("++", recordTime)
                setAudioDuration(getAudioDuration);
            });
            waveRef.current.destroy();
        }
        if (record.current) {
            record.current.stopRecording();
            record.current.destroy();
        }
        setShouldNext(true);
    }

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
            })
        }
        recordInitiate();
    }

    const handleOpenNextPage = () => {
        setIsNextPageVisible(true);
    };
    const toggleNextPageVisibility = (visible: boolean) => {
        setIsNextPageVisible(visible);
    };

    const handleFileChange = (e: any) => {
        setAudioFile(undefined);
        const file = e.target.files[0];
        const audioElement = new Audio();
        audioElement.src = URL.createObjectURL(file);
        audioElement.load();
        console.log(audioElement);

        const initiateUploadTime = () => {
            uploadedAudioRef.current = WaveSurfer.create({
                container: uploadedAudio.current,
                waveColor: '#000000',
                progressColor: '#B00000',
                url: audioElement.src,
                barWidth: 3,
                height: 80,
                barRadius: 2,
            });


        }

        initiateUploadTime();

        setAudioFile(file);

        // setIsNextUploadVisible(true);
        setShouldNext(true);
        setIsUploaded(true)
    };

    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.on('timeupdate', (currentTime: number) => {
            const getRemainaingTime = recordTime - (currentTime * 1000);
            setRecordTime(getRemainaingTime);
            console.log(recordTime)
        })
    }, [audioRef.current]);

    useEffect(() => {
        if (!uploadedAudioRef.current) return;
        if (uploadedAudioRef.current) {
            uploadedAudioRef.current.on("decode", () => {
                const getAudioDuration = uploadedAudioRef.current.getDuration();
                setUploadTime(getAudioDuration * 1000);
                console.log("upload time", uploadTime)
            });
        }
        uploadedAudioRef.current.on('finish', () => {
            uploadedAudioRef.current.setTime(0);
            setIsPlaying(false);
        });
        uploadedAudioRef.current.on('timeupdate', (currentTime: number) => {
            if (uploadTime != undefined) {
                console.log(">>> upload time", uploadTime)
                const getRemainaingTime = uploadTime - (currentTime * 1000);
                console.log(">>> remaining time time", getRemainaingTime)
                setUploadTime(getRemainaingTime);
            }
        });
    }, [uploadedAudioRef.current]);

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
        <div className='overflow-y-auto pt-11 pb-[60px]' style={{ height: '100vh' }}>
            <div className="relative flex justify-been items-center px-12 py-4">
                <h3 className="text-xl">New Post</h3>
                <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
            </div>
            <div style={{ display: isNextPageVisible ? 'none' : 'block' }}
                className="px-6 py-4 h-full relative">

                <div className="flex justify-between items-center gap-2">
                    <button className={`px-5 w-1/2 rounded-md md:w-auto cursor-pointer ${activeTab === 'recorder' ? 'bg-red-500' : 'bg-gray-300'}`} onClick={() => handleTabClick('recorder')}>
                        <div className="w-full text-white font-semibold py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105">
                            Recorder
                        </div>
                    </button>
                    <button className={`px-5 w-1/2 ml-2 rounded-md md:w-auto cursor-pointer ${activeTab === 'upload' ? 'bg-red-500' : 'bg-gray-300'}`} onClick={() => handleTabClick('upload')}>
                        <div className="w-full text-white font-semibold py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105">
                            Upload
                        </div>
                    </button>
                </div>

                {activeTab == 'recorder' &&
                    <div className={`bg-slate-200 pl-10 pr-[80px] mt-4 relative h-[150px] flex flex-col justify-center`} ref={recordedAudio}>
                        <div className='inline-flex absolute left-[10px]' onClick={handlePlayPause}>
                            {isPlaying ?
                                <Pause
                                    size="24"
                                    className="text-white"
                                    weight="fill"
                                /> :
                                <Play
                                    size="24"
                                    className="text-white"
                                    weight="fill"
                                />
                            }
                        </div>
                        <div className="inline-flex absolute right-[15px] py-0.5 px-2 bg-gray-600 text-white rounded-md">
                            <div>{formatTime(recordTime / 1000)}</div>
                        </div>
                    </div>
                }
                {activeTab == 'upload' &&
                    <div>

                        <div className={`bg-slate-200 pl-10 pr-[80px] mt-4 relative h-[150px] flex flex-col justify-center`} ref={uploadedAudio}>
                            {isUploaded ? <div className='inline-flex absolute left-[10px]' onClick={handleUploadPlayPause}>
                                {isPlaying ?
                                    <Pause
                                        size="24"
                                        className="text-white"
                                        weight="fill"
                                    /> :
                                    <Play
                                        size="24"
                                        className="text-white"
                                        weight="fill"
                                    />
                                }
                            </div> :
                                <div>
                                    <label htmlFor='audio' className='text-center'><div className='text-white bg-red-500 px-5 py-3 rounded-md active:scale-105 hover:shadow-md'>Choose audio file to upload</div></label>
                                    <input
                                        className='hidden'
                                        type="file"
                                        id="audio"
                                        accept="audio/*"
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                </div>
                            }

                            <div className={classNames("inline-flex absolute right-[15px] py-0.5 px-2 bg-gray-600 text-white rounded-md", isUploaded ? 'block' : 'hidden')}>
                                {uploadTime && <div>{formatTime(uploadTime / 1000)}</div>}
                            </div>
                        </div>
                    </div>

                }
                <div className='flex justify-end w-full'>
                    <button
                        className={`mt-3 inline-flex text-white ${shouldNext
                            ? "bg-red-500 cursor-pointer"
                            : "bg-slate-200 cursor-not-allowed"
                            }  font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform`}
                        onClick={() => { activeTab === "recorder" && onNextButtonClick(audioRef); activeTab === "upload" && onNextButtonClick(uploadedAudioRef) }}
                    >
                        Next
                    </button>
                </div>

                <div className="mt-4 text-right">
                    {activeTab === 'recorder' && (
                        <>
                            <div className='flex w-full justify-center'>
                                <h2 className='text-gray-900 text-2xl font-thin min-w-[140px] inline-flex justify-center items-center'>
                                    <>
                                        <span className='inline-flex w-9 justify-center'>{("0" + Math.floor((recordTime / 60000) % 60)).slice(-2)}</span>
                                        <span className='inline-flex'>:</span>
                                        <span className='inline-flex w-9 justify-center'>{("0" + Math.floor((recordTime / 1000) % 60)).slice(-2)}</span>
                                        {/* <span className='inline-flex'>:</span>
                    <span className='inline-flex w-9 justify-center'>{("0" + Math.floor((recordTime / 10) % 100)).slice(-2)}</span> */}
                                    </>
                                </h2>
                            </div>

                            {recording ? (
                                <button
                                    onClick={stopTheRecording}
                                    type="button"
                                    className="absolute bottom-[130px] left-1/2 -translate-x-1/2 flex justify-center items-center border-none bg-red-400 h-[48px] w-[48px] rounded-full"
                                >
                                    <StopCircle size="32" color="white" weight='fill' />
                                </button>
                            ) : (
                                <button
                                    onClick={startNewRecording}
                                    type="button"
                                    className="absolute bottom-[130px] left-1/2 -translate-x-1/2 flex justify-center items-center border-none bg-red-400 h-[48px] w-[48px] rounded-full"
                                >
                                    <Microphone size="24" color="white" weight="fill" />
                                </button>
                            )}

                        </>
                    )}

                    {/* {activeTab === 'upload' && (
            <div className="rounded-sm">
              <div className="flex justify-between items-center gap-2">

                <div className={` w-1/2 rounded-md md:w-auto cursor-pointer bg-red-400}`} >
                  <div className="relative flex py-5 border-dashed bg-red-400 flex-1 cursor-pointer">
                    <label
                      htmlFor="audio"
                      className="absolute top-0 left-0 w-full h-full bg-white-400 flex justify-center items-center cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    </label>

                    <input
                      type="file"
                      id="audio"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className={`px-5 w-1/2 ml-2 rounded-md md:w-auto cursor-pointer bg-red-500`}>
                  {isNextUploadVisible && (
                    <button onClick={handleOpenNextPage} className="w-full text-white bg-red-500 font-semibold py-2 px-4 rounded-tr-sm rounded-br-sm transition duration-300 ease-in-out transform hover:scale-105">
                      Next
                    </button>
                  )}
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  className="py-3 px-4 h-11 border rounded-sm bg-slate-100 text-sm focus:outline-none placeholder:text-sm text-gray-700 font-normal border-gray-200"
                  placeholder="Search audio"
                />
                <div className="absolute w-8 h-full right-0 inline-flex items-center pointer-events-none">
                  <MagnifyingGlass size={20} weight="light" />
                </div>
              </div>

              <div className="mt-4 mb-2">
                <span className="text-gray-700 font-bold">12,252 audio files</span>
              </div>

              <ul className="mt-4">
                <li className="flex items-center justify-between py-2 border-b border-gray-300">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 5v14l11-7z"
                      />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Voice 072.m4a</span>
                      <span className="text-xs text-gray-500 text-left">Sep 18 21:19</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">1.34 minuts</span>
                    <span className="text-sm text-gray-500 text-right">43 KB</span>
                  </div>
                </li>

                <li className="flex items-center justify-between py-2 border-b border-gray-300">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 5v14l11-7z"
                      />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Voice 072.m4a</span>
                      <span className="text-xs text-gray-500 text-left">Sep 18 21:19</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">1.34 minuts</span>
                    <span className="text-sm text-gray-500 text-right">43 KB</span>
                  </div>
                </li>
              </ul>
            </div>
          )} */}
                </div>
            </div>
            {isNextPageVisible && (
                <NextPageComponent audioFile={audioFile} toggleNextPageVisibility={toggleNextPageVisibility} audioDuration={audioDuration} audioWaveData={audioWaveData} />
            )}
        </div >
    );
};

export default UserPostCreatePage;
