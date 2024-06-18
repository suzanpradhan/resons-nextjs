import { defaultWaveData } from '@/core/constants/appConstants';
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
import { Pause, Play, SkipBack, SkipForward } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';

import { ConnectedProps, connect } from 'react-redux';
import WaveSurfer from 'sz-wavesurfer';

interface WavePlayerV2Props extends PropsFromRedux {
  audioItem: NowPlayingAudioItem;
  onPlay?: () => void;
  audioWaveData?: string;
  controls?: boolean;
  playBackControls?: boolean;

  theme?: 'dark' | 'white';
  size?: 'small' | 'large';
}

const WavePlayer = ({
  audioItem,
  onPlay,
  audioWaveData,
  theme = 'white',
  controls = true,
  playBackControls = false,
  size,
  currentTime,
  currentPlaylistIndex,
  playlist,
  isPlaying,
}: WavePlayerV2Props) => {
  const dispatch = useAppDispatch();
  const audioContainer = useRef(null);
  const audioRef = useRef<WaveSurfer | undefined>(undefined);
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
        waveColor: theme == 'dark' ? 'white' : '#343543',
        progressColor: getWaveColor(audioId),
        cursorColor: 'transparent',
        barWidth: 1,
        barGap: 3,
        barRadius: 2,
        duration: audioItem.duration ? audioItem.duration : 0,
        peaks: audioWaveData ? JSON.parse(audioWaveData) : defaultWaveData,
        height: size == 'small' ? 15 : 60,
      }));

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
  }, [audioItem]);

  const handlePlayPause = async (e: any) => {
    e?.stopPropagation();

    if (playlist[currentPlaylistIndex]?.url == audioItem.url) {
      if (isPlaying) {
        dispatch(updateIsPlaying(false));
      } else {
        dispatch(updateIsPlaying(true));
      }
    } else {
      dispatch(playSong(audioItem));
    }
  };

  return (
    <div className="relative flex items-center gap-1 w-full">
      {playBackControls && (
        <div className="p-[6px] rounded-full bg-white/10 backdrop-blur-sm mr-1">
          <SkipBack size={18} className={`${'text-white'}`} weight="fill" />
        </div>
      )}

      {controls ? (
        <button
          type="button"
          className={`border-none rounded-full p-2 ${
            theme == 'dark' ? 'bg-white' : 'bg-primary-700'
          }`}
          onClick={onPlay ?? handlePlayPause}
        >
          {playlist[currentPlaylistIndex]?.url == audioItem.url && isPlaying ? (
            <Pause
              size={size == 'small' ? 14 : 24}
              className={`${
                sessionPlayed
                  ? 'text-purple'
                  : theme == 'dark'
                  ? 'text-accent'
                  : 'text-white'
              }`}
              weight="fill"
            />
          ) : (
            <Play
              size={size == 'small' ? 14 : 24}
              className={`${
                sessionPlayed
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
      {playBackControls && (
        <div className="p-[6px] rounded-full bg-white/10 backdrop-blur-sm ml-1">
          <SkipForward size={18} className={`${'text-white'}`} weight="fill" />
        </div>
      )}

      <div
        ref={audioContainer}
        className={`w-full grow audio-wrapper ${
          playlist[currentPlaylistIndex]?.url == audioItem.url
            ? ''
            : 'pointer-events-none'
        }`}
        onClick={(e) => {
          e?.stopPropagation();
        }}
      ></div>
      <div className="bg-primary-700 text-white text-xs p-1 flex item-center leading-[11px]">
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

export default connector(WavePlayer);
