import { useState } from 'react';
import PostAStory from '../PostAStory';
import PostToFeed from '../PostToFeed';

interface PostCreateProps {
  audioFile: File | undefined,
  audioDuration: Number,
  audioWaveData: number[],
  toggleNextPageVisibility: (visible: boolean) => void;
}

function NextPageComponent(props: PostCreateProps) {
  const { audioFile, audioDuration, audioWaveData, toggleNextPageVisibility } = props;

  // Set 'activeTab' to 'postToFeed' by default
  const [activeTab, setActiveTab] = useState('postToFeed');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const handleBackFromNextPage = () => {
    toggleNextPageVisibility(false);
    // console.log('')
  }
  return (
    <div className="bg-white">

      <div className="px-6 py-4 h-full relative" style={{ height: '120vh' }}>
        <div className="mb-4">

          <div className={`px-5 w-1/2 rounded-md bg-red-400 md:w-auto cursor-pointer`} onClick={() => handleBackFromNextPage()}>
            <button className="w-full text-white font-semibold py-2 px-4 rounded-tl-sm rounded-bl-sm transition duration-300 ease-in-out transform hover:scale-105">
              Back
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="mt-[-5px] flex justify-between items-center">
            {/* When 'activeTab' is 'postToFeed', highlight "Post to feed" button */}
            <div className={`px-5 w-1/2 rounded-md md:w-auto cursor-pointer ${activeTab === 'postToFeed' ? 'bg-red-500' : 'bg-gray-300'}`} onClick={() => handleTabClick('postToFeed')}>
              <button className="w-full text-white font-semibold py-2 px-4 rounded-tl-sm rounded-bl-sm transition duration-300 ease-in-out transform hover:scale-105">
                Post to feed
              </button>
            </div>
            {/* When 'activeTab' is 'postAStory', highlight "Post a story" button */}
            <div className={`px-5 w-1/2 ml-2 rounded-md md:w-auto cursor-pointer ${activeTab === 'postAStory' ? 'bg-red-500' : 'bg-gray-300'}`} onClick={() => handleTabClick('postAStory')}>
              <button className="w-full text-white font-semibold py-2 px-4 rounded-tr-sm rounded-br-sm transition duration-300 ease-in-out transform hover:scale-105">
                Post a story
              </button>
            </div>
          </div>
        </div>
        {/* Conditionally render the components based on the activeTab */}
        {activeTab === 'postAStory' ? <PostAStory audioFile={props.audioFile} audioDuration={props.audioDuration} audioWaveData={props.audioWaveData} /> : null}
        {activeTab === 'postToFeed' ? <PostToFeed audioFile={props.audioFile} audioDuration={props.audioDuration} audioWaveData={props.audioWaveData} /> : null}
      </div>
    </div>
  );
}

export default NextPageComponent;
