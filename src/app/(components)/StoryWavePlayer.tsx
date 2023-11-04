import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { formatTime } from '@/core/utils/helpers';
import { NowPlayingAudioItem } from '@/modules/nowPlaying/nowPlayingAudioType';
import {
  manualUpdateCurrentTime,
  playSong,
  updateCurrentTime,
  updateIsPlaying,
} from '@/modules/nowPlaying/nowPlayingReducer';
import Image from "next/image";
import { Pause, Play } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import WaveSurfer from 'sz-wavesurfer';

interface WavePlayerV2Props extends PropsFromRedux {
  audioItem: NowPlayingAudioItem;
  onPlay?: () => void;
  audioWaveData?: string;
  controls?: boolean;
  theme?: 'dark' | 'white';
  size?: 'small' | 'large';
  profileImage: string;
}

const StoryWavePlayer = ({
  audioItem,
  onPlay,
  audioWaveData,
  theme = 'white',
  controls = true,
  size,
  currentTime,
  currentPlaylistIndex,
  playlist,
  isPlaying,
  profileImage,
}: WavePlayerV2Props) => {

  const dispatch = useAppDispatch();
  const audioContainer = useRef(null);
  const audioRef = useRef<WaveSurfer | undefined>(undefined);
  const [playingStory, setPlayingStory] = useState<number | null>(null);
  const [waveLoaded, setWaveLoaded] = useState(false);
  const [sessionPlayed, setSessionPlayed] = useState(false);
  var audioId = audioItem.info?.cid ? audioItem.info!.cid : audioItem.info?.id;

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (playlist[currentPlaylistIndex]?.url != audioItem.url) {
      return;
    }
    if (audioItem.duration != 0 && currentTime != 0) {
      audioRef.current?.manualRenderProgress(currentTime / audioItem.duration);
    }
  }, [currentTime, playlist[currentPlaylistIndex]?.url, audioItem.url]);

  function getWaveColor(id: number | undefined) {
    var sessionValue = sessionStorage.getItem('plays');

    var color = '#de5b6d';
    if (!sessionValue) return color;
    if (!id) return color;
    if ((JSON.parse(sessionValue as string) as number[]).includes(id!)) {
      setSessionPlayed(true);
      return '#FFA4FF';
    } else {
      return color;
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const create = async () => {
      if (audioRef.current) {
        audioRef.current.destroy();
        audioRef.current = undefined;
      }
      if (!audioContainer.current) return;

      var waveColor = (audioRef.current = WaveSurfer.create({
        container: audioContainer.current,
        waveColor: theme == 'dark' ? '#000000' : '#343543',
        progressColor: getWaveColor(audioId),
        cursorColor: 'transparent',
        barWidth: 1,
        barGap: 3,
        barRadius: 2,
        duration: audioItem.duration ? audioItem.duration : 0,
        peaks: JSON.parse(audioWaveData!),
        height: size == 'small' ? 15 : 60,
      }));

      audioRef.current.load(audioItem?.url);

      audioRef.current.on('drag', function (progress: any) {

        var currentTime = progress * audioItem.duration;
        dispatch(
          manualUpdateCurrentTime({
            currentTime: currentTime,
            url: audioItem.url,
          })
        );
      });


      audioRef.current.on('click', function (progress: any) {
        audioRef.current?.manualRenderProgress(progress);
        var currentTime = progress * audioItem.duration;
        dispatch(
          manualUpdateCurrentTime({
            currentTime: currentTime,
            url: audioItem.url,
          })
        );
      });

      audioRef.current.on('ready', async function () {
        if (!waveLoaded) {
          setWaveLoaded(true);
        }
      });

      return () => {
        audioRef.current?.destroy();
      };
    };
    create();
  }, [audioId, audioItem.duration, audioItem.url, audioWaveData, dispatch, size, theme, waveLoaded]);

  const handlePlayPause = async (e: any) => {
    console.log("audioItem", audioItem);
    e?.stopPropagation();
    if (playlist[currentPlaylistIndex]?.url == audioItem.url) {
      if (isPlaying) {
        setPlayingStory(null);
        dispatch(updateIsPlaying(false));
      } else {
        setPlayingStory(audioItem?.info?.id!);
        dispatch(updateIsPlaying(true));
      }
    } else {
      setPlayingStory(audioItem?.info?.id!);
      dispatch(playSong(audioItem));
    }
  };

  return (

    <div className={`relative flex items-center w-full max-w-3xl last:rounded-b-none rounded-lg py-1 mt-1 flex-wrap flex-col`}>
      <span className='text-[10px] text-gray-700 font-medium flex justify-start w-full px-2'>{audioItem?.info?.description?.split(" ")?.[0]}</span>
      <div className="h-max border-solid border-0 border-white rounded-full p-1 flex items-center w-full">
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          <Image alt="profile-image" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" className="w-10 h-10 object-cover" src={profileImage ? profileImage : '/images/avatar.jpg'}></Image>
        </div>
        {controls ? (
          <button
            type="button"
            className={`ml-2 mr-2 w-8 h-8 inline-flex items-center justify-center rounded-full overflow-hidden cursor-pointer bg-white`}
            onClick={handlePlayPause}
          >
            {playlist[currentPlaylistIndex]?.url == audioItem.url &&
              isPlaying ? (
              <Pause
                size={20}
                className={`${sessionPlayed
                  ? 'text-purple'
                  : theme == 'dark'
                    ? 'text-accent'
                    : 'text-white'
                  }`}
                weight="fill"
              />
            ) : (
              <Play
                size={20}
                className={`${sessionPlayed
                  ? 'text-purple'
                  : theme == 'dark'
                    ? 'text-accent'
                    : 'text-white'
                  }`}
                weight="fill"
              />
            )}
          </button>
        ) : (
          <></>
        )}
        <div
          ref={audioContainer}
          className={`w-full flex-1 audio-wrapper ${playlist[currentPlaylistIndex]?.url == audioItem.url
            ? ''
            : 'pointer-events-none'
            }`}
          onClick={(e) => {
            e?.stopPropagation();
          }}
        ></div>
        <div className="bg-primary-900 text-white text-xs w-11 text-center py-1 ml-1 rounded-sm">
          {audioItem.duration
            ? formatTime(
              audioItem.duration
                ? audioItem.duration -
                (playlist[currentPlaylistIndex]?.url == audioItem.url
                  ? currentTime
                  : 0)
                : 0
            )
            : '0:00'}
        </div>
      </div>
    </div>

  );
};

const mapStateToProps = (state: RootState) => {
  return {
    currentTime: state.nowPlaying.currentTime,
    currentPlaylistIndex: state.nowPlaying.currentPlaylistIndex,
    playlist: state.nowPlaying.playlist,
    isPlaying: state.nowPlaying.isPlaying,
  };
};

const mapDispatchToProps = {
  updateCurrentTime,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(StoryWavePlayer);
