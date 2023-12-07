/* eslint-disable @next/next/no-img-element */
import { PostDetailType } from '@/modules/post/postType';
import { useRouter } from 'next/navigation';
import PlayAllButton from './PlayAllButton';
import PostDetailV4 from './PostDetailV4';

import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
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
import classNames from 'classnames';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { Microphone, StopCircle, UploadSimple } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { ZodError } from 'zod';
import PlayPauseWithWave from '../(home)/postCreate/PlayPauseWithWave';
import PostCommentV4 from './PostCommentV4';
interface PostCardProps extends PropsFromRedux {
  post: PostDetailType;
}

const PostCardV4 = (props: PostCardProps) => {
  moment.relativeTimeThreshold('s', 60);
  const navigator = useRouter();
  const dispatch = useAppDispatch();
  //recorded audio datas
  const [hiddenButton, setHiddenButton] = useState<
    'upload' | 'record' | undefined
  >(undefined);
  const [wavePlayerVisible, toggleWavePlayerVisible] = useState(false);
  const recordedAudio = useRef<any>(null);
  const [recordTime, setRecordTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<any>(null);
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
  const [recording, setRecording] = useState(false);
  const waveRef = useRef<any>(null);
  const record = useRef<any>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioWaveData, setAudioWaveData] = useState<any>([0, 1, 0.5, -0.3]);

  const handlePlayPauseAllComments = async () => {
    if (
      props.playlistId &&
      props.post?.id &&
      props.playlistId == props.post.id.toString()
    ) {
      if (props.isPlaying) {
        props.updateIsPlaying(false);
      } else {
        props.updateIsPlaying(true);
      }
      return;
    }
    var comments = await Promise.resolve(
      dispatch(
        commentApi.endpoints.getAllCommentsForAudio.initiate({
          postId: props.post.id!,
          page: 10,
        })
      )
    );

    if (comments.data) {
      var commentAudios = (comments.data! as CommentDetailType[]).map(
        (comment) => {
          return {
            url:
              apiPaths.baseUrl +
              '/socialnetwork/audio/stream/' +
              comment.audio.id +
              '?isPostAudio=NO'!,
            duration: comment.audio.file_duration
              ? parseFloat(comment.audio.file_duration)
              : 0,
            info: {
              title: comment.comment,
              description: comment.owner.name,
              cid: comment.id,
              id: props.post.id,
            },
          };
        }
      );
      props.addNewPlaylist({
        id: props.post.id?.toString(),
        playlist: [
          {
            url:
              apiPaths.baseUrl +
              '/socialnetwork/audio/stream/' +
              props.post.audio?.id +
              '?isPostAudio=YES',
            duration: props.post.audio.file_duration
              ? parseFloat(props.post.audio.file_duration)
              : 0,
            info: {
              title: props.post.title,
              description: props.post.owner.name,
              id: props.post.id,
            },
          },
          ...commentAudios,
        ],
        totalDuration: props.post.total_duration,
      });
    }
  };

  const list = {
    inActive: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 1 },
        y: { ease: 'easeInOut', duration: 0.6 },
      },
    },
    active: {
      opacity: 0,
      y: 30,
      transition: {
        opacity: { duration: 1 },
        y: { ease: 'easeInOut', duration: 0.6 },
      },
    },
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
    setIsPlaying(false);
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
          setIsPlaying(false);
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
    try {
      const responseData = await Promise.resolve(
        dispatch(
          commentApi.endpoints.addComment.initiate({
            post_id: 1,
            file: audioFile!,
            file_duration: (audioDuration as number) / 1000,
            wave_data: audioWaveData,
          })
        )
      );
      if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
        await dispatch(
          postApi.endpoints.getPostList.initiate(0, { forceRefetch: true })
        );
        navigator.push('/');
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
      file_duration: (audioDuration as number) / 1000,
      wave_data: audioWaveData,
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.on('timeupdate', (currentTime: number) => {
      const getRemainaingTime = recordTime - currentTime * 1000;
      setRecordTime(getRemainaingTime);
      console.log(recordTime);
    });
  }, [audioRef.current]);

  useEffect(() => {
    let interval: any;
    if (recording) {
      interval = setInterval(() => {
        setRecordTime((prevTime) => prevTime + 100);
      }, 100);
    } else if (!recording) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={list}
        initial="active"
        animate="inActive"
        className="max-w-3xl w-full shadow-slate-200 shadow-md"
        // style={randomNumber}
        id={`post-card-with-id-${props.post.id}`}
      >
        <PostDetailV4
          post={props.post}
          onWhiteSpaceClick={() => {
            dispatch(updateHomePage({ page: 2, id: props.post.id }));
            // navigator.push(`/post/${props.post.id}`);
          }}
        />
        {props.post.comments && props.post.comments.length > 0 ? (
          <PostCommentV4
            commentData={props.post.comments[0]}
            postId={props.post.id!}
          />
        ) : null}
        {props.post.comments && props.post.comments.length > 0 ? (
          <PlayAllButton
            totalComment={props.post.total_comments}
            totalTime={secondsToString(props.post.total_duration)}
            postId={props.post.id}
            onClick={() => {
              handlePlayPauseAllComments();
            }}
          />
        ) : null}
        <div className="p-4 bg-white flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <Image
              width={100}
              height={100}
              src="/profile-pic.jpg"
              alt="profile-image"
              className="w-full h-full aspect-auto object-cover"
            />
          </div>
          {/* <div className="bg-grey-200 h-11 py-1 text-sm text-primary-500 rounded-sm flex-1 flex gap-2 items-center p-2">
            <span className="grow">Record or upload audio</span>
            <span className="bg-white inline-block p-2 rounded-full hover:cursor-pointer hover:shadow-md shadow-red-200">
              <Microphone size={18} weight="light" />
            </span>
            <span className="bg-white inline-block p-2 rounded-full hover:cursor-pointer hover:shadow-md shadow-red-200">
              <UploadSimple size={18} weight="light" />
            </span>
          </div> */}

          <div className="text-gray-500 flex gap-2 px-3 py-2 w-full items-center rounded-md bg-gray-200 ">
            <span className="grow text-slate-400">
              {!wavePlayerVisible && <>Record or Upload Audio</>}
              <PlayPauseWithWave
                audio={recordedAudio}
                audioTime={recordTime}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                wavePlayerVisible={wavePlayerVisible}
              />
            </span>
            <button
              className={classNames(
                'rounded-full bg-white p-2 hover:shadow-md shadow-gray-200',
                hiddenButton === 'record' ? 'hidden' : 'block'
              )}
              onClick={recording ? stopTheRecording : startNewRecording}
            >
              {recording ? <StopCircle size={18} /> : <Microphone size={18} />}
            </button>

            <label
              className={classNames(
                'rounded-full bg-white p-2 mb-0 hover:shadow-md shadow-gray-200',
                hiddenButton === 'upload' ? 'hidden' : 'block'
              )}
              htmlFor="audioUpload"
            >
              <UploadSimple size={18} />
              <input
                hidden
                id="audioUpload"
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange(e)}
              />
            </label>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isPlaying: state.nowPlaying.isPlaying,
    playlistId: state.nowPlaying.playlistId,
  };
};

const mapDispatchToProps = {
  updateIsPlaying,
  addNewPlaylist,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PostCardV4);
