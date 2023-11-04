'use client';

/* eslint-disable @next/next/no-img-element */
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { TemporarySegment } from '@/core/ui/components/TemporarySegment';
import commentApi from '@/modules/comment/commentApi';
import likeApi from '@/modules/liked/likeApi';
import { PostDetailType } from '@/modules/post/postType';
import {
  ArchiveAdd,
  Backward,
  Forward,
  Microphone,
  More,
  Pause,
  PlayCircle,
  Send,
  StopCircle,
} from 'iconsax-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
// import ClickOutHandler from 'react-clickout-handler';
import CommentResons from './(icons)/CommentResons';
import LikeResons from './(icons)/LikeResons';
import PlayListResons from './(icons)/PlayListResons';
import PlayResons from './(icons)/PlayResons';
import ShareResons from './(icons)/ShareResons';
import HashtagCover from './HashtagCover';
import PostComment from './PostComment';

export interface PostCardProps {
  postData: PostDetailType;
}

interface ParentComponentProps {
  childValue: string;
}

const PostCard = (props: PostCardProps) => {
  const dispatch = useAppDispatch();
  const wavesurfer = useRef<any>(null);
  const waveformRef = useRef<any>(null);
  // const audioRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLong, setIsLong] = useState(true);
  const [liked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // const audioPreviewRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | undefined>(undefined);
  const [formData, setFormData] = useState({
    comment: '',
    post_id: props.postData.id,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const create = async () => {
      if (!waveformRef.current) return;
      const WaveSurfer = (await import('wavesurfer.js')).default;
      // Create a new instance of WaveSurfer
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'gray',
        progressColor: '#B00000',
        cursorColor: 'transparant',
        barWidth: 3,
        barRadius: 3,
        // responsive: true,
        height: 75,
      });

      wavesurfer.current.load(
        apiPaths.baseUrl +
        '/socialnetwork/audio/stream/' +
        props.postData.audio.id + "?isPostAudio=YES"
      );
      // Handle any error events
      wavesurfer.current.on('error', (error: any) => {
        console.error('Wavesurfer error:', error);
      });

      // Update current time and duration on audio play
      wavesurfer.current.on('play', () => {
        const audioDuration = wavesurfer.current.getDuration();
        setDuration(audioDuration);

        const updateCurrentTime = () => {
          const audioCurrentTime = wavesurfer.current.getCurrentTime();
          setCurrentTime(audioCurrentTime);
          if (audioCurrentTime < audioDuration) {
            requestAnimationFrame(updateCurrentTime);
          }
        };

        updateCurrentTime();
      });

      // Clean up on component unmount
      return () => {
        wavesurfer.current.destroy();
      };
    };
    create();
  }, [props.postData.audio]);

  const handlePlayPause = () => {
    if (isPlaying) {
      wavesurfer.current.pause();
    } else {
      wavesurfer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      setAudioBlob(undefined);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      // eslint-disable-next-line no-undef
      type BlobPart = string | Blob | BufferSource;
      const audioChunks: BlobPart[] = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, {
          type: 'audio/wav',
        });
        setAudioBlob(audioBlob);
      });

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLiked = async () => {
    if (!liked) {
      if (props.postData?.id) {
        setIsLiked(true);
        await Promise.resolve(
          dispatch(
            likeApi.endpoints.addLiked.initiate({
              post_id: props.postData!.id,
              like: true,
            })
          )
        );
      }
    } else {
      if (props.postData.id) {
        setIsLiked(false);
        await Promise.resolve(
          dispatch(
            likeApi.endpoints.addLiked.initiate({
              post_id: props.postData!.id,
              like: false,
            })
          )
        );
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (audioBlob) {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        var file = new File([audioBlob], 'audio.wav');
        await Promise.resolve(
          dispatch(
            commentApi.endpoints.addComment.initiate({
              comment: formData.comment,
              file: file,
              post_id: formData.post_id!,
            })
          )
        );
        setFormData({
          comment: '',
          post_id: props.postData.id,
        });
        setAudioBlob(undefined);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  const handelTextLength = () => {
    if (isLong) {
      setIsLong(!isLong);
    } else {
      setIsLong(!isLong);
    }
  };

  return (
    <div className="flex flex-col bg-white w-[100%] rounded-xl mt-5 sm:mb-5">
      <div className="relative flex justify-between items-center px-4 py-4">
        <a href={`/profile/${props.postData.id}`}>
          <div className="flex items-center gap-2">
            <div className="w-max h-max border-solid border-2 border-accentRed rounded-full drop-shadow-2xl">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <img
                  src={
                    props.postData.owner.profile_image &&
                    (props.postData.owner.profile_image != null
                      ? props.postData.owner.profile_image
                      : '/images/avatar.jpg')
                  }
                  alt="post_owner_avatar"
                  onError={(e) => {
                    (e.target as any).onError = null;
                    (e.target as any).src = '/images/avatar.jpg';
                  }}
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm md:text-base font-medium text-dark-500 flex items-center">
                {props.postData.owner.name}
                <div className="mx-1 text-xs md:text-sm text-gray-500">
                  {props.postData.created_at_human}
                </div>
              </div>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                United Kingdom{' '}
                <span className="mx-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500 text-[.5rem] text-white">
                  EN
                </span>
              </div>
            </div>
          </div>
        </a>
        <div className="group">
          <More size="28" className="text-dark-500" variant="Outline" />
          <div className="group-hover:block hidden absolute top-full right-0 bg-white w-max z-50 drop-shadow-2xl">
            <a
              href="#"
              className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800"
            >
              <ArchiveAdd size="21" color="#333" variant="Outline" />
              <span className="ml-5">Save</span>
            </a>

            <a
              href="#"
              className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800"
            >
              <PlayCircle size="21" color="#333" variant="Bulk" />
              <span className="ml-5">AutoPlay</span>
            </a>

            <a
              href="#"
              className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800"
            >
              <ShareResons width="24" height="24" gradient={true} />
              <span className="ml-5">Share</span>
            </a>
          </div>
        </div>
        {/* <ClickOutHandler onClickOut={() => setDropDownOpen(false)}>
          <>
            {dropDownOpen && (
              <div className="absolute top-full right-0 bg-white w-max z-50 drop-shadow-2xl">
                <a
                  href="#"
                  className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800"
                >
                  <ArchiveAdd size="21" color="#333" variant="Outline" />
                  <span className="ml-5">Save</span>
                </a>

                <a
                  href="#"
                  className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800"
                >
                  <PlayCircle size="21" color="#333" variant="Bulk" />
                  <span className="ml-5">AutoPlay</span>
                </a>

                <a
                  href="#"
                  className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800"
                >
                  <Share size="21" color="#333" variant="TwoTone" />

                  <span className="ml-5">Share</span>
                </a>
              </div>
            )}
          </>
        </ClickOutHandler> */}
        <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
      </div>

      <div className="relative flex flex-col sm:flex-row p-4">
        {/* <div
          onClick={handlePlayPause}
          className="relative w-60 h-60 mx-auto sm:mx-0 mb-6 sm:mb-0 sm:w-[180px] sm:h-[180px] overflow-hidden rounded-2xl hover:cursor-pointer"
        >
          <img
            src="https://media.istockphoto.com/id/828156368/photo/demo.jpg?s=612x612&w=0&k=20&c=JIREJlrI5vY33-hLNn8vz_GREOoTIFLfSsOSkgYJ_ms="
            alt="audio_cover_image"
            className="w-[100%] h-[100%] object-cover"
          />
          {isPlaying ? (
            <div className="absolute text-white top-[38%] left-[38%] item-fadein">
              <Pause size="48" color="white" variant="Bulk" />
            </div>
          ) : (
            <div className="absolute text-white top-[38%] left-[38%] item-fadeout">
              <Play size="48" color="white" variant="Bulk" />
            </div>
          )}
        </div> */}
        <div className="flex flex-col justify-around basis-full w-full">
          <h3 className="text-base md:text-2xl font-bold text-gray-900 m-0 text-left">
            <HashtagCover text={props.postData.title} />
          </h3>
          <div
            className={`basis-full w-full sm:w-2/3 lg:w-3/4 relative mb-4 mt-2`}
          >
            <p
              className={`text-sm font-light text-gray-400 text-left ${isLong ? 'truncate' : ''
                }`}
            >
              A song is a musical composition intended to be performed by the
              human voice. This is often done at distinct and fixed pitches
              (melodies) using patterns of sound and silence. Songs contain
              various forms, such as those including the repetition and
              variation of sections.{' '}
            </p>
            <span
              onClick={handelTextLength}
              className={` ${isLong ? 'text-blue-400 cursor-pointer' : 'hidden'
                }`}
            >
              more
            </span>
            <span
              onClick={handelTextLength}
              className={` ${isLong ? 'hidden' : 'text-blue-400 cursor-pointer'
                }`}
            >
              less
            </span>
          </div>

          <div ref={waveformRef}></div>

          <div className="flex justify-between">
            <div>{formatTime(currentTime)}</div>
            <div>{formatTime(duration)}</div>
          </div>
        </div>
        <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
      </div>

      <div className="relative flex p-4 justify-between">
        <div className="flex sm:basis-24 justify-evenly sm:justify-between items-center">
          <div
            className="flex mr-5 last-of-type:mr-0 items-start cursor-pointer"
            // onClick={() => {
            //   setIsLiked(!liked);
            // }}
            onClick={handleLiked}
          >
            <button className="border-none bg-transparent mr-2">
              {liked ? (
                // <Heart size="24" color="#cf4a4a" variant="Bold" />
                <LikeResons width="24" height="24" gradient={true} />
              ) : (
                <LikeResons width="24" height="24" gradient={false} />
              )}
            </button>
            <span className="text-[1rem]">{props.postData.total_likes}</span>
          </div>
          <div className="flex mr-5 last-of-type:mr-0 items-start">
            <button className="border-none bg-transparent mr-2">
              <CommentResons width="26" height="26" gradient={false} />
            </button>
            <span className="text-[1rem]">{props.postData.total_comments}</span>
          </div>
          <div className="flex mr-5 last-of-type:mr-0 items-start">
            {/* <button
              className="border-none bg-transparent mr-2"
              title="Add to Playlist"
            >
              <PlayAdd size="24" color="gray" variant="Bold" />
            </button> */}
            <button className="w-max sm:flex justify-evenly items-center py-[.151rem] px-[.151rem] sm:px-[.251rem] border-solid rounded-sm sm:rounded-none border-[1px] text-[.8rem] border-gray-200 bg-gray-100 text-gray-800 leading-[25px] mr-1">
              <PlayListResons width="24" height="24" gradient={false} />
              <span className="hidden sm:inline-block">
                &nbsp; Add to playlist
              </span>
            </button>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <button className="border-none bg-transparent w-[30px]">
            <Backward size="24" color="#333" variant="Bold" />
          </button>
          <button
            onClick={handlePlayPause}
            className="border-none bg-transparent w-[30px]"
          >
            {isPlaying ? (
              <Pause size="26" color="#333" variant="Outline" />
            ) : (
              // <Play size="26" color="#333" variant="Outline" />
              <PlayResons width="24" height="24" gradient={false} />
            )}
          </button>

          <button className="border-none bg-transparent w-[30px]">
            <Forward size="21" color="#333" variant="Bold" />
          </button>
        </div>
        <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
      </div>

      {(props.postData.comments?.length ?? 0) > 0 ? (
        <>
          <div className="my-3 px-4">
            <Link
              className="border-none bg-transparent p-0 m-0 text-[#50b5ff] hover:text-[#449ad9] text-[1rem]"
              href={`/post/${props.postData.id}`}
            >
              View all {props.postData.total_comments} comments
            </Link>
          </div>
          {props.postData.comments?.map((comment) => {
            return <PostComment key={comment.id} comment={comment} />;
          })}
        </>
      ) : (
        <p className="py-3 px-8 text-center m-0">No Comment found.</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="px-4">
          <div className="flex items-start py-3 px-3 rounded-[37px] bg-[#efefef] w-full mb-5">
            <div className="basis-12">
              <div className="w-[35px] h-[35px] rounded-full overflow-hidden mr-5">
                <img
                  src="https://media.istockphoto.com/id/828156368/photo/demo.jpg?s=612x612&w=0&k=20&c=JIREJlrI5vY33-hLNn8vz_GREOoTIFLfSsOSkgYJ_ms="
                  alt=""
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
            </div>

            <div className="basis-auto w-full">
              <input
                type="hidden"
                name="post_id"
                value={formData.post_id}
                onChange={handleInputChange}
                placeholder="Write a comment here..."
                className="border-b border-solid border-t-0 border-r-0 border-l-0 border-b-gray-300 bg-transparent text-[1rem] text-gray-500 w-full"
              />
              <input
                type="text"
                name="comment"
                required
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Write a comment here..."
                className="border-b border-solid border-t-0 border-r-0 border-l-0 border-b-gray-300 bg-transparent text-[1rem] text-gray-500 w-full"
              />
              {audioBlob ? (
                <TemporarySegment audioUrl={URL.createObjectURL(audioBlob)} />
              ) : (
                <></>
              )}
            </div>

            <div className="flex basis-[9rem] lg:basis-[6rem] justify-end">
              {recording ? (
                <button
                  onClick={recording ? stopRecording : startRecording}
                  type="button"
                  className="flex justify-center items-center border-none bg-red-400 h-[32px] w-[32px] rounded-full mr-2 last-of-type:mr-0"
                >
                  <StopCircle size="18" color="white" variant="Bulk" />
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  type="button"
                  className="flex justify-center items-center border-none bg-gray-400 h-[32px] w-[32px] rounded-full mr-2 last-of-type:mr-0"
                >
                  <Microphone size="18" color="white" variant="Bulk" />
                </button>
              )}
              <button
                type="submit"
                className="flex justify-center items-center border-none bg-blue-400 h-[32px] w-[32px] rounded-full mr-2 last-of-type:mr-0"
              >
                <Send size="18" color="white" variant="TwoTone" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostCard;
