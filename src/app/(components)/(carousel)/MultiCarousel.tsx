import Link from 'next/link';
import 'react-multi-carousel/lib/styles.css';
import 'swiper/css';
// import Swiper core and required modules

export interface Slide {
  id?: number;
  img_url: string;
  title: string;
}

interface MainCarouselProps {
  slides: Slide[];
  routeName: string;
}

export default function MultiCarousel({
  slides,
  routeName,
}: MainCarouselProps) {
  return (
    <div className="bg-white overflow-x-hidden mt-4">
      <div className="flex justify-between items-start text-gray-800 h-9 mx-4">
        <div className="text-base font-medium">Top Categories</div>
        <Link href={`/genres/all`} className="text-sm h-full">
          see all
        </Link>
      </div>

      {/* <Swiper
        // install Swiper modules
        modules={[EffectFade]}
        spaceBetween={15}
        slidesPerView={3}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        speed={600}
        resistanceRatio={1}
        // onSwiper={(swiper) => console.log(swiper)}
        // // onSlideChange={() => console.log('slide change')}
        // breakpoints={{
        //   // when window width is >= 480px
        //   480: {
        //     width: 480,
        //     slidesPerView: 3,
        //   },
        //   // when window width is >= 640px
        //   640: {
        //     width: 640,
        //     slidesPerView: 4,
        //   },
        //   // when window width is >= 768px
        //   768: {
        //     width: 768,
        //     slidesPerView: 5,
        //   },
        // }}
      >
        {slides.map((slide, index) => (
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
      </Swiper> */}

      <div className="w-screen overflow-x-scroll">
        <div className="inline-flex">
          {slides.map((slide) => {
            return (
              <Link
                key={'category_' + slide.id}
                href={`/${routeName}/${slide.title}`}
                className="flex flex-col items-center group w-32 ml-4 last-of-type:mr-4 "
              >
                <div className="w-full h-32 rounded-md overflow-hidden group-hover:drop-shadow-md">
                  <img
                    src={slide.img_url ?? '/images/cover.webp'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4
                  className="text-sm w-full text-gray-800 py-0 mt-3 capitalize truncate text-center"
                  title={slide.title}
                >
                  {slide.title}
                </h4>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
