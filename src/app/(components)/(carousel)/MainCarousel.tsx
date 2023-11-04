import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import CardOne from './CardOne';

interface Slide {
  id: number | undefined;
  img_url: string;
  title: string;
}

interface Group {
  groupTitle: string;
  slides: Slide[];
}

interface MainCarouselProps {
  slides: Group[];
}

export default function MainCarousel({ slides }: MainCarouselProps) {
  const [curr, setCurr] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isSlidingEnabled, setIsSlidingEnabled] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [slideSegments, setSlideSegment] = useState(0);

  const calculateTranslateX = (newSegmentIndex: number) => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const slidesWidth = 166 * slides[0].slides.length;
      if (
        newSegmentIndex === slideSegments - 1 &&
        slidesWidth > carouselWidth
      ) {
        setTranslateX(slidesWidth - carouselWidth);
      } else {
        setTranslateX(carouselWidth * newSegmentIndex);
      }
      console.log(translateX + 'px');
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const slidesWidth = 166 * slides[0].slides.length;
      var tempSegments = Math.floor(slidesWidth / carouselWidth);
      setSlideSegment(tempSegments > 1 ? tempSegments : 2);
      setIsSlidingEnabled(slidesWidth > carouselWidth);
      calculateTranslateX(0);
    }
  }, [slides, carouselRef.current?.offsetWidth]);

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
    <div className="w-full relative">
      <div className="absolute w-full inset-0 flex items-center justify-between">
        {isSlidingEnabled && (
          <button
            onClick={prev}
            className="z-40 p-1 rounded-full shadow text-xs bg-gray-100 text-gray-800 hover:bg-gray-300"
          >
            <ArrowLeft2 size="18" color="#FF8A65" />
          </button>
        )}
        {isSlidingEnabled && (
          <button
            onClick={next}
            className="z-40 p-1 rounded-full shadow bg-gray-100 text-gray-800 hover:bg-gray-300"
          >
            <ArrowRight2 size="18" color="#FF8A65" />
          </button>
        )}
      </div>
      {/* <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides[0].slides.map((_, i) => (
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
      </div> */}
      <div
        // ref={carouselRef}
        className="flex flex-col mb-4 px-4 py-4 bg-white rounded-md overflow-x-hidden"
      >
        <h3 className="text-lg text-gray-800 font-bold mb-4 pb-2 capitalize border border-solid border-gray-300 border-t-0 border-l-0 border-r-0">
          {slides[0].groupTitle}
        </h3>
        <div
          ref={carouselRef}
          // className="flex w-full gap-4 transition-transform ease-out duration-500"
          // style={{
          //   transform: `translateX(-${translateX}px)`,
          // }}
        >
          <div
            className="flex w-full gap-4 transition-transform ease-out duration-500"
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {slides[0].slides.map((slide, index) => (
              <CardOne slide={slide} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
