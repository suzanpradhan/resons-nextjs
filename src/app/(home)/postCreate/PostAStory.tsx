import { privacy_code } from '@/core/constants/appConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import CustomPopup from '@/core/ui/components/CustomPopup';
import storyApi from '@/modules/story/storyApi';
import { useState } from 'react';

interface StoryCreateProps {
  audioFile: File | undefined;
  audioDuration: Number;
  audioWaveData: number[];
}

function PostAStory(props: StoryCreateProps) {
  const dispatch = useAppDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPrivacyValue, setSelectedPrivacyValue] = useState('0');
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleChangeAiVoice = () => {
    openPopup();
  };

  const handlePrivacyValueChange = (event: any) => {
    setSelectedPrivacyValue(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await Promise.resolve(
        dispatch(
          storyApi.endpoints.addStory.initiate({
            title: 'This is story title',
            privacy_code: selectedPrivacyValue,
            audio_file: props.audioFile!,
            file_duration: props.audioDuration as number,
            wave_data: props.audioWaveData,
            is_ai_generated: '0',
            description: 'This is description',
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
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
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="privacy"
        >
          Privacy
        </label>
        <select
          className="rounded-sm block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="flex items-center justify-center">
          <button
            type="submit"
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

export default PostAStory;
