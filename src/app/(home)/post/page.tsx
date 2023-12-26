'use client';

import { language_code, privacy_code } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import AsyncMultiSelect from '@/core/ui/components/AsyncMultiSelect';
import Button from '@/core/ui/components/Button';
import postApi from '@/modules/post/postApi';
import { PostDefaultFormType, postFormSchema } from '@/modules/post/postType';
import profileApi from '@/modules/profile/profileApi';
import { ProfileDetailType } from '@/modules/profile/profileType';
import { default as classNames, default as classnames } from 'classnames';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ImageSquare,
  Microphone,
  StopCircle,
  Translate,
  UploadSimple,
  XCircle,
} from 'phosphor-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MultiValue } from 'react-select';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { ZodError } from 'zod';
import PlayPauseWithWave from './(components)/PlayPauseWithWave';

interface Option {
  value: string;
  label: string;
}

const coverImages = [
  { id: 1, source: '/images/avatar.jpg' },
  { id: 2, source: '/images/cover.webp' },
  { id: 3, source: '/images/cover.webp' },
  { id: 4, source: '/images/avatar.jpg' },
  { id: 5, source: '/images/cover.webp' },
  { id: 6, source: '/images/avatar.jpg' },
  { id: 7, source: '/images/cover.webp' },
  { id: 8, source: '/images/avatar.jpg' },
];

const EXPIRATION_OPTIONS = ['Never', 'Day', 'Week', 'Month', 'Year'];
const LOCATION_OPTIONS = [
  'Asia',
  'Africa',
  'Europe',
  'N. America',
  'S. America',
  'Antartica',
];

const PostCreatePage = () => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [imagesVisibility, toggleImagesVisibility] = useState(false);
  const [locationInputVisibility, toggleLocationInputVisibility] =
    useState(false);
  const [languageInputVisibility, toggleLanguageInputVisibility] =
    useState(false);
  const [selectedTagOptions, setSelectedTagOptions] = useState<
    MultiValue<Option>
  >([]);
  const [imageFile, setImageFile] = useState<string | undefined>(undefined);

  //recorded audio datas
  const [hiddenButton, setHiddenButton] = useState<
    'upload' | 'record' | undefined
  >(undefined);
  const [wavePlayerVisible, toggleWavePlayerVisible] = useState(false);
  const recordedAudio = useRef<any>(null);
  const [recordTime, setRecordTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<any>(null);
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
  const [recording, setRecording] = useState(false);
  const waveRef = useRef<any>(null);
  const record = useRef<any>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioWaveData, setAudioWaveData] = useState<any>([0, 1, 0.5, -0.3]);

  const onSubmit = async (data: PostDefaultFormType) => {
    console.log(data);

    // setIsLoading(true);
    try {
      const responseData = await Promise.resolve(
        dispatch(
          postApi.endpoints.addPost.initiate({
            title: data.title,
            privacy_code: data.privacy_code,
            audio_file: data.audio_file,
            file_duration: data.file_duration,
            wave_data: audioWaveData,
            is_ai_generated: data.is_ai_generated,
            expiration_type: data.expiration_type,
            language: data.language,
            cover_image: data.cover_image!,
            remember_my_language: data.remember_my_language,
            color_code: data.color_code,
            genres: data.genres,
          })
        )
      );
      if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
        await dispatch(
          postApi.endpoints.getPostList.initiate(0, { forceRefetch: true })
        );
        navigate.push('/');
      }
      // setIsLoading(false);

      // setSelectedValue('');
      // setTitle('');
      // setSelectedOptions([]);
      // setSelectedLabels([]);
      // setDescription('');
      // setAudioFile(undefined);
      // navigate.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const myProfile = useAppSelector((state: RootState) => {
    return state.baseApi.queries[`getMyProfileData("?load=true")`]
      ?.data as ProfileDetailType;
  });

  // const coverImages = useAppSelector((state: RootState) => {
  //   return state.baseApi.queries['getCoverImage']?.data as any;
  // });

  const validateForm = (values: PostDefaultFormType) => {
    try {
      postFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);

        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<PostDefaultFormType>({
    enableReinitialize: true,
    initialValues: {
      title: '',
      audio_file: undefined,
      file_duration: 0,
      wave_data: '',
      privacy_code: '',
      expiration_type: '',
      language: '',
      cover_image_id: undefined,
      cover_image: undefined,
      color_code: '#000000',
      remember_my_language: '0',
      genres: [],
      is_ai_generated: '0',
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  // const handleChange = (event: any) => {
  //   if (event.target) {
  //     formik.setFieldValue(event.target.name, event.target.value);
  //   } else {
  //     formik.setFieldValue('tags', event.value);
  //     console.log(formik.values.tags);
  //   }
  // };

  const handleTagsChange = (e: MultiValue<Option>) => {
    // setSelectedTagOptions((prevStates) => [
    //   ...prevStates,
    //   { label: e[e.length - 1].label, value: e[e.length - 1].value },
    // ]);
    formik.setFieldValue(
      'genres',
      e.map((genre) => genre.value)
    );
  };

  const startNewRecording = async () => {
    setHiddenButton('upload');
    toggleWavePlayerVisible(true);
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
        setAudioDuration(recordTime);
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
      const getRemainaingTime = recordTime - currentTime * 1000;
      setRecordTime(getRemainaingTime);
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

  useEffect(() => {
    dispatch(profileApi.endpoints.getMyProfileData.initiate('?load=true'));
    // dispatch(coverImageApi.endpoints.getCoverImage.initiate());
  }, [dispatch]);

  const handleFileChange = (e: any) => {
    // e.preventdefault();
    console.log(audioRef);
    setHiddenButton('record');
    toggleWavePlayerVisible(true);
    if (audioRef.current != null) {
      console.log(audioRef);
      audioRef.current.destroy();
      audioRef.current = null;
    }

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

    setAudioFile(file);
    formik.setFieldValue('audio_file', file);

    // setIsNextUploadVisible(true);
    // setShouldNext(true);
  };

  const handleCancelAudio = () => {
    console.log(audioRef);
    toggleWavePlayerVisible(false);
    audioRef.current.destroy();
    setHiddenButton(undefined);
    setAudioFile(undefined);
    console.log(audioRef);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.[0] &&
      setImageFile(URL.createObjectURL(e.target.files?.[0]));
    formik.setFieldValue(e.target.name, e.target.files?.[0]);
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

  // formik.values.cover_image && console.log(formik.values.cover_image);

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
              formik.handleSubmit(e);
            }}
          >
            <div
              className={classNames(
                'px-5 py-4 flex-col relative',
                imageFile ? 'bg-transparent' : 'bg-black'
              )}
            >
              {imageFile && (
                <Image
                  className="rounded -z-10"
                  src={imageFile}
                  alt="cover image"
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className="flex gap-3 items-center">
                <div className="relative w-16 h-16 ">
                  <Image
                    className="rounded-full"
                    src={
                      myProfile?.profile_image &&
                      myProfile.profile_image != null
                        ? myProfile.profile_image
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
                  <p className="text-sm">
                    {myProfile?.country?.name ?? ''}Afganistan
                  </p>
                </div>
              </div>
              <input
                type="text"
                // name="title"
                id="title"
                placeholder="Enter title here"
                className="-ml-2 bg-transparent !border-0 placeholder:text-slate-400 !focus:border-0 focus:outline-0 text-white"
                // onChange={handleChange}
                {...formik.getFieldProps('title')}
              />
              {!!formik.errors.title && (
                <div className="text-red-500 text-sm -mt-2">
                  {formik.errors.title}
                </div>
              )}
              <div
                className={classNames(
                  'text-white flex gap-2 px-3 py-2 items-center rounded-md bg-[#414141] ',
                  wavePlayerVisible && 'h-24'
                )}
              >
                <span className="grow text-slate-400">
                  {!wavePlayerVisible && <>Record or Upload Audio</>}
                  <PlayPauseWithWave
                    audio={recordedAudio}
                    audioTime={recordTime}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    audioRef={audioRef}
                    wavePlayerVisible={wavePlayerVisible}
                    theme="light"
                  />
                </span>
                <button
                  type="button"
                  className={classNames(
                    'rounded-full bg-[#535353] p-2',
                    hiddenButton === 'record' ? 'hidden' : 'block'
                  )}
                  onClick={recording ? stopTheRecording : startNewRecording}
                >
                  {recording ? (
                    <StopCircle size={24} />
                  ) : (
                    <Microphone size={24} />
                  )}
                </button>

                <div
                  className={classNames(
                    'rounded-full bg-[#535353] p-2 mb-0',
                    hiddenButton === 'upload' ? 'hidden' : 'block'
                  )}
                >
                  {!wavePlayerVisible ? (
                    <label htmlFor="audioUpload">
                      <UploadSimple height={20} width={24} />
                    </label>
                  ) : (
                    <XCircle
                      size={24}
                      role="button"
                      onClick={handleCancelAudio}
                    />
                  )}
                </div>
                <input
                  hidden
                  id="audioUpload"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </div>
            {/* <PostCard /> */}
            <div className="mx-4 pt-3 flex flex-col gap-4 ">
              <div className="flex gap-2 border-[1px] px-2 rounded-md border-[#b3adad]">
                <span className=" h-10 flex items-center grow">
                  Add to your post
                </span>
                <button
                  type="button"
                  className={imagesVisibility ? `text-red-400` : `text-black`}
                  onClick={() =>
                    toggleImagesVisibility((prevState) => !prevState)
                  }
                >
                  <ImageSquare size={28} weight="fill" className="-mb-[1px]" />
                </button>
                {/* <button
                  type="button"
                  className={
                    locationInputVisibility ? `text-red-400` : `text-black`
                  }
                  onClick={() =>
                    toggleLocationInputVisibility((prevState) => !prevState)
                  }
                >
                  <MapPin size={24} weight="fill" />
                </button> */}
                <button
                  type="button"
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
                <div>
                  <div className="grid grid-cols-2 gap-2 w-80 h-64 overflow-y-scroll">
                    {coverImages?.map((item) => (
                      <div
                        key={item.id}
                        className={classNames(
                          'w-full h-20 relative',
                          formik.values.cover_image_id === item.id.toString() &&
                            'border-2 border-red-400'
                        )}
                      >
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
                          // name="cover_image_id"
                          // value={item.id}
                          // onChange={handleChange}
                          {...formik.getFieldProps('cover_image_id')}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-4">
                    <label
                      htmlFor="coverImageInput"
                      className="text-gray-700 text-sm font-bold flex"
                    >
                      <Image
                        className="mr-2"
                        width={20}
                        height={20}
                        src="/images/search.png"
                        alt="Search Icon"
                      />
                      Choose From your gallery
                    </label>
                    <input
                      id="coverImageInput"
                      type="file"
                      accept="image/*" // Specify the file types you want to allow (e.g., images)
                      style={{ display: 'none' }}
                      name="cover_image"
                      onChange={handleImageChange}
                      // {...formik.getFieldProps('cover_image')} // Hide the input element
                    />
                  </div>
                </div>
              )}
              {/* {locationInputVisibility && (
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
                    <option>Select location</option>
                    {LOCATION_OPTIONS?.length > 0
                      ? LOCATION_OPTIONS.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))
                      : null}
                  </select>
                </>
              )} */}
              {languageInputVisibility && (
                <>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                    htmlFor="language"
                  >
                    Language
                  </label>
                  <select
                    // name="language"
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
                    id="language"
                    // onChange={handleChange}
                    {...formik.getFieldProps('language')}
                  >
                    <option>Select your language</option>
                    {language_code?.length > 0
                      ? language_code.map((value, index) => (
                          <option value={value.code} key={index}>
                            {value.name}
                          </option>
                        ))
                      : null}
                  </select>
                  {!!formik.errors.language && (
                    <div className="text-red-500 text-sm -mt-2">
                      {formik.errors.language}
                    </div>
                  )}
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
                  // name="privacy_code"
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
                  id="privacy_code"
                  // onChange={handleChange}
                  {...formik.getFieldProps('privacy_code')}
                >
                  <option>Select Privacy</option>
                  {privacy_code?.length > 0
                    ? privacy_code.map((value, index) => (
                        <option value={value.id} key={index}>
                          {value.name}
                        </option>
                      ))
                    : null}
                </select>
                {!!formik.errors.privacy_code && (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.privacy_code}
                  </div>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="expiration_type"
                >
                  Expiration
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
                  id="expiration_type"
                  {...formik.getFieldProps('expiration_type')}
                >
                  <option>Select Expiration Type</option>
                  {EXPIRATION_OPTIONS?.length > 0 &&
                    EXPIRATION_OPTIONS.map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                </select>
                {!!formik.errors.expiration_type && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.expiration_type}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tag"
                >
                  Tag
                </label>
                <AsyncMultiSelect
                  handleTagsChange={handleTagsChange}
                  name="tag"
                  id="tag"
                  selectedTagOptions={selectedTagOptions}
                  setSelectedTagOptions={setSelectedTagOptions}
                />
              </div>
            </div>
            <div className="mx-4">
              <Button text="Create" type="submit" className="hover:shadow-lg" />
            </div>

            {/* <button
              type="submit"
              className="bg-red-400 ml-4 px-20 py-2 text-white font-semibold rounded w-[91%]"
            >
              Create
            </button> */}
          </form>
        )}
      </div>
    </div>
  );
};

export default PostCreatePage;
