'use client';

import { apiPaths } from '@/core/api/apiConstants';
import { defaultWaveData } from '@/core/constants/appConstants';
import { RootState } from '@/core/redux/store';
import { StorySingleDataType } from '@/modules/story/storyType';
import { ConnectedProps, connect } from 'react-redux';
import StoryWavePlayer from './StoryWavePlayer';

interface StoryType {
  story: StorySingleDataType;
}

const StoryCard = ({ ...props }: StoryType) => {
  return (
    <>
      <StoryWavePlayer
        audioItem={{
          url: props.story?.audio
            ? apiPaths.baseUrl +
              '/socialnetwork/stream/story/audio/' +
              props.story?.audio.id
            : '', // Check if props.post.audio exists
          duration: parseFloat(props.story?.audio?.file_duration || '0'), // Use optional chaining and provide a default value
          info: {
            title: props.story?.title ?? props.story?.title,
            description: props?.story?.owner_name ?? '',
            id: props.story.story_id,
          },
        }}
        theme="dark"
        audioWaveData={
          props.story?.audio?.wave_data ?? JSON.stringify(defaultWaveData)
        }
        size="large"
        profileImage={props?.story?.profile_image}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isPlaying: state.nowPlaying.isPlaying,
    playlist: state.nowPlaying.playlist,
    currentPlaylistIndex: state.nowPlaying.currentPlaylistIndex,
    currentPage: state.homepage.currentPage,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(StoryCard);
