import { apiPaths } from "@/core/api/apiConstants";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { formatTime } from '@/core/utils/helpers';
import { manualUpdateCurrentTime } from "@/modules/nowPlaying/nowPlayingReducer";
import { PostDetailType } from '@/modules/post/postType';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from 'sz-wavesurfer';

interface StoryCardProps {
  post: PostDetailType;
}

const StoryCard = (props: StoryCardProps) => {
  console.log("StoryCardProps", props?.post);
  const dispatch = useAppDispatch();
  const audioContainer = useRef(null);
  const audioRef = useRef<WaveSurfer | undefined>(undefined);
  const [waveLoaded, setWaveLoaded] = useState(false);
  const [sessionPlayed, setSessionPlayed] = useState(false);
  const playList = useAppSelector((state: RootState) => state.nowPlaying.playlist);
  const isPlaying = useAppSelector((state: RootState) => state.nowPlaying.isPlaying);
  var audioId = props?.post?.id;
  const postAudio = props?.post?.audio;
  const postOwnerImg = props?.post?.owner?.profile_image;
  const audioUrl = postAudio
    ? apiPaths.baseUrl + '/socialnetwork/audio/stream/' + postAudio?.id + "?isPostAudio=YES"
    : '';
  const audioDuration = parseFloat(postAudio?.file_duration || '0');

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
    if (!audioRef.current) {
      return;
    }
    if (!audioUrl) {
      return;
    }
    if (audioDuration != 0) {
      audioRef.current?.manualRenderProgress(audioDuration);
    }
  }, [audioDuration, audioUrl]);


  useEffect(() => {
    if (typeof window === 'undefined') return;
    const create = async () => {
      if (audioRef.current) {
        audioRef.current.destroy();
        audioRef.current = undefined;
      }
      if (!audioContainer.current) return;

      const WaveSurfer = (await import('sz-wavesurfer')).default;

      var waveColor = (audioRef.current = WaveSurfer.create({
        container: audioContainer.current,
        waveColor: "#ffffff",
        progressColor: getWaveColor(audioId),
        cursorColor: 'transparent',
        // url: audioItem.url,
        barWidth: 1,
        barGap: 3,
        barRadius: 2,
        duration: audioDuration ? audioDuration : 0,
        peaks: JSON.parse(postAudio?.wave_data!),
        // responsive: true,
        height: 40,

        // media: exposedData.sound._sounds[0]._node,
      }));

      audioRef.current.on('drag', function (progress: any) {

        var currentTime = progress * audioDuration;
        dispatch(
          manualUpdateCurrentTime({
            currentTime: currentTime,
            url: audioUrl,
          })
        );
      });

      audioRef.current.on('click', function (progress: any) {
        audioRef.current?.manualRenderProgress(progress);
        // if (playlist[currentPlaylistIndex]?.url != audioItem.url) {
        //   return;
        // }
        var currentTime = progress * audioDuration;
        dispatch(
          manualUpdateCurrentTime({
            currentTime: currentTime,
            url: audioUrl,
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
  }, [audioDuration, audioUrl, audioId, dispatch, postAudio?.wave_data, waveLoaded]);


  return (
    <div className="relative flex items-center w-full max-w-3xl last:rounded-b-none rounded-lg bg-gray-500 backdrop-blur-sm p-2 mt-1">
      <div className="w-max h-max border-solid border-0 border-white rounded-full p-1">
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          <Image alt="profile-image" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" className="w-10 h-10 object-cover" src={postOwnerImg ? postOwnerImg : '/images/avatar.jpg'}></Image>
        </div>
      </div>
      <div ref={audioContainer} className={`w-full flex-1`}></div>
      <div className="bg-primary-900 text-white text-xs w-11 text-center py-1 ml-1 rounded-sm">
        {audioDuration ? formatTime(audioDuration) : '0:00'}
      </div>
    </div>
  );
};

export default StoryCard;
