import { apiPaths } from '@/core/api/apiConstants';
import { MyStoryDetailType } from '@/modules/story/storyType';
import { CloseCircle } from 'iconsax-react';
import { useState } from 'react';
import WavePlayer from '../WavePlayer';

interface MyStoryViewProps {
  story: MyStoryDetailType[];
  onClose?: () => void;
}
/* eslint-disable @next/next/no-img-element */
const ViewMyStoryCarouselV2 = (props: MyStoryViewProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDuration, setSlideDuration] = useState(3000);
  // const [progressBarWidth, setProgressBarWidth] = useState('0px');

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % props.story.length);
    setSlideDuration(slideDuration);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + props.story.length) % props.story.length
    );
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentSlide(slideIndex);
  };

  const handleAudioDuration = (duration: number) => {
    setSlideDuration(duration);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute w-screen h-screen md:w-[35%] top-0 bg-white z-[50]">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 transform"
                style={{
                  width: `${props.story.length}00%`,
                  transform: `translateX(-${
                    currentSlide * (100 / props.story.length)
                  }%)`,
                }}
              >
                {props.story.map((story) => (
                  <div key={story.id} className="w-full">
                    <div className="relative flex flex-col h-screen">
                      <div className="relative flex justify-between items-center py-4 px-4 md:px-8 z-50">
                        <a href={`/profile/1`}>
                          <div className="flex items-center gap-2">
                            <div className="w-max h-max shadow-2xl rounded-full">
                              <div className="w-9 h-9 rounded-full overflow-hidden">
                                <img
                                  src="/images/avatar.jpg"
                                  alt="post_owner_avatar"
                                  onError={(e) => {
                                    (e.target as any).onError = null;
                                    (e.target as any).src =
                                      '/images/avatar.jpg';
                                  }}
                                  className="w-[100%] h-[100%] object-cover"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col justify-center">
                              <div className="text-sm md:text-lg font-medium text-dark-500 flex items-center">
                                {story.owner.name}
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
                        <button
                          className="ml-auto bg-transparent border-0 text-gray-800 float-right text-3xl leading-none font-semibold outline-none focus:outline-none relative z-50"
                          onClick={props.onClose}
                        >
                          <CloseCircle
                            size="33"
                            color="gray"
                            variant="Outline"
                          />
                        </button>
                        <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
                      </div>
                      <div className="mt-32 px-4 md:px-8">
                        <div className="relative">
                          <h3 className="text-xl text-gray-700 font-bold">
                            {story.title}
                          </h3>
                          <p className="text-base text-gray-700 py-5 tracking-wide font-light">
                            {story.description}
                          </p>
                          <div className="relative flex flex-col justify-center basis-[calc(100%-35px)] w-full pt-2 pb-16 my-1 z-50">
                            {story.audio.id && (
                              <WavePlayer
                                audioItem={{
                                  url:
                                    apiPaths.baseUrl +
                                    '/socialnetwork/audio/stream/' +
                                    story.audio?.id,
                                  duration: story.audio.file_duration
                                    ? parseFloat(story.audio.file_duration)
                                    : 0,
                                  info: {
                                    title: story.title,
                                    description: story.owner.name,
                                  },
                                }}
                                audioWaveData={story.audio.wave_data}
                              />
                              // <TemporarySegmentV3
                              //   audioUrl={
                              //     apiPaths.baseUrl +
                              //     '/socialnetwork/audio/stream/' +
                              //     story.audio.id
                              //   }
                              //   onDuration={handleAudioDuration}
                              //   autoplay
                              //   // onProgressBarWidth={handleProgressBar}
                              // />
                            )}
                          </div>
                          <div className="divider absolute bottom-0 right-0 left-0 bg-slate-300 h-[1px]"></div>
                        </div>

                        <div className="text-base text-gray-500 mb-4 text-center py-5">
                          <h4 className="font-medium inline-block md:block">
                            Genre<span className="md:hidden">:&nbsp;</span>
                          </h4>
                          <span className="text-base text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                            Rock
                          </span>
                          <span className="text-base text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                            Guitar
                          </span>
                          <span className="text-base text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                            80&apos;s
                          </span>

                          <span className="text-base text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                            Romance
                          </span>
                          <span className="text-base text-gray-500 after:content-['|'] after:absolute after:text-gray-500 after:-top-[3px] after:left-[100%] relative pr-1 last-of-type:pr-0 mr-2 last-of-type:mr-0 last-of-type:after:content-none">
                            90&apos;s
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex justify-between h-[90%] top-[10%] items-center">
                        <div
                          className="w-[33.33%] h-full text-white"
                          onClick={goToPrevSlide}
                        ></div>
                        <div
                          className="w-[33.33%] h-full text-white"
                          onClick={goToNextSlide}
                        ></div>
                        <div
                          className="w-[33.33%] h-full text-white"
                          onClick={goToNextSlide}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="absolute inset-0 flex justify-between h-[90%] top-[10%] items-center">
              <div
                className="w-[33.33%] h-full text-white"
                onClick={goToPrevSlide}
              ></div>
              <div
                className="w-[33.33%] h-full text-white"
                onClick={goToNextSlide}
              ></div>
              <div
                className="w-[33.33%] h-full text-white"
                onClick={goToNextSlide}
              ></div>
            </div> */}
            <div className="absolute top-0 left-0 right-0 flex justify-center mt-1">
              {props.story.map((_, index) => (
                <div
                  key={index}
                  className={`bg-gray-100 basis-full w-full h-1 mx-1 ${
                    index === currentSlide ? ' after:bg-gray-400' : ''
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <div
                    className={`w-full h-full ${
                      index === currentSlide ? 'bg-gray-300' : ''
                    }`}
                    // style={{ width: '100px' }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-[45] bg-gray-800"></div>
    </>
  );
};

export default ViewMyStoryCarouselV2;
