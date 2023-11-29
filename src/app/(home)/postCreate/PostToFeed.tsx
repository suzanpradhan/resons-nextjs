import { language_code, privacy_code } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import CustomPopup from '@/core/ui/components/CustomPopup';
import coverImageApi from '@/modules/coverImage/coverImageApi';
import { CoverImageDetailType } from '@/modules/coverImage/coverImageType';
import postApi from '@/modules/post/postApi';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MultiValue } from 'react-select';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import AsyncMultiSelect from '@/core/ui/components/AsyncMultiSelect';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

interface PostCreateProps {
  audioFile: File | undefined;
  audioDuration: Number;
  audioWaveData: number[];
}

function PostToFeed(props: PostCreateProps) {
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const selectRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState<(File | undefined)[]>(
    []
  );
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
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files ? e.target.files[0] : undefined;
    if (selectFile) {
      //   const file = URL.createObjectURL(e.target.files[0]);
      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        selectFile,
      ]);
      console.log('Selected File:', selectedImages);
    }
  };

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

  const getCoverImageList = getCoverImageListRaw?.map((item) => ({
    id: item.id,
    filePath: item.file_path,
    colorCode: item.color_code,
  }));

  const handleImageClick = (imageId: any) => {
    setSelectedImageId(imageId);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handlePrivacyValueChange = (event: any) => {
    setSelectedPrivacyValue(event.target.value);
  };

  const handleLanguageValueChange = (event: any) => {
    setSelectedLanguageValue(event.target.value);
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

  const handleSubmit = async (event: any) => {
    console.log('here');
    //setIsLoading(true);
    event.preventDefault();
    console.log(selectedTagOptions);
    try {
      await Promise.resolve(
        dispatch(
          postApi.endpoints.addPost.initiate({
            title: title,
            privacy_code: selectedPrivacyValue,
            audio_file: props?.audioFile!,
            file_duration: props.audioDuration as number,
            wave_data: props.audioWaveData,
            is_ai_generated: '0',
            expiration_type: selectedExpirationValue,
            language: selectedLanguageValue,
            cover_image: selectedImages[0],
            remember_my_language: rememberMyLanguage,
            color_code: '#0000',
            tags: selectedTagOptions.map((tag) => tag.value),
          })
        )
      );
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
    //     setIsLoading(false);
    // }
  };

  return (
    <div>
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
          onChange={handleTitleChange}
          placeholder="Maximum 45 characters"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="tag"
        >
          Tag
        </label>
        <AsyncMultiSelect setSelectedTagOptions={setSelectedTagOptions} />
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
          onChange={handleLanguageValueChange}
        >
          <option value="0">Select Language</option>
          {language_code?.length > 0
            ? language_code.map((value, index) => (
                <option value={value.code} key={index}>
                  {value.name}
                </option>
              ))
            : null}
        </select>
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
          {selectedImages &&
            selectedImages.map((image, index) => (
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
            ))}
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
            accept="image/*" // Specify the file types you want to allow (e.g., images)
            onChange={handleFileSelect}
            style={{ display: 'none' }} // Hide the input element
            ref={fileInputRef}
          />
        </div>
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
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-red-500 w-1/2 text-white text-base px-4 py-2 rounded-sm"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostToFeed;
