'use client';

import { language_code, privacy_code } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import AsyncMultiSelect from '@/core/ui/components/AsyncMultiSelect';
import {
  PostFormDetailsType,
  postFormDetailsSchema,
} from '@/modules/post/postType';
import profileApi from '@/modules/profile/profileApi';
import classnames from 'classnames';
import { useFormik } from 'formik';
import Image from 'next/image';
import {
  ImageSquare,
  MapPin,
  Microphone,
  StopCircle,
  Translate,
  UploadSimple,
} from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { toFormikValidate } from 'zod-formik-adapter';
import PlayPauseWithWave from './(components)/PlayPauseWithWave';

const coverImages = [
  { id: 1, source: '/images/avatar.jpg' },
  { id: 2, source: '/images/cover.webp' },
  { id: 3, source: '/images/cover.webp' },
  { id: 4, source: '/images/avatar.jpg' },
  { id: 5, source: '/images/cover.webp' },
  { id: 6, source: '/images/avatar.jpg' },
];

const EXPIRATION_OPTIONS = ['Never', '1 day', '1 week', '1 month', '1 year'];
const LOCATION_OPTIONS = [
  'Asia',
  'Africa',
  'Europe',
  'N. America',
  'S. America',
  'Antartica',
];

const PostCreatePage = () => {
  const dispatch = useAppDispatch();
  const [imagesVisibility, toggleImagesVisibility] = useState(false);
  const [locationInputVisibility, toggleLocationInputVisibility] =
    useState(false);
  const [languageInputVisibility, toggleLanguageInputVisibility] =
    useState(false);

  //recorded audio datas
  const recordedAudio = useRef<any>(null);
  const [recordTime, setRecordTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<any>(null);
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
  const [recording, setRecording] = useState(false);
  const waveRef = useRef<any>(null);
  const record = useRef<any>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const onSubmit = (values: PostFormDetailsType) => {
    console.log(values);
  };

  useEffect(() => {
    dispatch(profileApi.endpoints.getMyProfileData.initiate('?load=true'));
    // dispatch(coverImageApi.endpoints.getCoverImage.initiate());
  }, [dispatch]);

  const myProfile = useAppSelector((state: RootState) => {
    return state.baseApi.queries[`getMyProfileData("?load=true")`]?.data as any;
  });

  // const coverImages = useAppSelector((state: RootState) => {
  //   return state.baseApi.queries['getCoverImage']?.data as any;
  // });
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
        console.log('++', recordTime);
        setAudioDuration(recordTime);
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
      container: recordedAudio.current,
      waveColor: '#000000',
      progressColor: '#B00000',
      url: audioElement.src,
      barWidth: 3,
      height: 80,
      barRadius: 2,
    });

    const getDuration = audioRef.current.getDuration();
    setRecordTime(getDuration);
    setAudioFile(file);

    // setIsNextUploadVisible(true);
    // setShouldNext(true);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      privacy_code: 1,
      expiration: '',
      tag: [],
    },
    validate: toFormikValidate(postFormDetailsSchema),
    onSubmit,
  });

  const handleChange = (event: any) => {
    if (event.target) {
      formik.setFieldValue(event.target.name, event.target.value);
    } else {
      console.log(event);
      formik.setFieldValue('tag', event.value);
    }
    console.log(formik.values);
  };

  return (
    <div className="sm:container md:container lg:container mx-auto h-full">
      <div className="overflow-y-scroll h-full pb-20">
        <h2 className="px-4 py-3 bg-white shadow-sm flex items-center gap-2 text-lg my-0">
          <span className="text-4xl -my-2 font-light">&#60;</span>
          <span className="font-medium">Create a new post</span>
        </h2>
        {myProfile && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
              formik.handleSubmit(e);
            }}
          >
            <div className="px-5 bg-black py-4 flex-col gap-">
              <div className="flex gap-3 items-center">
                <div className="relative w-16 h-16 ">
                  <Image
                    className="rounded-full"
                    src={
                      myProfile?.profile_image &&
                      myProfile.profile_image != null
                        ? myProfile.viewProfile.profile_image
                        : '/images/avatar.jpg'
                    }
                    alt="post_owner_avatar"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    objectFit="cover"
                  />
                </div>
                <div className="text-white">
                  <h3>{myProfile.name}</h3>
                  <p className="text-sm">{myProfile.country}Afganistan</p>
                </div>
              </div>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter title here"
                className="-ml-2 bg-transparent !border-0 placeholder:text-slate-400 !focus:border-0 focus:outline-0 text-white"
                onChange={handleChange}
              />
              {recordedAudio && (
                <PlayPauseWithWave
                  audio={recordedAudio}
                  audioTime={recordTime}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  audioRef={audioRef}
                />
              )}
              <div className="text-white flex gap-2 px-3 py-2 items-center rounded-md bg-[#414141] ">
                <span className="grow text-slate-400">
                  Record or Upload Audio
                </span>
                <button
                  className={'rounded-full bg-[#535353] p-2'}
                  onClick={recording ? stopTheRecording : startNewRecording}
                >
                  {recording ? (
                    <StopCircle size={24} />
                  ) : (
                    <Microphone size={24} />
                  )}
                </button>

                <label
                  className="rounded-full bg-[#535353] p-2 mb-0"
                  htmlFor="audioUpload"
                >
                  <UploadSimple size={24} />
                  <input
                    hidden
                    id="audioUpload"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>
              </div>
            </div>
            {/* <PostCard /> */}
            <div className="mx-4 pt-3 flex flex-col gap-4 ">
              <div className="flex gap-2 border-[1px] px-2 rounded-md border-[#b3adad]">
                <span className=" h-10 flex items-center grow">
                  Add to your post
                </span>
                <button
                  className={imagesVisibility ? `text-red-400` : `text-black`}
                  onClick={() =>
                    toggleImagesVisibility((prevState) => !prevState)
                  }
                >
                  <ImageSquare size={24} weight="fill" />
                </button>
                <button
                  className={
                    locationInputVisibility ? `text-red-400` : `text-black`
                  }
                  onClick={() =>
                    toggleLocationInputVisibility((prevState) => !prevState)
                  }
                >
                  <MapPin size={24} weight="fill" />
                </button>
                <button
                  onClick={() =>
                    toggleLanguageInputVisibility((prevState) => !prevState)
                  }
                >
                  <Translate
                    size={20}
                    className={classnames(
                      ` text-white mt-[2px]`,
                      languageInputVisibility ? 'bg-red-400' : 'bg-black'
                    )}
                  />
                </button>
              </div>
              {imagesVisibility && coverImages && (
                <div className="grid grid-cols-2 gap-2 w-80">
                  {coverImages?.map((item) => (
                    <div key={item.id} className="w-full h-20 relative">
                      <label className="mb-0" htmlFor={item.id.toString()}>
                        <Image
                          className="rounded"
                          src={item.source}
                          alt="cover image"
                          fill
                          objectFit="cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </label>
                      <input
                        id={item.id.toString()}
                        type="radio"
                        name="cover_image_id"
                        value={item.id}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              )}
              {locationInputVisibility && (
                <>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <select
                    name="location"
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
                    id="location"
                    onChange={handleChange}
                  >
                    <option value={undefined}>Select location</option>
                    {LOCATION_OPTIONS?.length > 0
                      ? LOCATION_OPTIONS.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))
                      : null}
                  </select>
                </>
              )}
              {languageInputVisibility && (
                <>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                    htmlFor="language"
                  >
                    Language
                  </label>
                  <select
                    name="language"
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
                    id="language"
                    onChange={handleChange}
                  >
                    <option value="0">Select your language</option>
                    {language_code?.length > 0
                      ? language_code.map((value, index) => (
                          <option value={value.code} key={index}>
                            {value.name}
                          </option>
                        ))
                      : null}
                  </select>
                </>
              )}
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="privacy"
                >
                  Privacy
                </label>
                <select
                  name="privacy_code"
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
                  id="privacy"
                  onChange={handleChange}
                >
                  <option value="0">Privacy</option>
                  {privacy_code?.length > 0
                    ? privacy_code.map((value, index) => (
                        <option value={value.id} key={index}>
                          {value.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="language"
                >
                  Expiration
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
                  id="language"
                  defaultValue={'Never'}
                  name="expiration"
                  onChange={handleChange}
                >
                  {EXPIRATION_OPTIONS?.length > 0
                    ? EXPIRATION_OPTIONS.map((value, index) => (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tag"
                >
                  Tag
                </label>
                <AsyncMultiSelect
                  handleChange={handleChange}
                  name="tag"
                  id="tag"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-400 ml-4 px-20 py-2 text-white font-semibold rounded w-[91%]"
            >
              Create
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostCreatePage;
