import { apiPaths } from '@/core/api/apiConstants';
import Spinner from '@/core/ui/components/Spinner';
import { TemporarySegmentV3 } from '@/core/ui/components/TemporarySegmentV3';
import { StoryDetailType } from '@/modules/story/storyType';
import { CloseCircle } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';

interface StoryViewProps {
  story: StoryDetailType[];
  onClose?: () => void;
}
/* eslint-disable @next/next/no-img-element */
const ViewStoryCarousel = (props: StoryViewProps) => {
  //   console.log(props.story.length);
  const [curr, setCurr] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isSlidingEnabled, setIsSlidingEnabled] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [slideSegments, setSlideSegment] = useState(0);

  const calculateTranslateX = (newSegmentIndex: number) => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const slidesWidth = 100 * props.story.length;
      if (
        newSegmentIndex === slideSegments - 1 &&
        slidesWidth > carouselWidth
      ) {
        setTranslateX(slidesWidth - carouselWidth + 16);
      } else {
        setTranslateX(carouselWidth * newSegmentIndex);
      }
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const slidesWidth = 166 * props.story.length;
      setSlideSegment(Math.floor(slidesWidth / carouselWidth));
      setIsSlidingEnabled(slidesWidth > carouselWidth);
      calculateTranslateX(0);
    }
  }, [props.story, carouselRef.current?.offsetWidth]);

  const prev = () => {
    if (!isSlidingEnabled) {
      return;
    }
    var tempCurrentSegment = curr === 0 ? slideSegments - 1 : curr - 1;
    setCurr(tempCurrentSegment);
    calculateTranslateX(tempCurrentSegment);
  };

  const next = () => {
    if (!isSlidingEnabled) {
      return;
    }
    var tempCurrentSegment = 0;
    if (curr === slideSegments - 1) {
      setCurr(tempCurrentSegment);
    } else {
      tempCurrentSegment = curr + 1;
      setCurr(tempCurrentSegment);
    }
    calculateTranslateX(tempCurrentSegment);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute w-screen h-screen md:w-[35%] top-0 bg-white z-[50]">
          {/* <div className="w-full relative"> */}
          <div className="absolute w-full inset-0 flex items-center justify-between">
            {isSlidingEnabled && (
              <div
                onClick={prev}
                className="z-40 h-full w-[35%] cursor-pointer"
              >
                next
              </div>
            )}
            {isSlidingEnabled && (
              <div
                onClick={next}
                className="z-40 h-full w-[35%] cursor-pointer"
              >
                next
              </div>
            )}
          </div>

          <div className="absolute bottom-4 top-[98%] right-0 left-0">
            <div className="flex items-center justify-center gap-2">
              {props.story.map((_, i) => (
                <div
                  key={i}
                  className={`
                    transition-all w-2 h-2 bg-gray-500 rounded-full ${
                      curr === i ? 'p-1' : 'bg-opacity-30'
                    }
                `}
                />
              ))}
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex flex-col w-full overflow-x-hidden"
          >
            {props.story?.length > 0 ? (
              <>
                {props.story?.map((story) => (
                  <div
                    className="w-full transition-transform ease-out duration-500"
                    style={{
                      transform: `translateX(-${translateX}px)`,
                    }}
                    key={story.story_id}
                  >
                    <div className="flex flex-col w-full basis-full h-screen px-4">
                      <div className="relative flex justify-between items-center py-4">
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
                                {story.owner_name}
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
                      <div className="mt-32">
                        <div className="relative">
                          <h3 className="text-2xl text-gray-700">
                            {story.title}
                          </h3>
                          <p className="text-base text-gray-400">
                            {story.description}
                          </p>
                          <div className="relative flex flex-col justify-center basis-[calc(100%-35px)] w-full pt-2 pb-16 my-1 z-50">
                            {story.audio_id && (
                              <TemporarySegmentV3
                                audioUrl={
                                  apiPaths.baseUrl +
                                  '/socialnetwork/audio/stream/' +
                                  story.audio_id
                                }
                                onDuration={() => {}}
                              />
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
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full flex items-center justify-center mt-4">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="fixed inset-0 z-[45] bg-gray-800"></div>
    </>
  );
};

export default ViewStoryCarousel;
