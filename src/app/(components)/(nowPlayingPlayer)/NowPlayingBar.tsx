/* eslint-disable @next/next/no-img-element */
'use client';

import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { formatTime, subtractSeconds } from '@/core/utils/helpers';
import useStorage from '@/core/utils/useStorage';
import {
  playNext,
  playSong,
  // updateCurrentDuration,
  updateCurrentTime,
  updateCurrentTimeFlag,
  updateFlag,
  updateIsPlaying,
  updatePlaybackRate,
} from '@/modules/nowPlaying/nowPlayingReducer';
import { updateHomePage } from '@/modules/post/homePageReducer';
import { AnimatePresence, motion } from 'framer-motion';
import { Howl } from 'howler';
import { usePathname, useRouter } from 'next/navigation';
import { CaretRight, Pause, Play, SkipBack, SkipForward } from 'phosphor-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import MarqueeText from '../MarqueeText';
import useScrollDirection from '../useScrollDirection';

const NowPlayingBar = (props: PropsFromRedux) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useStorage('plays');
  const progressRef = useRef<any>(null);
  const audioRef = useRef<Howl | undefined>(undefined);
  const animationRef = useRef<number | undefined>();
  const hiddenElementRef = useRef<any>();
  const scrollDirection = useScrollDirection();
  const pathName = usePathname();
  const navigator = useRouter();
  const [showComponent, toggleShowComponent] = useState(false);
  const [showAction, setShowAction] = useState(false);
  // const currentDuration = useSelector(
  //   (state: RootState) =>
  //     state.nowPlaying.playlist[state.nowPlaying.currentPlaylistIndex]?.duration
  // );
  // const currentTime = useSelector(
  //   (state: RootState) => state.nowPlaying.currentTime
  // );
  // const audioPlayBackRate = useAppSelector(
  //   (state: RootState) => state.nowPlaying.audioPlayBackRate
  // );
  // const manualCurrentTimeUpdateFlag = useSelector(
  //   (state: RootState) => state.nowPlaying.manualCurrentTimeUpdateFlag
  // );
  // const isPlaying = useSelector(
  //   (state: RootState) => state.nowPlaying.isPlaying
  // );
  // const prevDuration = useSelector(
  //   (state: RootState) => state.nowPlaying.prevDuration
  // );
  // const playlist = useSelector(
  //   (state: RootState) => state.nowPlaying.playlist as NowPlayingAudioItem[]
  // );
  // const currentPlaylistIndex = useSelector(
  //   (state: RootState) => state.nowPlaying.currentPlaylistIndex as number
  // );
  // const flag = useSelector(
  //   (state: RootState) => state.nowPlaying.flag as boolean
  // );
  // const totalDuration = useAppSelector(
  //   (state: RootState) => state.nowPlaying.totalDuration as number | undefined
  // );

  useEffect(() => {
    if (props.currentPage == 2) {
      toggleShowComponent(true);
    }
  }, [pathName]);

  useEffect(() => {
    if (props.currentPage == 2 && !props.isPlaying) {
      toggleShowComponent(false);
    }
  }, []);

  useEffect(() => {
    if (props.currentPage == 2) {
      if (props.isPlaying) {
        toggleShowComponent(true);
      } else {
        toggleShowComponent(false);
      }
      return;
    }
    if (props.isPlaying) {
      toggleShowComponent(true);
    }
  }, [props.isPlaying]);

  useEffect(() => {
    if (props.currentPage == 2) return;
    if (!props.isPlaying) {
      toggleShowComponent(false);
    }
  }, [scrollDirection]);

  useEffect(() => {
    if (!props.flag) return;
    if (typeof window === 'undefined') return;
    if (audioRef.current) {
      audioRef.current?.pause();
    }
    if (props.playlist[props.currentPlaylistIndex] && props.currentTime == 0) {
      // var tempAudio = new Audio(props.playlist[props.currentPlaylistIndex].url);
      var tempAudio = new Howl({
        src: [props.playlist[props.currentPlaylistIndex].url],
        html5: true,
      });
      audioRef.current = tempAudio;
      audioRef.current.rate(props.audioPlayBackRate);
      dispatch(updateFlag(false));
    }
  }, [props.flag]);

  useEffect(() => {
    if (audioRef.current) {
      props.isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    }
  }, [props.isPlaying, props.flag]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.rate(props.audioPlayBackRate);
    }
  }, [props.audioPlayBackRate]);

  const getCurrentTime = () => {
    dispatch(updateCurrentTime(audioRef.current!.seek()));
    animationRef.current = requestAnimationFrame(getCurrentTime);
  };

  useEffect(() => {
    // audioRef.current?.addEventListener('loadedmetadata', () => {
    //   dispatch(updateCurrentDuration(audioRef.current?.duration ?? 0));
    // });
    audioRef.current?.on('end', () => {
      // Howler.unload();
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (props.playlist.length > props.currentPlaylistIndex + 1) {
        dispatch(
          playNext({
            playlistIndex: props.currentPlaylistIndex + 1,
          })
        );
        scrollWhenNext();
      } else {
        if (props.isPlaying) {
          dispatch(updateIsPlaying(false));
        }
      }
    });
    audioRef.current?.on('loaderror', () => {
      // Howler.unload();
    });
    audioRef.current?.on('unlock', () => {});
    audioRef.current?.on('playerror', () => {
      // Howler.unload();
      // audioRef.current?.stop();
      // audioRef.current?.play();
    });
    audioRef.current?.on('pause', () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // if (isPlaying) {
      //   dispatch(updateIsPlaying(false));
      // }
    });
    audioRef.current?.on('play', () => {
      // if (!isPlaying) {
      //   dispatch(updateIsPlaying(true));
      // }
      var audioId = props.playlist[props.currentPlaylistIndex]?.info?.cid
        ? props.playlist[props.currentPlaylistIndex]!.info!.cid
        : props.playlist[props.currentPlaylistIndex]?.info?.id;
      if (audioId) {
        var sessionValue = sessionStorage.getItem('plays');
        var plays =
          sessionValue != undefined
            ? (JSON.parse(sessionValue as string) as number[])
            : [];
        plays.push(audioId);
        if (setValue) {
          (setValue as Dispatch<SetStateAction<string | undefined>>)(
            JSON.stringify(plays).toString()
          );
        }
      }
      getCurrentTime();
    });
    return () => {
      // audioRef.current?.removeEventListener('ended', () => {});
      // audioRef.current?.removeEventListener('pause', () => {});
      // audioRef.current?.removeEventListener('play', () => {});
    };
  }, [audioRef.current]);

  useEffect(() => {
    progressRef.current.value = props.currentTime;
    progressRef.current.style.setProperty(
      '--range-progress',
      `${(progressRef.current.value / props.currentDuration) * 100}%`
    );
    if (audioRef.current && props.manualCurrentTimeUpdateFlag) {
      audioRef.current.seek(props.currentTime);
      dispatch(updateCurrentTimeFlag(false));
    }
  }, [
    props.currentTime,
    props.currentDuration,
    props.manualCurrentTimeUpdateFlag,
  ]);

  useEffect(() => {
    progressRef.current.max = props.currentDuration;
  }, [props.currentDuration]);

  const handlePrevious = async (e: any) => {
    if (props.currentPlaylistIndex - 1 >= 0) {
      dispatch(playNext({ playlistIndex: props.currentPlaylistIndex - 1 }));
      scrollWhenNext();
    }
    e.stopPropagation();
  };

  const handleNext = async (e: any) => {
    if (props.playlist.length > props.currentPlaylistIndex + 1) {
      dispatch(playNext({ playlistIndex: props.currentPlaylistIndex + 1 }));
      scrollWhenNext();
    }
    e.stopPropagation();
  };

  const scrollWhenNext = () => {
    if (
      props.playlist[props.currentPlaylistIndex].info &&
      props.playlist[props.currentPlaylistIndex]?.info?.id != undefined &&
      props.currentPage == 2
      // pathName?.startsWith(
      //   '/post/' + props.playlist[props.currentPlaylistIndex]?.info?.id
      // )
    ) {
      if (
        props.playlist[props.currentPlaylistIndex].info &&
        props.playlist[props.currentPlaylistIndex]?.info?.cid != undefined
      ) {
        const element = document.getElementById(
          'post-card-comment-id-' +
            props.playlist[props.currentPlaylistIndex]!.info!.cid
        );
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          });
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  };

  // <button
  //   onClick={handlePrevious}
  //   type="button"
  //   className="w-6 h-6 bg-whiteShade rounded-full hidden :flex justify-center items-center hover:opacity-90"
  // >
  //   <Previous
  //     size={15}
  //     variant="Bold"
  //     className={
  //       currentPlaylistIndex - 1 >= 0 ? 'text-dark-500' : 'text-slate-400'
  //     }
  //   />
  // </button>;

  // <button
  //   onClick={handleNext}
  //   type="button"
  //   className="w-6 h-6 bg-whiteShade rounded-full hidden :flex justify-center items-center hover:opacity-90"
  // >
  //   <Next
  //     size={15}
  //     variant="Bold"
  //     className={
  //       playlist.length > currentPlaylistIndex + 1
  //         ? 'text-dark-500'
  //         : 'text-slate-400'
  //     }
  //   />
  // </button>;

  // <div className="w-full bg-white sticky bottom-14 sm:bottom-0 z-50 border-0 border-gray-200 border-t">
  //     <div className="relative sm:container md:container lg:container mx-auto px-4">
  //       <div className="flex items-center justify-between gap-4 h-12">
  // <div className="w-max my-2 flex items-center gap-2">
  //   <button
  //     onClick={() => {
  //       if (isPlaying) {
  //         dispatch(updateIsPlaying(false));
  //       } else {
  //         if (playlist[currentPlaylistIndex]?.url && currentTime == 0) {
  //           dispatch(playSong(playlist[currentPlaylistIndex]));
  //         } else {
  //           dispatch(updateIsPlaying(true));
  //         }
  //       }
  //     }}
  //     type="button"
  //   >
  //     {isPlaying ? (
  //       <Pause size={20} className={`text-accent`} weight="fill" />
  //     ) : (
  //       <Play size={20} className={`text-accent`} weight="fill" />
  //     )}
  //   </button>
  // </div>

  // {playlist[currentPlaylistIndex]?.info ? (
  // <div className="flex items-center flex-1">
  //   <div className="w-9 h-9 rounded-full overflow-hidden mr-1">
  //     <img
  //       src="https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg"
  //       alt="cover-image"
  //       className="w-full h-full object-cover"
  //     />
  //   </div>
  //   <div className="w-40 sm:w-full overflow-hidden px-1">
  //     <h3 className="text-gray-900 font-bold capitalize text-xs truncate scroll">
  //       {playlist[currentPlaylistIndex]!.info!.title}
  //     </h3>
  //     <p className="text-gray-900 font-medium capitalize text-xs truncate">
  //       {playlist[currentPlaylistIndex]!.info!.description}
  //     </p>
  //   </div>
  // </div>
  // ) : null}

  // <div className="w-max text-xs font-bold text-primary-900">
  //   {currentDuration
  //     ? formatTime(
  //         currentDuration
  //           ? Math.round(currentDuration - currentTime)
  //           : 0
  //       )
  //     : '0:00'}
  // </div>

  // <input
  //   type="range"
  //   ref={progressRef}
  //   defaultValue={0}
  //   className="global-player absolute top-0 left-0 w-full"
  //   step=".1"
  //   style={{
  //     background: `linear-gradient(to right, #f49d65 0%, #f49d65 ${
  //       Math.round((currentTime / currentDuration) * 10000) / 100
  //     }%, white ${
  //       Math.round((currentTime / currentDuration) * 10000) / 100
  //     }%, white 100%)`,
  //     animation: 'progress-bar .1s linear forwards',
  //   }}
  // />
  //       </div>
  //     </div>
  //   </div>

  const handleClickScroll = () => {
    if (props.currentPage == 1) {
      if (
        props.playlist[props.currentPlaylistIndex].info &&
        props.playlist[props.currentPlaylistIndex]?.info?.id != undefined &&
        props.playlist[props.currentPlaylistIndex]?.info?.cid != undefined
      ) {
        dispatch(
          updateHomePage({
            page: 2,
            id: props.playlist[props.currentPlaylistIndex]?.info?.id,
          })
        );
        // navigator.push(
        //   `/post/${props.playlist[props.currentPlaylistIndex]?.info?.id}`
        // );
      } else if (
        props.playlist[props.currentPlaylistIndex].info &&
        props.playlist[props.currentPlaylistIndex]?.info?.id != undefined
      ) {
        const element = document.getElementById(
          'post-card-with-id-' +
            props.playlist[props.currentPlaylistIndex]!.info!.id
        );
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          });
        }
      } else {
        return false;
      }
    } else if (
      props.playlist[props.currentPlaylistIndex].info &&
      props.playlist[props.currentPlaylistIndex]?.info?.id != undefined &&
      props.homePagePostId ==
        props.playlist[props.currentPlaylistIndex]?.info?.id
      // pathName?.startsWith(
      //   '/post/' + props.playlist[props.currentPlaylistIndex]?.info?.id
      // )
    ) {
      if (
        props.playlist[props.currentPlaylistIndex].info &&
        props.playlist[props.currentPlaylistIndex]?.info?.cid != undefined
      ) {
        const element = document.getElementById(
          'post-card-comment-id-' +
            props.playlist[props.currentPlaylistIndex]!.info!.cid
        );
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          });
        }
      } else {
        const scrollableDiv = document.getElementById('detailScroller');
        if (scrollableDiv) {
          scrollableDiv.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
        // window.scrollTo({
        //   top: 0,
        //   behavior: 'smooth',
        // });
      }
    } else {
      if (
        props.playlist[props.currentPlaylistIndex].info &&
        props.playlist[props.currentPlaylistIndex]?.info?.id != undefined
      ) {
        dispatch(
          updateHomePage({
            page: 2,
            id: props.playlist[props.currentPlaylistIndex]?.info?.id,
          })
        );
        // navigator.push(
        //   `/post/${props.playlist[props.currentPlaylistIndex]?.info?.id}`
        // );
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    let timeoutId: any;
    if (showAction) {
      // Set a timeout to automatically hide the element after 5 seconds
      timeoutId = setTimeout(() => {
        setShowAction(!showAction);
      }, 5000);
    }

    // Clean up the timeout when the component unmounts or when the isVisible state changes to false
    return () => clearTimeout(timeoutId);
  }, [showAction]);

  useEffect(() => {
    // Function to handle click events outside the element
    function handleClickOutside(event: any) {
      if (
        hiddenElementRef.current &&
        !hiddenElementRef.current.contains(event.target)
      ) {
        setShowAction(false);
      }
    }

    // Bind the event listener
    document.addEventListener('click', handleClickOutside);

    // Unbind the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const dropIn = {
    hidden: {
      y: '200vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 40,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <div
        className={`bg-white container mx-auto fixed transition-all duration-150 ease-in-out z-40 border-0 border-b border-gray-200 ${
          showComponent ? '' : 'hidden'
        } ${
          scrollDirection === 'down' && props.currentPage == 1
            ? 'bottom-0'
            : props.currentPage == 1
            ? 'bottom-[3.5rem]'
            : 'bottom-[3.2rem]'
        }`}
      >
        {props.playlist[props.currentPlaylistIndex]?.info ? (
          <motion.div
            className="relative"
            onClick={() => setShowAction(!showAction)}
            ref={hiddenElementRef}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {showAction ? (
              <motion.div
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center justify-between px-4 h-12 border-0 border-b border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 overflow-hidden cursor-pointer">
                    <img
                      src="/images/cover.webp"
                      alt="Cover Album"
                      width={100}
                      height={100}
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                  <div className="w-40">
                    <MarqueeText
                      className="text-gray-900 font-bold capitalize text-xs"
                      text={
                        props.playlist[props.currentPlaylistIndex]!.info!.title
                      }
                    />
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 font-medium capitalize text-xs">
                        {
                          props.playlist[props.currentPlaylistIndex]!.info!
                            .description
                        }
                      </p>
                    </div>
                  </div>
                </div>
                {props.playlist[props.currentPlaylistIndex].info?.id ==
                props.homePagePostId ? null : (
                  <div
                    className="flex items-center gap-1 text-xs text-gray-900 text-medium cursor-pointer"
                    onClick={handleClickScroll}
                  >
                    Go to posts
                    <CaretRight size={15} weight="light" />
                  </div>
                )}
              </motion.div>
            ) : null}
            <div className="flex items-center justify-between gap-4 px-4 h-12">
              <div className="flex basis-[80%] items-center gap-2">
                <div className="flex items-center gap-2">
                  {showAction ? (
                    <button
                      onClick={handlePrevious}
                      type="button"
                      className="w-6 h-6 bg-whiteShade rounded-full flex justify-center items-center hover:opacity-90"
                    >
                      <SkipBack
                        size={15}
                        weight="light"
                        className={
                          props.currentPlaylistIndex - 1 >= 0
                            ? 'text-dark-500'
                            : 'text-slate-400'
                        }
                      />
                    </button>
                  ) : null}
                  <button
                    onClick={(e) => {
                      if (props.isPlaying) {
                        dispatch(updateIsPlaying(false));
                      } else {
                        if (
                          props.playlist[props.currentPlaylistIndex]?.url &&
                          props.currentTime == 0
                        ) {
                          dispatch(
                            playSong(props.playlist[props.currentPlaylistIndex])
                          );
                        } else {
                          dispatch(updateIsPlaying(true));
                        }
                      }
                      e.stopPropagation();
                    }}
                    type="button"
                    className="border border-gray-300 rounded-full p-1"
                  >
                    {props.isPlaying ? (
                      <Pause size={20} className={`black`} weight="fill" />
                    ) : (
                      <Play size={20} className={`black`} weight="fill" />
                    )}
                  </button>
                  {showAction ? (
                    <button
                      onClick={handleNext}
                      type="button"
                      className="w-6 h-6 bg-whiteShade rounded-full flex justify-center items-center hover:opacity-90"
                    >
                      <SkipForward
                        size={15}
                        weight="light"
                        className={
                          props.playlist.length > props.currentPlaylistIndex + 1
                            ? 'text-dark-500'
                            : 'text-slate-400'
                        }
                      />
                    </button>
                  ) : null}
                  {showAction ? (
                    <div
                      className="text-sm px-4 py-1 bg-grey-200 rounded-full cursor-pointer"
                      onClick={(e) => {
                        if (props.audioPlayBackRate == 2) {
                          dispatch(updatePlaybackRate(1));
                        } else {
                          dispatch(updatePlaybackRate(2));
                        }
                        e.stopPropagation();
                      }}
                    >
                      {props.audioPlayBackRate}X
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className={`w-full h-12 relative flex-col justify-center ${
                    showAction ? 'hidden' : 'flex'
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-full z-50"
                    onClick={(e) => {
                      setShowAction(!showAction);
                      e.stopPropagation();
                    }}
                  ></div>
                  <MarqueeText
                    className="text-gray-900 font-bold capitalize text-xs"
                    text={
                      props.playlist[props.currentPlaylistIndex]!.info!.title
                    }
                  />
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 font-medium capitalize text-xs">
                      {
                        props.playlist[props.currentPlaylistIndex]!.info!
                          .description
                      }
                    </p>
                  </div>
                </div>
              </div>
              {props.totalDuration ? (
                <div className="flex flex-col items-center">
                  <p
                    className="w-max text-xs font-bold text-accentRed cursor-pointer"
                    title="Now Playing"
                  >
                    {props.currentDuration
                      ? formatTime(
                          props.currentDuration
                            ? Math.round(
                                props.currentDuration - props.currentTime
                              )
                            : 0
                        )
                      : '00:00'}
                  </p>
                  <p
                    className="w-max text-xs font-bold text-primary-900 cursor-pointer"
                    title="Playlist Duration"
                  >
                    {props.totalDuration
                      ? formatTime(
                          props.totalDuration
                            ? Math.round(
                                props.totalDuration -
                                  (props.currentTime +
                                    (props.prevDuration ?? 0)) <
                                  0
                                  ? 0
                                  : props.totalDuration -
                                      (props.currentTime +
                                        (props.prevDuration ?? 0))
                              )
                            : 0
                        )
                      : '00:00'}
                  </p>
                </div>
              ) : (
                <p className="w-max text-xs font-bold text-primary-900">
                  {props.currentDuration
                    ? formatTime(
                        props.currentDuration
                          ? subtractSeconds(
                              props.currentDuration,
                              props.currentTime
                            )
                          : 0
                      )
                    : '00:00'}
                </p>
              )}
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${
                    Math.round(
                      ((props.currentTime +
                        (props.totalDuration ? props.prevDuration ?? 0 : 0)) /
                        (props.totalDuration ?? props.currentDuration)) *
                        10000
                    ) / 100
                  }%`,
                }}
              />
            </div>
          </motion.div>
        ) : (
          <div></div>
          // <div className="border-y border-y-grey-200 px-4 flex items-center gap-2 h-12">
          //   <Play size="20" className="text-primary-900" weight="fill" />
          //   <div className="text-sm">Play all (2.57 minutes)</div>
          // </div>
        )}

        <input
          type="range"
          ref={progressRef}
          defaultValue={0}
          className="global-player absolute top-0 left-0 w-full hidden"
        />
      </div>
    </AnimatePresence>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isPlaying: state.nowPlaying.isPlaying,
    playlist: state.nowPlaying.playlist,
    currentPlaylistIndex: state.nowPlaying.currentPlaylistIndex,
    currentDuration:
      state.nowPlaying.playlist[state.nowPlaying.currentPlaylistIndex]
        ?.duration,
    currentTime: state.nowPlaying.currentTime,
    audioPlayBackRate: state.nowPlaying.audioPlayBackRate,
    manualCurrentTimeUpdateFlag: state.nowPlaying.manualCurrentTimeUpdateFlag,
    prevDuration: state.nowPlaying.prevDuration,
    flag: state.nowPlaying.flag,
    totalDuration: state.nowPlaying.totalDuration,
    currentPage: state.homepage.currentPage,
    homePagePostId: state.homepage.homePagePostId,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NowPlayingBar);
