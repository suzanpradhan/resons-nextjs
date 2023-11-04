/* eslint-disable @next/next/no-img-element */
'use client';

import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import ShareButton from '@/core/ui/components/Share';
import { TemporarySegmentV2 } from '@/core/ui/components/TemporarySegmentV2';
import { toHoursAndMinutes } from '@/core/utils/helpers';
import commentApi from '@/modules/comment/commentApi';
import { CommentDetailType } from '@/modules/comment/commentType';
import likeApi from '@/modules/liked/likeApi';
import { updateIsPlaying } from '@/modules/nowPlaying/nowPlayingReducer';
import { PostEachDetailType } from '@/modules/post/postType';
import postDeleteApi from '@/modules/postDelete/postDeleteApi';
import {
  AddSquare,
  ArrowCircleDown2,
  BagCross,
  CloseSquare,
  DocumentUpload,
  Heart,
  Message,
  Microphone,
  More,
  Pause,
  Play,
  Send,
  StopCircle,
} from 'iconsax-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ShareResons from './(icons)/ShareResons';
import PlayListPopUp from './(popups)/PlayListPopUp';
import PostCommentList from './PostCommentList';
import WavePlayer from './WavePlayer';

export interface SinglePostCardV2Props {
  postData: PostEachDetailType;
}

const SinglePost = (props: SinglePostCardV2Props) => {
  const session = useSession();

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | undefined>(undefined);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [showNoCommentAudioError, setShowNoCommentAudioError] = useState<
    string | undefined
  >(undefined);
  const [formData, setFormData] = useState({
    comment: '',
    post_id: props.postData?.post?.id,
  });
  const playlistId = useSelector(
    (state: RootState) => state.nowPlaying.playlistId
  );
  const isPlaying = useSelector(
    (state: RootState) => state.nowPlaying.isPlaying
  );
  const [showPopup, setShowPopup] = useState(false);
  const [liked, setIsLiked] = useState(props.postData.post.my_like);
  const [totalLike, setTotalLike] = useState(props.postData.post.total_likes);
  const shareUrl = {
    title: props.postData.post.title,
    description: props.postData.post.description,
    url: '',
  };

  const [selectedPost, setSelectedPost] = useState<object | undefined>(
    undefined
  );

  const postData = {
    title: props.postData.post.title,
    audio_id: props.postData.post.audio.id,
  };

  const handleSelectedCommentChange = (selectedData: any) => {
    setSelectedComment(selectedData);
  };

  const [selectedComment, setSelectedComment] = useState<
    CommentDetailType | undefined
  >(undefined);

  const commentData = {
    title: selectedComment?.comment,
    audio_id: selectedComment?.audio.id,
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
    setShowNoCommentAudioError(undefined);

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setShowNoCommentAudioError(undefined);

    if (!formData.comment) {
      setShowNoCommentAudioError("You haven't write any text for the title");
      return;
    }

    if (!audioBlob) {
      setShowNoCommentAudioError("We couldn't find a sound file attached");
      return;
    }

    if (audioBlob && formData.comment) {
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
          post_id: props.postData?.post?.id,
        });
        setAudioBlob(undefined);
        setShowPopup(false);
        setShowNoCommentAudioError(undefined);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  const handlePostDelete = async () => {
    if (props.postData?.post?.id) {
      await Promise.resolve(
        dispatch(
          postDeleteApi.endpoints.postDelete.initiate({
            post_id: props.postData?.post!.id,
          })
        )
      );
    }
  };

  const handleLiked = async () => {
    if (!liked) {
      if (props.postData?.post.id) {
        setIsLiked(true);
        setTotalLike(totalLike + 1);
        await Promise.resolve(
          dispatch(
            likeApi.endpoints.addLiked.initiate({
              post_id: props.postData!.post.id,
              like: true,
            })
          )
        );
      }
    } else {
      if (props.postData.post.id) {
        setIsLiked(false);
        setTotalLike(totalLike - 1);
        await Promise.resolve(
          dispatch(
            likeApi.endpoints.addLiked.initiate({
              post_id: props.postData!.post.id,
              like: false,
            })
          )
        );
      }
    }
  };

  const handlePlayPauseAllComments = async () => {
    if (isPlaying) {
      dispatch(updateIsPlaying(false));
      return;
    }
    // var comments = await Promise.resolve(
    //   dispatch(
    //     commentApi.endpoints.getAllComments.initiate(
    //       props.postData.post.id!.toString()
    //     )
    //   )
    // );

    // if (comments.data) {
    //   var commentAudios = comments.data!.map((comment) => {
    //     return {
    //       url:
    //         apiPaths.baseUrl +
    //         '/socialnetwork/audio/stream/' +
    //         comment.audio.id!,
    //       duration: comment.audio.file_duration
    //         ? parseFloat(comment.audio.file_duration)
    //         : 0,
    //       info: {
    //         title: comment.comment,
    //         description: comment.owner.name,
    //       },
    //     };
    //   });
    //   dispatch(
    //     addNewPlaylist({
    //       id: props.postData.post.id?.toString(),
    //       playlist: [
    //         {
    //           url:
    //             apiPaths.baseUrl +
    //             '/socialnetwork/audio/stream/' +
    //             props.postData.post.audio?.id,
    //           duration: props.postData.post.audio.file_duration
    //             ? parseFloat(props.postData.post.audio.file_duration)
    //             : 0,
    //           info: {
    //             title: props.postData.post.title,
    //             description: props.postData.post.owner.name,
    //           },
    //         },
    //         ...commentAudios,
    //       ],
    //     })
    //   );
    // }
  };

  const handleAudioDownloadUrl = async () => {
    if (window !== undefined && props.postData.post.audio.id) {
      window
        .open(
          `${apiPaths.baseUrl + apiPaths.postAudioDownload}${props.postData.post.audio.id
          }`,
          '_blank'
        )
        ?.focus();
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white w-[100%] rounded-sm mt-5 sm:mb-5 shadow-xl">
        <div className="relative flex justify-between items-center px-4">
          <Link
            href={`${session.data?.user?.id === props.postData.post.owner.id
                ? '/profile'
                : `/profile/${props.postData.post.owner.id}`
              }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-max h-max border-solid border-2 border-gray-300 rounded-full p-[2px]">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={
                      props.postData.post.owner?.profile_image &&
                        props.postData.post.owner?.profile_image != null
                        ? apiPaths.rootPath +
                        '/storage/' +
                        props.postData.post.owner?.profile_image
                        : '/images/avatar.jpg'
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
                <div className="text-sm md:text-lg font-medium text-dark-500 flex items-center">
                  {props.postData.post.owner.name}
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  United Kingdom{' '}
                  <span className="mx-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500 text-[.5rem] text-white">
                    EN
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <div className="group py-4 cursor-pointer">
            <More size="28" className="text-dark-500" variant="Outline" />
            <div className="group-hover:hidden hidden absolute top-full right-0 bg-white w-max z-50 drop-shadow-2xl">
              <div
                onClick={handlePostDelete}
                className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800 cursor-pointer"
              >
                <BagCross size="24" color="red" variant="TwoTone" />
                <span className="ml-5">Remove</span>
              </div>

              <a
                href="#"
                className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800 cursor-pointer"
              >
                <ShareResons width="24" height="24" gradient={true} />
                <span className="ml-5">Share</span>
              </a>
            </div>
          </div>
          <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-stretch px-4 py-4">
          <div className="basis-2/3 w-full md:border md:border-l-0 md:border-t-0 md:border-r-0 md:border-b-0 md:border-gray-100 md:mr-2">
            <h3 className="text-base md:text-lg font-bold text-gray-900 m-0 text-left">
              {props.postData?.post?.title}
            </h3>
            <div className="basis-full w-full mb-4">
              <p className="inline-block text-sm font-light text-gray-400 m-0 text-justify">
                {props.postData?.post?.description}
              </p>
            </div>

            <WavePlayer
              audioItem={{
                url:
                  apiPaths.baseUrl +
                  '/socialnetwork/audio/stream/' +
                  props.postData.post.audio?.id + "?isPostAudio=YES",
                duration: props.postData.post.audio.file_duration
                  ? parseFloat(props.postData.post.audio.file_duration)
                  : 0,
                info: {
                  title: props.postData.post.title,
                  description: props.postData.post.owner.name,
                },
              }}
              audioWaveData={props.postData.post.audio.wave_data}
            />

            <div className="relative flex justify-between items-center py-1 my-1">
              <div className="flex items-center">
                <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
                  <button
                    onClick={handleLiked}
                    className="border-none bg-transparent mr-1"
                  >
                    {liked ? (
                      <Heart size="21" color="#cf4a4a" variant="Bold" />
                    ) : (
                      <Heart size="21" color="gray" />
                    )}
                  </button>

                  <span className="text-sm font-bold">{totalLike}</span>
                </div>

                <div className="mr-2 last-of-type:mr-0">
                  <Link
                    href={`/post/${props.postData.post.id}`}
                    className="flex items-center"
                  >
                    <button className="border-none bg-transparent mr-1">
                      <Message size="21" color="gray" />
                    </button>
                    {/* <span className="text-sm font-bold">
                      {props.postData.post.total_comments}
                    </span> */}
                  </Link>
                </div>

                <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
                  <button
                    onClick={handleAudioDownloadUrl}
                    className="border-none bg-transparent"
                    title="download audio"
                  >
                    <ArrowCircleDown2 size="21" color="gray" />
                  </button>
                </div>

                <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
                  <ShareButton shareProps={shareUrl} />
                </div>

                <div className="flex mr-2 last-of-type:mr-0 items-center cursor-pointer">
                  <button
                    onClick={() => setSelectedPost(props.postData)}
                    className="border-none bg-transparent"
                    title="Add to playlist"
                  >
                    <AddSquare size="21" color="gray" />
                  </button>
                </div>
              </div>
              <div className="mx-1 text-xs md:text-sm text-gray-500">
                {props.postData.post.created_at_human}
              </div>
              <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
            </div>

            {/* comment */}

            {props.postData.comments.data.length > 0 ? (
              props.postData.comments.data.map((comment, index) => {
                return (
                  <PostCommentList
                    commentData={comment}
                    key={index}
                    onSelectedComment={handleSelectedCommentChange}
                  />
                );
              })
            ) : (
              <p className="py-3 px-8 text-center m-0 text-gray-400 text-sm">
                No Comment found.
              </p>
            )}
          </div>

          <div className="basis-1/3 flex flex-col justify-between mt-5 md:mt-0">
            <div className="md:px-4">
              <div className="flex items-center mb-4">
                <button
                  type="button"
                  className="border-none rounded-full bg-red-500 p-2"
                  onClick={handlePlayPauseAllComments}
                >
                  {playlistId &&
                    playlistId == props.postData.post.id?.toString() &&
                    isPlaying ? (
                    <Pause size="20" color="#fff" variant="Bulk" />
                  ) : (
                    <Play size="20" color="#fff" variant="Bulk" />
                  )}
                </button>
                <div className="text-sm text-gray-500 ml-2">
                  <p className="text-sm">
                    Listen to{' '}
                    <span className="text-gray-600">
                      {toHoursAndMinutes(props.postData?.post?.total_duration)}
                    </span>{' '}
                  </p>
                  <p className="text-sm">
                    Post with {props.postData?.post?.total_comments} comments
                  </p>
                </div>
              </div>
              <div className="hidden md:block text-base text-gray-500 mb-4">
                <h4 className="font-medium inline-block md:block">
                  Genre<span className="md:hidden">:&nbsp;</span>
                </h4>
                {(props.postData.post.genres?.length ?? 0) > 0 ? (
                  props.postData.post.genres?.map((genre) => {
                    return (
                      <span
                        key={genre.id}
                        className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none"
                      >
                        {genre.title}
                      </span>
                    );
                  })
                ) : (
                  <>
                    <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                      N/A
                    </span>
                  </>
                )}
              </div>
            </div>
            <div>
              <div
                className="flex items-center text-sm text-gray-500 bg-gray-100 py-2 px-3 rounded-sm mb-1"
                onClick={() => setShowPopup(true)}
              >
                <button
                  type="button"
                  className="flex justify-center items-center border-none bg-red-400 h-[18px] w-[18px] rounded-full last-of-type:mr-0"
                >
                  <StopCircle size="14" color="white" variant="Bulk" />
                </button>
                &nbsp; Record a comment
              </div>

              {showPopup ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="absolute w-full md:w-[60%] top-[6%] md:top-[10%]">
                      <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-center justify-between border-b py-2 px-2">
                          <h3 className="text-base text-gray-600 font-semibold">
                            Comment
                          </h3>
                          <button
                            className="ml-auto bg-transparent border-0 text-gray-800 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowPopup(false)}
                          >
                            <CloseSquare size="24" color="red" variant="Bold" />
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-3 flex-auto">
                          <form onSubmit={handleSubmit}>
                            <div className="py-4 px-4 bg-slate-100 rounded-md">
                              <div className="basis-auto w-full">
                                <input
                                  type="hidden"
                                  name="post_id"
                                  value={formData.post_id}
                                  onChange={handleInputChange}
                                  className="border-b border-solid border-t-0 border-r-0 border-l-0 border-b-gray-300 bg-transparent text-[1rem] text-gray-500 w-full"
                                />
                                <textarea
                                  id={`comment${props.postData.post.id}`}
                                  name="comment"
                                  value={formData.comment}
                                  onChange={handleInputChange}
                                  placeholder="Write a title for your comment here..."
                                  rows={5}
                                  className="focus-visible:outline-none border-b border-solid border-t-0 border-r-0 border-l-0 border-b-gray-300 bg-transparent text-[1rem] text-gray-500 w-full"
                                ></textarea>
                                {audioBlob ? (
                                  <TemporarySegmentV2
                                    audioUrl={URL.createObjectURL(audioBlob)}
                                  />
                                ) : (
                                  <></>
                                )}
                                {showNoCommentAudioError ? (
                                  <div className="text-sm text-red-500">
                                    {showNoCommentAudioError}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className="flex basis-[9rem] lg:basis-[6rem] justify-between mt-2">
                                <div className="flex items-end">
                                  {recording ? (
                                    <div className="flex flex-col justify-center items-center">
                                      <button
                                        onClick={
                                          recording
                                            ? stopRecording
                                            : startRecording
                                        }
                                        type="button"
                                        className="flex justify-center items-center border-none bg-red-400 h-[32px] w-[32px] rounded-full last-of-type:mr-0"
                                      >
                                        <StopCircle
                                          size="18"
                                          color="white"
                                          variant="Bulk"
                                        />
                                      </button>
                                      <span className="ml-1 mr-2 text-xs text-red-400">
                                        Recording
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col justify-center items-center">
                                      <button
                                        onClick={startRecording}
                                        type="button"
                                        className="flex justify-center items-center border-none bg-gray-400 h-[32px] w-[32px] rounded-full last-of-type:mr-0"
                                      >
                                        <Microphone
                                          size="18"
                                          color="white"
                                          variant="Bulk"
                                        />
                                      </button>
                                      <span className="ml-1 mr-2 text-xs text-gray-400">
                                        Record
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex flex-col justify-center items-center">
                                    <button
                                      type="button"
                                      className="flex justify-center items-center border-none bg-gray-400 h-[32px] w-[32px] rounded-full last-of-type:mr-0"
                                    >
                                      <DocumentUpload
                                        size="18"
                                        color="white"
                                        variant="Bulk"
                                      />
                                    </button>
                                    <span className="ml-1 mr-2 text-xs text-gray-400">
                                      Upload
                                    </span>
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  className="flex justify-center items-center border-none bg-blue-400 h-[32px] w-[32px] rounded-full mr-2 last-of-type:mr-0"
                                >
                                  <Send
                                    size="18"
                                    color="white"
                                    variant="TwoTone"
                                  />
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-70 fixed inset-0 z-40 bg-gray-800"></div>
                </>
              ) : null}

              <div className="md:hidden text-sm md:text-base text-gray-500 mb-1">
                <h4 className="font-medium inline-block md:block">
                  Genre<span className="md:hidden">:&nbsp;</span>
                </h4>
                {(props.postData.post.genres?.length ?? 0) > 0 ? (
                  props.postData.post.genres?.map((genre) => {
                    return (
                      <span
                        key={genre.id}
                        className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none"
                      >
                        {genre.title}
                      </span>
                    );
                  })
                ) : (
                  <>
                    <span className="text-sm text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                      N/A
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* popup */}
      {selectedPost ? (
        <>
          <PlayListPopUp
            postData={postData}
            onClose={() => {
              setSelectedPost(undefined);
            }}
          />
        </>
      ) : (
        <></>
      )}
      {selectedComment ? (
        <>
          <PlayListPopUp
            postData={commentData}
            onClose={() => {
              setSelectedComment(undefined);
            }}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SinglePost;
