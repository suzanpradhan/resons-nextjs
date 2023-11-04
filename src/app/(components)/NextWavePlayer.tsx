import { defaultWaveData } from '@/core/constants/appConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { formatTime } from '@/core/utils/helpers';
import { NowPlayingAudioItem } from '@/modules/nowPlaying/nowPlayingAudioType';
import {
  manualUpdateCurrentTime,
  playSong,
  updateIsPlaying,
} from '@/modules/nowPlaying/nowPlayingReducer';
import { Pause, Play } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import WaveSurfer from 'sz-wavesurfer';

interface NextWavePlayerProps {
  audioItem: NowPlayingAudioItem;
  onPlay?: () => void;
  audioWaveData?: string;
  controls?: boolean;
  theme?: 'dark' | 'white';
  size?: 'small' | 'large';
}

const NextWavePlayer = ({
  audioItem,
  onPlay,
  audioWaveData,
  theme = 'white',
  controls = true,
  size,
}: NextWavePlayerProps) => {
  const dispatch = useAppDispatch();
  const audioContainer = useRef(null);
  const audioRef = useRef<WaveSurfer | undefined>(undefined);
  const [waveLoaded, setWaveLoaded] = useState(false);

  // const [duration, setDuration] = useState(
  //   audioDuration ? parseInt(audioDuration) : 0
  // );

  const currentPlaylistIndex = useSelector(
    (state: RootState) => state.nowPlaying.currentPlaylistIndex as number
  );
  const playlist = useSelector(
    (state: RootState) => state.nowPlaying.playlist as NowPlayingAudioItem[]
  );
  const currentTime = useSelector(
    (state: RootState) => state.nowPlaying.currentTime
  );
  const isPlaying = useSelector(
    (state: RootState) => state.nowPlaying.isPlaying
  );

  // const [currentTime, setCurrentTime] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [play, exposedData] = useSound('/sweed_app.mp3');

  // const [isPlaying, currentTime, currentAudioUrl, play, pause] = useAudio();

  // const test = () => {
  //   if (!audioRef.current) return;
  //   audioRef.current.setCurrentTime(exposedData.sound.seek());
  //   if (exposedData.sound.playing()) {
  //     requestAnimationFrame(test);
  //   }
  // };
  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (playlist[currentPlaylistIndex]?.url != audioItem.url) {
      return;
    }
    if (audioItem.duration != 0 && currentTime != 0) {
      audioRef.current?.manualRenderProgress(currentTime / audioItem.duration);
      // audioRef.current!.seekTo(currentTime / audioItem.duration);
      // audioRef.current?.setTime(Math.round(currentTime));
    }

    // audioRef.current.setOptions({});
    // audioRef.current.setTime(currentTime);
    //
  }, [playlist[currentPlaylistIndex]?.url, audioItem.url]);

  // useEffect(() => {
  //   if (!audioRef.current) return;
  //   if (exposedData.sound) {
  //     exposedData.sound.once('play', function () {
  //       console.log(exposedData.sound);
  //       audioRef.current.load(audioUrl);
  //       // audioRef.current.backend = exposedData.sound._sounds[0]._node;

  //       // audioRef.current.addRegion({
  //       //   start: 0,
  //       //   end: exposedData.duration,
  //       // });
  //       test();
  //     });
  //   }
  // }, [exposedData.sound]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const create = async () => {
      if (audioRef.current) {
        audioRef.current.destroy();
        audioRef.current = undefined;
      }
      if (!audioContainer.current) return;
      const WaveSurfer = (await import('sz-wavesurfer')).default;
      audioRef.current = WaveSurfer.create({
        container: audioContainer.current,
        waveColor: theme == 'dark' ? 'white' : '#343543',
        progressColor: '#de5b6d',
        cursorColor: 'transparent',
        // url: audioItem.url,
        barWidth: 1,
        barGap: 3,
        barRadius: 2,
        duration: audioItem.duration ? audioItem.duration : 0,
        peaks: audioWaveData ? JSON.parse(audioWaveData) : defaultWaveData,

        // responsive: true,
        height: size == 'small' ? 15 : 60,

        // media: exposedData.sound._sounds[0]._node,
      });

      // audioRef.current.load(
      //   '',
      //   audioWaveData ? JSON.parse(audioWaveData) : defaultWaveData,
      //   audioItem.duration ? Math.round(audioItem.duration) : 0
      // );

      // audioRef.current.song =
      //   apiPaths.baseUrl + '/socialnetwork/audio/stream/' + 45;
      // try {
      //   audioRef.current.backend.peaks = audioWaveData
      //     ? JSON.parse(audioWaveData)
      //     : defaultWaveData;
      // } catch (error) {
      //   audioRef.current.backend.peaks = defaultWaveData;
      // }

      // audioRef.current.drawBuffer();

      //   audioRef.current.loadMediaElement(
      //     audioRef.current.song,
      //     audioRef.current.backend.peaks
      //   );

      // audioRef.current.on('finish', () => {
      //   setIsPlaying(false);
      // });

      // audioRef.current.on('pause', () => {
      //   console.log('Paused');
      // });

      // audioRef.current?.on('error', (error: any) => {
      //   console.error('Wavesurfer error:', error);
      // });

      // audioRef.current.on('play', () => {
      //   const audioDuration = audioRef.current.getDuration();
      //   dispatch(updateCurrentDuration(audioDuration));
      //   setDuration(audioDuration);
      //   const updateCurrentTime = () => {
      //     const audioCurrentTime = audioRef.current.getCurrentTime();
      //     setCurrentTime(audioCurrentTime);
      //     dispatch(updateCurrentPlayTime(audioCurrentTime));
      //     if (audioCurrentTime < audioDuration) {
      //       requestAnimationFrame(updateCurrentTime);
      //     }
      //   };
      //   updateCurrentTime();
      // });

      audioRef.current.on('drag', function (progress: any) {
        // if (playlist[currentPlaylistIndex]?.url != audioItem.url) {
        //   return;
        // }
        var currentTime = progress * audioItem.duration;
        dispatch(
          manualUpdateCurrentTime({
            currentTime: currentTime,
            url: audioItem.url,
          })
        );
      });
      // audioRef.current.on('interaction', function (newTime: any) {
      //   dispatch(manualUpdateCurrentTime(newTime));
      // });

      audioRef.current.on('click', function (progress: any) {
        audioRef.current?.manualRenderProgress(progress);
        // if (playlist[currentPlaylistIndex]?.url != audioItem.url) {
        //   return;
        // }
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
          console.log(audioRef.current?.getDuration());
          setWaveLoaded(true);
        }

        // if (isPlaying) {
        //   await audioRef.current.pause();
        // } else {
        //   await audioRef.current.play();
        // }
        // audioRef.current.backend.setPeaks(null);
        // audioRef.current.drawBuffer();
        // setIsPlaying(!isPlaying);
        // if (onPlay) {
        //   onPlay();
        // }
      });

      return () => {
        audioRef.current?.destroy();
      };
    };
    create();
  }, [audioItem.url]);

  // useEffect(() => {
  //   if (!audioRef.current) return;
  //   if (currentAudioId == undefined) return;
  //   if (currentAudioId == audioUrl) {
  //     setCurrentTime(currentPlayTime);
  //     return;
  //   }
  // }, [currentPlayTime]);

  // useEffect(() => {
  //   if (!audioRef.current) return;
  //   if (currentAudioId == undefined) return;
  //   if (currentAudioId != audioUrl) {
  //     audioRef.current.pause();
  //     setIsPlaying(false);
  //     return;
  //   }
  // }, [currentAudioId]);

  // const handlePlayPause = async () => {
  // console.log('here');

  // play();
  // if (!audioRef.current) return;
  // if (!audioRef.current.loaded && !isPlaying) {
  //   await Promise.resolve(dispatch(updateCurrentAudioId(audioUrl)));
  //   await audioRef.current.load(audioUrl);
  //   return;
  // }
  // if (isPlaying) {
  //   await audioRef.current.pause();
  // } else {
  //   if (onPlay) {
  //     onPlay();
  //   }
  //   await Promise.resolve(dispatch(updateCurrentAudioId(audioUrl)));

  //   await audioRef.current.play();
  // }
  // setIsPlaying(!isPlaying);
  // };

  const handlePlayPause = async (e: any) => {
    e?.stopPropagation();
    // if (!waveLoaded) {
    //   try {
    //     await audioRef.current?.load(audioItem.url);

    //     console.log(audioRef.current?.exportPeaks());
    //   } catch (error) {
    //     await audioRef.current?.load(audioItem.url);
    //   }
    // }
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
    <div>
      <div className="relative flex items-center w-full">
        {controls ? (
          <button
            type="button"
            className={`border-none rounded-full p-2 mr-2 ${
              theme == 'dark' ? 'bg-white' : 'bg-primary-900'
            }`}
            onClick={handlePlayPause}
          >
            {playlist[currentPlaylistIndex]?.url == audioItem.url &&
            isPlaying ? (
              <Pause
                size={size == 'small' ? 9 : 24}
                className={`${theme == 'dark' ? 'text-accent' : 'text-white'}`}
                weight="fill"
              />
            ) : (
              <Play
                size={size == 'small' ? 9 : 24}
                className={`${theme == 'dark' ? 'text-accent' : 'text-white'}`}
                weight="fill"
              />
            )}
          </button>
        ) : (
          <></>
        )}
        <div
          ref={audioContainer}
          className="w-full flex-1"
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

export default React.memo(NextWavePlayer);
