'use client';

import PostCommentSkeleton from '@/app/(components)/(skeletons)/PostCommentSkeleton';
import PostLoadingSkeleton from '@/app/(components)/(skeletons)/PostLoadingSkeleton';
import PlayAllButton from '@/app/(components)/PlayAllButton';
import PostCommentV4 from '@/app/(components)/PostCommentV4';
import PostDetailV4 from '@/app/(components)/PostDetailV4';
import { apiPaths } from '@/core/api/apiConstants';
import { defaultWaveData } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import commentApi from '@/modules/comment/commentApi';
import {
  CommentDetailType,
  CommentFormType,
} from '@/modules/comment/commentType';
import {
  addNewPlaylist,
  updateIsPlaying,
} from '@/modules/nowPlaying/nowPlayingReducer';
import { updateHomePage } from '@/modules/post/homePageReducer';
import postApi from '@/modules/post/postApi';
import { PostDetailType, PostEachDetailType } from '@/modules/post/postType';
import classNames from 'classnames';
import { useFormik } from 'formik';
import Image from 'next/image';
import {
  CaretLeft,
  Microphone,
  PaperPlaneRight,
  StopCircle,
  UploadSimple,
  X,
} from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { ZodError } from 'zod';
import PlayPauseWithWave from '../postCreate/PlayPauseWithWave';

export default function PostDetailComponent({
  params,
}: {
  params?: { id: number };
}) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(8);
  const [hasMoreData, setHasMoreData] = useState(true);
  const incrementBy = 8;
  const [cachedPostData, setCachePostData] = useState<
    PostDetailType | undefined
  >(undefined);
  //recorded audio datas
  const [hiddenButton, setHiddenButton] = useState<
    'upload' | 'record' | undefined
  >(undefined);
  const [wavePlayerVisible, toggleWavePlayerVisible] = useState(false);
  const recordedAudio = useRef<any>(null);
  const [recordTime, setRecordTime] = useState(0);
  const [isPlayingComment, setIsPlayingComment] = useState(false);
  const audioRef = useRef<any>(null);
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
  const [recording, setRecording] = useState(false);
  const waveRef = useRef<any>(null);
  const record = useRef<any>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioWaveData, setAudioWaveData] = useState<any>(defaultWaveData);

  const playlistId = useAppSelector(
    (state: RootState) => state.nowPlaying.playlistId
  );
  const isPlaying = useAppSelector(
    (state: RootState) => state.nowPlaying.isPlaying
  );
  const postListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries.feedListing
        ?.data as PaginatedResponseType<PostDetailType>
  );

  useEffect(() => {
    if (!params) return;
    const tempPostQuery = postListData?.data.filter(
      (post) => post.id == params.id
    );
    if (!tempPostQuery || tempPostQuery.length <= 0) {
      dispatch(postApi.endpoints.getPost.initiate(params.id));
    } else {
      setCachePostData(tempPostQuery[0]);
    }
  }, [dispatch, params?.id, postListData]);

  const postDetailData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPost("${params?.id}")`]
        ?.data as PostEachDetailType
  );

  useEffect(() => {
    if (postDetailData) {
      setCachePostData(postDetailData.post);
    }
  }, [postDetailData]);

  useEffect(() => {
    if (!params) return;
    const fetchData = async () => {
      setIsLoading(true);

      const response = await dispatch(
        commentApi.endpoints.getAllComments.initiate({
          postId: params.id,
          page: currentPage,
        })
      );
      setIsLoading(false); // Set isLoading to false after the request is completed

      if (response.data) {
        if (
          response.data!.pagination.currentPage >=
          response.data!.pagination.totalPages
        ) {
          setHasMoreData(false);
        }
      }
    };

    if (hasMoreData) {
      // console.log('has more');

      fetchData();
    }
  }, [dispatch, currentPage, hasMoreData, params?.id]);

  useEffect(() => {
    const scrollableDiv = document.getElementById('detailScroller');
    if (scrollableDiv) {
      scrollableDiv.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setHasMoreData(true);
  }, [params?.id]);

  const commentList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getAllComments-${params?.id}`]
        ?.data as PaginatedResponseType<CommentDetailType>
  );

  const handleScroll = useCallback(() => {
    const scrollableDiv = document.getElementById('detailScroller');
    if (scrollableDiv) {
      if (
        scrollableDiv.scrollHeight - scrollableDiv.scrollTop <=
          scrollableDiv.clientHeight + 200 &&
        !isLoading &&
        hasMoreData
      ) {
        setIsLoading(true);
        setCurrentPage(currentPage + incrementBy);
      }
    }
  }, [isLoading, hasMoreData, currentPage]);

  useEffect(() => {
    const scrollableDiv = document.getElementById('detailScroller');
    if (scrollableDiv) {
      scrollableDiv.addEventListener('scroll', handleScroll);

      return () => {
        scrollableDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const handlePlayPauseAllComments = async () => {
    if (
      playlistId &&
      cachedPostData?.id &&
      playlistId == cachedPostData.id.toString()
    ) {
      if (isPlaying) {
        dispatch(updateIsPlaying(false));
      } else {
        dispatch(updateIsPlaying(true));
      }
      return;
    }

    if (commentList) {
      var commentAudios = (
        commentList as PaginatedResponseType<CommentDetailType>
      ).data.map((comment) => {
        return {
          url:
            apiPaths.baseUrl +
            '/socialnetwork/audio/stream/' +
            comment.audio.id! +
            '?isPostAudio=NO',
          duration: comment.audio.file_duration
            ? parseFloat(comment.audio.file_duration)
            : 0,
          info: {
            title: comment.comment ?? comment.owner.name,
            description: comment.owner.name ?? '',
            id: cachedPostData?.id,
            cid: comment.id,
          },
        };
      });
      if (cachedPostData) {
        dispatch(
          addNewPlaylist({
            id: cachedPostData.id?.toString(),
            playlist: [
              {
                url:
                  apiPaths.baseUrl +
                  '/socialnetwork/audio/stream/' +
                  cachedPostData.audio?.id +
                  '?isPostAudio=YES',
                duration: cachedPostData.audio.file_duration
                  ? parseFloat(cachedPostData.audio.file_duration)
                  : 0,
                info: {
                  title: cachedPostData.title,
                  description: cachedPostData.owner.name,
                  id: cachedPostData.id,
                },
              },
              ...commentAudios,
            ],
            totalDuration: cachedPostData.total_duration,
          })
        );
      }
    }
  };

  function secondsToString(seconds: number) {
    var round = Math.round(seconds);
    var numMinutes = Math.floor((((round % 31536000) % 86400) % 3600) / 60);
    var numSeconds = (((round % 31536000) % 86400) % 3600) % 60;
    return numMinutes + `.${numSeconds}` + ' minutes';
  }

  const startNewRecording = async () => {
    setHiddenButton('upload');
    toggleWavePlayerVisible(true);
    if (audioRef.current) {
      audioRef.current.destroy();
    }
    setIsPlayingComment(false);
    setAudioFile(undefined);
    setRecording(true);
    setRecordTime(0);
    const recordInitiate = () => {
      waveRef.current = WaveSurfer.create({
        container: recordedAudio?.current,
        waveColor: '#000000',
        progressColor: '#B00000',
        barWidth: 3,
        height: 45,
        barRadius: 2,
      });
      record.current = waveRef.current.registerPlugin(RecordPlugin.create());

      record.current.startRecording();

      // When we click on stop record button this function would be run.
      record.current.on('record-end', (blob: Blob) => {
        const recordedUrl = URL.createObjectURL(blob);
        // Create wavesurfer from the recorded audio
        audioRef.current = WaveSurfer.create({
          container: recordedAudio.current,
          waveColor: '#000000',
          progressColor: '#B00000',
          url: recordedUrl,
          barWidth: 3,
          height: 45,
          barRadius: 2,
        });

        audioRef.current.on('finish', () => {
          audioRef.current.setTime(0);
          setIsPlayingComment(false);
        });

        const file = new File([blob], 'audio.wav');
        setAudioFile(file);
        formik.setFieldValue('audioFile', audioFile);
        setRecording(false);
      });
    };
    recordInitiate();
  };

  const stopTheRecording = () => {
    if (waveRef.current) {
      waveRef.current.on('decode', () => {
        const getAudioDuration = waveRef.current.getDuration();
        setRecordTime(getAudioDuration * 1000);
        setAudioDuration(recordTime);
        console.log(waveRef.current.exportPeaks()[0]);
        setAudioWaveData?.(waveRef.current.exportPeaks()[0]);
        // setShouldNext(true);
      });
      waveRef.current.destroy();
    }
    if (record.current) {
      record.current.stopRecording();
      record.current.destroy();
    }
    // setShouldNext(true);
    // console.log(shouldNext);
  };

  const handleFileChange = (e: any) => {
    setHiddenButton('record');
    toggleWavePlayerVisible(true);
    if (audioRef.current != null) {
      audioRef.current.destroy();
      audioRef.current = null;
    }

    const file = e.target.files[0];
    let audioElement: any;

    if (file) {
      setAudioFile(undefined);
      audioElement = new Audio();
      audioElement.src = URL.createObjectURL(file);
      audioElement.load();
    }

    audioRef.current = WaveSurfer.create({
      container: recordedAudio.current,
      waveColor: '#000000',
      progressColor: '#B00000',
      url: audioElement.src,
      barWidth: 3,
      height: 45,
      barRadius: 2,
    });

    setAudioFile(file);

    // setIsNextUploadVisible(true);
    // setShouldNext(true);
  };

  const validateForm = () => {
    try {
      // postFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const onSubmit = async (data: CommentFormType) => {
    // setIsLoading(true);
    // console.log(audioFile);
    try {
      const responseData = await Promise.resolve(
        dispatch(
          commentApi.endpoints.addComment.initiate({
            post_id: data.post_id,
            file: data.file,
            wave_data: data.wave_data,
          })
        )
      );
      if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
        const responseData = await dispatch(
          postApi.endpoints.getPost.initiate(1)
        );
        console.log(responseData);

        // navigator.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik<CommentFormType>({
    enableReinitialize: true,
    initialValues: {
      post_id: 1,
      file: audioFile!,
      wave_data: JSON.stringify(audioWaveData),
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  const handleCancelAudio = () => {
    toggleWavePlayerVisible(false);
    audioRef.current.destroy();
    setHiddenButton(undefined);
    setAudioFile(undefined);
  };

  return (
    <div className="w-full flex flex-col items-center max-full h-full">
      {cachedPostData ? (
        <>
          <div
            className="max-w-3xl w-full shadow-s flex flex-col h-full max-full relative flex-1 overflow-y-scroll"
            id="detailScroller"
          >
            <div
              className="flex items-center sticky bg-dark-500 text-white h-12 top-0 z-50"
              onClick={() => {
                dispatch(updateHomePage({ page: 1 }));
              }}
            >
              <div
                // href="/"
                className="h-12 flex items-center justify-center w-12"
              >
                <CaretLeft size="20" weight="bold" className="cursor-pointer" />
              </div>
              <h3 className="text-base text-white flex-1 font-medium line-clamp-1">
                {cachedPostData.title}
              </h3>
            </div>
            <PostDetailV4 post={cachedPostData} descriptionEllipsis={false} />

            <div
              className={`${
                commentList && commentList.data.length > 2
                  ? ' bg-white flex-1'
                  : 'bg-white flex-1'
              }`}
            >
              {commentList ? (
                commentList && commentList.data.length > 0 ? (
                  commentList.data.map((comment, index) => (
                    <PostCommentV4
                      key={index}
                      commentData={comment}
                      postId={cachedPostData.id!}
                    />
                  ))
                ) : null
              ) : (
                <PostCommentSkeleton />
              )}
            </div>
          </div>
          <div className="max-w-3xl mx-auto w-full flex flex-col bg-white z-50">
            {commentList && commentList.data.length > 0 ? (
              <PlayAllButton
                totalComment={cachedPostData.total_comments}
                totalTime={secondsToString(cachedPostData.total_duration)}
                onClick={() => {
                  handlePlayPauseAllComments();
                }}
              />
            ) : null}

            <div className="px-4 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  src="/profile-pic.jpg"
                  alt="profile-image"
                  className="w-full h-full aspect-auto object-cover"
                />
              </div>
              <form
                className="w-full"
                onSubmit={(event) => {
                  event.preventDefault();
                  formik.handleSubmit(event);
                }}
              >
                <div className="text-gray-500 flex gap-2 px-3 py-2 w-full items-center rounded-md bg-gray-200 ">
                  <span className="grow text-slate-500 text-sm">
                    {!wavePlayerVisible && <>Record or Upload Audio</>}
                    <PlayPauseWithWave
                      audio={recordedAudio}
                      audioTime={recordTime}
                      isPlaying={isPlayingComment}
                      setIsPlaying={setIsPlayingComment}
                      audioRef={audioRef}
                      wavePlayerVisible={wavePlayerVisible}
                      theme="light"
                    />
                  </span>

                  <input
                    hidden
                    id="audioUpload"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileChange(e)}
                  />
                  {wavePlayerVisible && !recording ? (
                    <>
                      <div className="rounded-full bg-white p-2 hover:shadow-md shadow-gray-200">
                        <X
                          size={18}
                          role="button"
                          type="button"
                          onClick={handleCancelAudio}
                          className="text-accent"
                        />
                      </div>

                      <button
                        className="rounded-full bg-white p-2 hover:shadow-md shadow-gray-200"
                        type="submit"
                      >
                        <PaperPlaneRight size={18} weight="fill" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={classNames(
                          'rounded-full bg-white p-2 hover:shadow-md shadow-gray-200',
                          hiddenButton === 'record' ? 'hidden' : 'block'
                        )}
                        onClick={
                          recording ? stopTheRecording : startNewRecording
                        }
                      >
                        {recording ? (
                          <StopCircle size={18} />
                        ) : (
                          <Microphone size={18} />
                        )}
                      </button>

                      <div
                        className={classNames(
                          'rounded-full bg-white p-2 hover:shadow-md shadow-gray-200',
                          hiddenButton === 'upload' ? 'hidden' : 'block'
                        )}
                      >
                        {!wavePlayerVisible ? (
                          <label htmlFor="audioUpload" className="mb-0">
                            <UploadSimple size={18} />
                          </label>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <PostLoadingSkeleton />
      )}
    </div>
  );
}
