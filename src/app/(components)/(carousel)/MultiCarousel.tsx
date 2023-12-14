import Link from 'next/link';
import 'react-multi-carousel/lib/styles.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { EffectFade } from 'swiper/modules';
import CardOne from './CardOne';

interface Slide {
  id?: number;
  img_url: string;
  title: string;
}

interface Group {
  groupTitle: string;
  slides: Slide[];
}

interface MainCarouselProps {
  slides: Group[];
  routeName: string;
}

export default function MultiCarousel({
  slides,
  routeName,
}: MainCarouselProps) {
  return (
    <div className="bg-white overflow-x-hidden px-4 py-4 mb-4 last-of-type:mb-28">
      <Link
        href={`/genres/all`}
        className="block text-base font-medium text-gray-800 capitalize border-0 border-solid border-b border-gray-300 mb-4 pb-2"
      >
        {slides[0].groupTitle}
      </Link>

      <Swiper
        // install Swiper modules
        modules={[EffectFade]}
        spaceBetween={15}
        slidesPerView={2.15}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        breakpoints={{
          // when window width is >= 480px
          480: {
            width: 480,
            slidesPerView: 3,
          },
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 4,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 5,
          },
        }}
      >
        {slides[0].slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <CardOne
                classnames={`${isActive ? '' : ''}`}
                slide={slide}
                routeName={routeName}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    /* <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={false}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        itemClass="pl-4"
        partialVisible={true}
        focusOnSelect={true}
        // Uncomment Extra Features
        //  showDots={false}
        //  ssr={true} // means to render carousel on server-side.
        //  autoPlay={false}
        //  autoPlaySpeed={1000}
        //  keyBoardControl={true}
        //  customTransition="all .5"
        //  deviceType={this.props.deviceType}
        //  dotListClass="custom-dot-list-style"
      >
        {slides[0].slides.map((slide, index) => (
          <CardOne
            slide={slide}
            key={index}
            classnames={index == slides[0].slides.length - 1 ? 'pr-4' : ''}
            routeName={routeName}
          />
        ))}
      </Carousel> */
  );
}
