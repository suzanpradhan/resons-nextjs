import CommonPopup from '@/app/(components)/(popups)/CommonPopup';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import coverImageApi from '@/modules/coverImage/coverImageApi';
import { CoverImageDetailType } from '@/modules/coverImage/coverImageType';
import postApi from '@/modules/post/postApi';
import { PostFormType, postValidateFormSchema } from '@/modules/post/postType';
import profileApi from '@/modules/profile/profileApi';
import { ProfileDetailType } from '@/modules/profile/profileType';
import classNames from 'classnames';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ImageSquare,
  Lock,
  MapPin,
  Microphone,
  StopCircle,
  Timer,
  Translate,
  UploadSimple,
  X,
} from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { ZodError } from 'zod';
import AddAudience from './AddAudience';
import AddExpiration from './AddExpiration';
import AddImage from './AddImage';
import AddLanguage from './AddLanguage';
import AddLocation from './AddLocation';
import PlayPauseWithWave from './PlayPauseWithWave';

const FIELD_DETAILS = [
  {
    fieldName: 'Image',
    fieldIcon: <ImageSquare size={24} weight="fill" />,
  },
  {
    fieldName: 'Location',
    fieldIcon: <MapPin size={24} weight="fill" />,
  },
  {
    fieldName: 'Language',
    fieldIcon: <Translate size={24} />,
  },
  {
    fieldName: 'Audience',
    fieldIcon: <Lock size={24} weight="fill" />,
  },
  {
    fieldName: 'Expiration',
    fieldIcon: <Timer size={24} weight="fill" />,
  },
];

const PostToFeed = () => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  // const [audioWaveData, setAudioWaveData] = useState<any>([0, 1, 0.5, -0.3]);
  const recordedAudio = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const waveRef = useRef<any>(null);
  const record = useRef<any>(null);

  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
  const [recordTime, setRecordTime] = useState(0);
  const [isAddPostModalOpen, setAddPostModelOpen] = useState(false);

  const [wavePlayerVisible, toggleWavePlayerVisible] = useState(false);
  const audioRef = useRef<any>(null);
  const [hiddenButton, setHiddenButton] = useState<
    'upload' | 'record' | undefined
  >(undefined);
  const [recording, setRecording] = useState(false);
  const [activeFieldTab, toggleActiveFieldTab] = useState<string>('Image');

  const myProfile = useAppSelector((state: RootState) => {
    return state.baseApi.queries[`getMyProfileData("?load=true")`]
      ?.data as ProfileDetailType;
  });

  const onSubmit = async (data: PostFormType) => {
    try {
      const responseData = await Promise.resolve(
        dispatch(
          postApi.endpoints.addPost.initiate({
            title: data.title,
            privacy_code: data.privacy_code,
            audio_file: data.audio_file,
            file_duration: (data.file_duration as number) / 1000,
            wave_data: data.wave_data,
            is_ai_generated: data.is_ai_generated,
            expiration_datetime: data.expiration_datetime,
            language: data.language,
            cover_image: data.cover_image,
            remember_my_language: data.remember_my_language,
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
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = (values: PostFormType) => {
    try {
      postValidateFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return error.formErrors.fieldErrors;
      }
    }
  };

  // const handleTagsChange = (e: MultiValue<Option>) => {
  //   // setSelectedTagOptions((prevStates) => [
  //   //   ...prevStates,
  //   //   { label: e[e.length - 1].label, value: e[e.length - 1].value },
  //   // ]);
  //   formik.setFieldValue(
  //     'genres',
  //     e.map((genre) => genre.value)
  //   );
  // };

  const startNewRecording = async () => {
    setHiddenButton('upload');
    toggleWavePlayerVisible(true);
    if (audioRef.current) {
      audioRef.current.destroy();
    }
    setIsPlaying(false);
    // setAudioFile(undefined);
    setRecording(true);
    setRecordTime(0);

    const recordInitiate = () => {
      waveRef.current = WaveSurfer.create({
        container: recordedAudio?.current,
        waveColor: 'white',
        progressColor: '#D9362F',
        barWidth: 3,
        height: 80,
        barRadius: 2,
      });

      record.current = waveRef.current.registerPlugin(RecordPlugin.create());
      record.current.startRecording();

      // When we click on stop record button this function would be run.
      record.current.on('record-end', (blob: Blob) => {
        const recordedUrl = URL.createObjectURL(blob);
        audioRef.current = WaveSurfer.create({
          container: recordedAudio.current,
          waveColor: 'white',
          progressColor: '#D9362F',
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
        formik.setFieldValue('file_duration', getAudioDuration * 1000);
        setAudioDuration(recordTime);
        formik.setFieldValue('wave_data', waveRef.current.exportPeaks()[0]);
      });
      waveRef.current.destroy();
    }
    if (record.current) {
      record.current.stopRecording();
      record.current.destroy();
    }
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

  const handleCoverImageIdChange = (coverImageItem: CoverImageDetailType) => {
    console.log(coverImageItem.id);

    formik.setFieldValue('cover_image', coverImageItem);
  };

  const handleAudienceChange = (value: number) => {
    formik.setFieldValue('privacy_code', value);
  };

  const handleExpirationChange = (value: Date | undefined) => {
    formik.setFieldValue('expiration_datetime', value);
  };

  const handleLanguageChange = (value: string) => {
    formik.setFieldValue('language', value);
  };

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) {
  //     const temp = {
  //       id: 0,
  //       file_path: URL.createObjectURL(e.target.files?.[0]),
  //     } as CoverImageDetailType;
  //     formik.setFieldValue('cover_image', temp);
  //     setLocalCoverImage(temp);
  //   }
  // };

  const handleFileChange = (e: any) => {
    // e.preventdefault();

    setHiddenButton('record');
    toggleWavePlayerVisible(true);
    if (audioRef.current != null) {
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
      waveColor: 'white',
      progressColor: '#D9362F',
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
    toggleWavePlayerVisible(false);
    audioRef?.current?.destroy();
    waveRef?.current?.destroy();
    setHiddenButton(undefined);
    setAudioFile(undefined);
    formik.setFieldValue('audio_file', undefined);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.on('ready', () => {
        const getAudioDuration = audioRef.current.getDuration();
        setRecordTime(getAudioDuration * 1000);
        formik.setFieldValue('file_duration', getAudioDuration * 1000);
        setAudioDuration(getAudioDuration * 1000);
        formik.setFieldValue('wave_data', audioRef.current.exportPeaks()[0]);
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

  const formik = useFormik<PostFormType>({
    // enableReinitialize: true,
    initialValues: {
      title: '',
      audio_file: undefined,
      file_duration: 0,
      wave_data: undefined,
      privacy_code: '0',
      expiration_datetime: undefined,
      language: '',
      cover_image: undefined,
      remember_my_language: '0',
      genres: [],
      is_ai_generated: '0',
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  useEffect(() => {
    dispatch(profileApi.endpoints.getMyProfileData.initiate('?load=true'));
    dispatch(coverImageApi.endpoints.getCoverImage.initiate());
  }, [dispatch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className="sm:container md:container lg:container mx-auto h-full pb-12 flex flex-col overflow-y-scroll"
    >
      <div className="px-4 h-12 shadow-sm flex items-center gap-2 my-0">
        <div className="text-base font-normal flex-1">Create a post</div>
        <button type="submit" className="text-red-500 text-base">
          Post
        </button>
      </div>

      <div className="border-b border-grey-300">
        <div
          className={classNames('px-4 py-4 flex-col relative')}
          style={{
            background: formik.values.cover_image
              ? `linear-gradient(rgb(0,0,0,0.2), rgb(0,0,0,0.4), rgb(0,0,0,0.2))`
              : '#1E1F21',
          }}
        >
          {formik.values.cover_image && (
            <Image
              className="-z-10"
              src={formik.values.cover_image.file_path}
              alt="cover image"
              fill
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="flex gap-2 items-center mb-4">
            <div className="relative w-14 h-14">
              <Image
                className="rounded-full"
                src={
                  myProfile?.profile_image && myProfile.profile_image != null
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
              <h3>{myProfile?.name}</h3>
              <p className="text-sm">{myProfile?.country?.name ?? ''}</p>
            </div>
          </div>
          <textarea
            id="title"
            placeholder="Enter title here"
            className={classNames(
              'w-full rounded-md h-20 p-2 border bg-transparent focus:outline-0 text-white',
              formik.errors.title
                ? 'border-red-400'
                : formik.values.cover_image
                ? 'placeholder:text-white border-white'
                : 'border-primaryGray-500 placeholder:text-primaryGray-500',
              formik.values.cover_image
                ? 'placeholder:text-white'
                : 'placeholder:text-primaryGray-500'
            )}
            {...formik.getFieldProps('title')}
          />
          <div
            className={classNames(
              'text-white flex gap-2 px-3 py-2 items-center rounded-md backdrop-blur-sm',
              formik.errors.wave_data != undefined
                ? 'bg-accent/10 border border-red-400'
                : 'bg-white/10',
              wavePlayerVisible && 'h-24'
            )}
          >
            <span className="grow text-white">
              {!wavePlayerVisible && <>Record or Upload Audio</>}
              <PlayPauseWithWave
                audio={recordedAudio}
                audioTime={recordTime}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                wavePlayerVisible={wavePlayerVisible}
                theme={'dark'}
              />
            </span>

            <input
              hidden
              id="audioUpload"
              type="file"
              accept="audio/*"
              onClick={(e) => {
                (e.target as HTMLInputElement).value = '';
              }}
              onChange={(e) => handleFileChange(e)}
            />

            {wavePlayerVisible && !recording ? (
              <>
                <div className="rounded-full bg-white p-2 hover:shadow-md">
                  <X
                    size={18}
                    role="button"
                    type="button"
                    onClick={handleCancelAudio}
                    className="text-accent"
                  />
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={classNames(
                    'rounded-full bg-white/20 p-2 hover:shadow-md',
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

                <label
                  htmlFor="audioUpload"
                  className={classNames(
                    'rounded-full bg-white/20 p-2 hover:shadow-md mb-0 hover:cursor-pointer',
                    hiddenButton === 'upload' ? 'hidden' : 'block'
                  )}
                >
                  {!wavePlayerVisible ? <UploadSimple size={24} /> : <></>}
                </label>
              </>
            )}
          </div>
        </div>
        <CommonPopup
          isModalOpen={isAddPostModalOpen}
          toggleModelOpen={() => setAddPostModelOpen(!isAddPostModalOpen)}
          popupName="Add to your post"
          className="w-full rounded-xl"
        >
          <div className="grid grid-cols-2 px-2 pb-2">
            {FIELD_DETAILS.map((item, index) => (
              <div key={index}>
                <button
                  type="button"
                  className={classNames(
                    'flex gap-2 w-full h-12 items-center px-2 rounded-lg overflow-hidden focus:bg-grey-100',
                    activeFieldTab === item.fieldName
                      ? `text-red-400`
                      : `text-black`
                  )}
                  onClick={() => {
                    toggleActiveFieldTab(item.fieldName);
                    setAddPostModelOpen(false);
                  }}
                >
                  {item.fieldIcon}
                  <div>{item.fieldName}</div>
                </button>
              </div>
            ))}
          </div>
        </CommonPopup>
        <div className="py-4 flex flex-col gap-4 bg-white">
          <div className="flex gap-2 border-[1px] pr-2 rounded-md border-grey-300 bg-grey-100 mx-4">
            <span
              className="h-10 flex px-2 items-center grow text-sm text-dark-400"
              onClick={() => setAddPostModelOpen(true)}
            >
              Add to your post
            </span>
            {FIELD_DETAILS.map((item, index) => (
              <button
                key={index}
                type="button"
                className={
                  activeFieldTab === item.fieldName
                    ? `text-red-400`
                    : `text-black`
                }
                onClick={() => toggleActiveFieldTab(item.fieldName)}
              >
                {item.fieldIcon}
              </button>
            ))}
          </div>
        </div>
      </div>
      {activeFieldTab === 'Image' && (
        <AddImage
          hasError={formik.errors.cover_image != undefined}
          currentCoverImage={formik.values.cover_image}
          handleCoverImageIdChange={handleCoverImageIdChange}
        />
      )}
      {activeFieldTab === 'Location' && <AddLocation />}
      {activeFieldTab === 'Language' && (
        <AddLanguage
          handleLanguageChange={handleLanguageChange}
          languagevalue={formik.values.language}
        />
      )}
      {activeFieldTab === 'Audience' && (
        <AddAudience
          handleAudienceChange={handleAudienceChange}
          privacy_value={formik.values.privacy_code}
        />
      )}
      {activeFieldTab === 'Expiration' && (
        <AddExpiration
          expiration={formik.values.expiration_datetime}
          handleExpirationChange={handleExpirationChange}
        />
      )}
    </form>
  );
};

export default PostToFeed;
