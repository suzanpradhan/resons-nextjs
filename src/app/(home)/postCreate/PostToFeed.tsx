'use client';

import { language_code, privacy_code } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import CustomPopup from '@/core/ui/components/CustomPopup';
import coverImageApi from '@/modules/coverImage/coverImageApi';
import { CoverImageDetailType } from '@/modules/coverImage/coverImageType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MultiValue } from 'react-select';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import Button from '@/core/ui/components/Button';
import { PostFormType, postFormSchema } from '@/modules/post/postType';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper } from 'swiper/react';
import { ZodError } from 'zod';

interface PostCreateProps {
  audioFile: File | undefined;
  audioDuration: Number;
  audioWaveData: number[];
}

function PostToFeed(props: PostCreateProps) {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const selectRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState<(File | undefined)[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedTagOptions, setSelectedTagOptions] = useState<
    MultiValue<Option>
  >([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedPrivacyValue, setSelectedPrivacyValue] = useState('0');
  const [selectedLanguageValue, setSelectedLanguageValue] = useState('');
  const [selectedExpirationValue, setSelectedExpirationValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [rememberMyLanguage, setRememberMyLanguage] = useState('');
  // const { audioFile, audioDuration, audioWaveData } = router.query;

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleChangeAiVoice = () => {
    openPopup();
  };

  // Function to handle file selection

  interface Option {
    value: string;
    label: string;
  }

  useEffect(() => {
    dispatch(coverImageApi.endpoints.getCoverImage.initiate());
  }, [dispatch]);

  const getCoverImageListRaw = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCoverImage`]?.data as CoverImageDetailType[]
  );

  const handleImageClick = (imageId: any) => {
    setSelectedImageId(imageId);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleLanguageValueChange = (event: any) => {
    // setSelectedLanguageValue(event.target.value);
    // formik.setFieldValue('language', event.target.value);
  };

  const handleExpirationValueChange = (event: any) => {
    setSelectedExpirationValue(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setRememberMyLanguage('1');
    } else {
      setRememberMyLanguage('0');
    }
  };

  // const handleSubmit = async (event: any) => {
  //   //setIsLoading(true);
  //   event.preventDefault();
  //   try {
  //     await Promise.resolve(
  //       dispatch(
  //         postApi.endpoints.addPost.initiate({
  //           title: title,
  //           privacy_code: selectedPrivacyValue,
  //           audio_file: props?.audioFile!,
  //           file_duration: (props.audioDuration as number) / 1000,
  //           wave_data: props.audioWaveData,
  //           is_ai_generated: '0',
  //           expiration_type: selectedExpirationValue,
  //           language: selectedLanguageValue,
  //           cover_image: selectedImages[0],
  //           remember_my_language: rememberMyLanguage,
  //           color_code: '#0000',
  //           tags: selectedTagOptions.map((tag) => tag.value),
  //         })
  //       )
  //     );
  //     // setSelectedValue('');
  //     // setTitle('');
  //     // setSelectedOptions([]);
  //     // setSelectedLabels([]);
  //     // setDescription('');
  //     // setAudioFile(undefined);
  //     // navigate.push('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   //     setIsLoading(false);
  //   // }
  // };

  // const onSubmit = async (data: PostDefaultFormType) => {
  //   setIsLoading(true);
  //   try {
  //     const responseData = await Promise.resolve(
  //       dispatch(
  //         postApi.endpoints.addPost.initiate({
  //           title: data.title,
  //           privacy_code: data.privacy_code,
  //           audio_file: data.audio_file,
  //           file_duration: data.file_duration,
  //           wave_data: props.audioWaveData,
  //           is_ai_generated: data.is_ai_generated,
  //           expiration_type: data.expiration_type,
  //           language: data.language,
  //           cover_image: data.cover_image!,
  //           remember_my_language: data.remember_my_language,
  //           color_code: data.color_code,
  //           tags: selectedTagOptions.map((tag) => tag.value),
  //         })
  //       )
  //     );
  //     if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
  //       await dispatch(
  //         postApi.endpoints.getPostList.initiate(0, { forceRefetch: true })
  //       );
  //       navigate.push('/');
  //     }
  //     setIsLoading(false);

  //     // setSelectedValue('');
  //     // setTitle('');
  //     // setSelectedOptions([]);
  //     // setSelectedLabels([]);
  //     // setDescription('');
  //     // setAudioFile(undefined);
  //     // navigate.push('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const validateForm = (values: PostFormType) => {
    try {
      postFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('error');

        return error.formErrors.fieldErrors;
      }
    }
  };

  // const formik = useFormik<PostDefaultFormType>({
  //   enableReinitialize: true,
  //   initialValues: {
  //     title: '',
  //     audio_file: props.audioFile!,
  //     file_duration: (props.audioDuration as number) / 1000,
  //     wave_data: props.audioWaveData,
  //     privacy_code: '1',
  //     expiration_type: 'Never',
  //     language: '',
  //     cover_image_id: undefined,
  //     cover_image: undefined,
  //     color_code: '#000000',
  //     remember_my_language: '0',
  //     tags: [],
  //     is_ai_generated: '0',
  //   },
  //   validateOnChange: false,
  //   validate: validateForm,
  //   onSubmit,
  // });

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files ? e.target.files[0] : undefined;
    if (selectFile) {
      //   const file = URL.createObjectURL(e.target.files[0]);
      setSelectedImages((prevSelectedImages) => [
        // ...prevSelectedImages,
        selectFile,
      ]);
      // formik.setFieldValue('cover_image', selectFile);
    }
  };

  const handlePrivacyValueChange = (event: any) => {
    setSelectedPrivacyValue(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // formik.handleSubmit(event);
      }}
    >
      <CustomPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        message="Unfortunately, all AI engines are busy. Please try again later."
      />
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          // onChange={handleTitleChange}
          placeholder="Maximum 45 characters"
          // {...formik.getFieldProps('title')}
        />
        {/* {!!formik.errors.title && (
          <div className="text-red-500 text-sm mt-2">{formik.errors.title}</div>
        )} */}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="tag"
        >
          Tag
        </label>
        {/* <AsyncMultiSelect
          setSelectedTagOptions={setSelectedTagOptions}
          id="tags"
          name="tags"
        /> */}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="language"
        >
          Language
        </label>
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
          id="language"
          name="language"
          onChange={handleLanguageValueChange}
        >
          <option value="">Select Language</option>
          {language_code?.length > 0
            ? language_code.map((value, index) => (
                <option value={value.code} key={index}>
                  {value.name}
                </option>
              ))
            : null}
        </select>
        {/* {!!formik.errors.language && (
          <div className="text-red-500 text-sm mt-2">
            {formik.errors.language}
          </div>
        )} */}
      </div>
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">
                </label> */}
        <input
          className="mr-3"
          id="tag"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Remember my language
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="privacy"
        >
          Privacy
        </label>
        <select
          className=" rounded-sm block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
          id="privacy"
          onChange={handlePrivacyValueChange}
        >
          {/* Add your dropdown options here */}
          <option>Select Privacy</option>
          {privacy_code?.length > 0
            ? privacy_code.map((value) => {
                return (
                  <option value={value.id} key={value.id}>
                    {value.name}
                  </option>
                );
              })
            : null}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="tag"
        >
          Cover Image
        </label>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          navigation
          autoplay={{ delay: 3000 }}
        >
          {/* {formik.values.cover_image &&
            [formik.values.cover_image].map((image, index) => (
              <SwiperSlide key={index}>
                {image && (
                  <div className="relative w-32 h-20">
                    <Image
                      onClick={() => handleImageClick(index)}
                      // className={`image-button ${
                      //   selectedImageId === image.id ? 'selected' : ''
                      // } cover-image-size`}
                      fill
                      objectFit="cover"
                      src={URL.createObjectURL(image)}
                      sizes="(max-width: 168px) 100vw, (max-width: 1200px) 50vw"
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))} */}
          {/* {getCoverImageList?.length > 0
            ? getCoverImageList.map((image, index) => (
                <SwiperSlide key={image.id}>
                  <Image
                    onClick={() => handleImageClick(image.id)}
                    className={`image-button ${
                      selectedImageId === image.id ? 'selected' : ''
                    } cover-image-size`}
                    src={image.filePath}
                    width={100}
                    height={100}
                    alt={`Image ${index + 1}`}
                  />
                </SwiperSlide>
              ))
            : null} */}
        </Swiper>

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
            name="cover_image"
            accept="image/*" // Specify the file types you want to allow (e.g., images)
            onChange={handleFileSelect}
            style={{ display: 'none' }} // Hide the input element
            ref={fileInputRef}
          />
        </div>
        {/* {!!formik.errors.cover_image && (
          <div className="text-red-500 text-sm mt-2">
            {formik.errors.cover_image}
          </div>
        )} */}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="aiVoice"
        >
          AI Voice
        </label>
        <select
          onChange={handleChangeAiVoice}
          className="rounded-sm block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
          id="aiVoice"
        >
          {/* Add your dropdown options here */}
          <option>Select AI Voice</option>
          <option value="0">AI Engine</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="expiration"
        >
          Expiration
        </label>
        <select
          className="rounded-sm block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
          id="expiration"
          onChange={handleExpirationValueChange}
        >
          <option value="" disabled>
            Select Expiration
          </option>
          <option value="Never">Never</option>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
          <option value="Year">Year</option>
        </select>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-center">
          <Button
            text="Post"
            className="w-fit"
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </div>
    </form>
  );
}

export default PostToFeed;
