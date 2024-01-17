import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';

interface PostStoryTabType {
  setActiveTab: Dispatch<SetStateAction<'Post' | 'Story'>>;
  activeTab: 'Post' | 'Story';
}

const PostStoryTab = ({ setActiveTab, activeTab }: PostStoryTabType) => {
  return (
    <div className="absolute bottom-4 w-full flex justify-center z-50">
      <span className="flex bg-black rounded-full text-base max-[356px]:text-sm">
        <button
          type="button"
          onClick={() => setActiveTab('Post')}
          className={classNames(
            'pl-5  py-2 pr-2',
            activeTab === 'Post' ? 'text-white' : 'text-gray-600'
          )}
        >
          Post
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('Story')}
          className={classNames(
            'pr-5 py-2 pl-2',
            activeTab === 'Story' ? 'text-white' : 'text-gray-600'
          )}
        >
          Story
        </button>
      </span>
    </div>
  );
};

export default PostStoryTab;
