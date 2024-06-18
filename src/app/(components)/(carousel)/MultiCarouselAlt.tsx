import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardCircle from './CardCircle';
import CardOne from './CardOne';

interface Slide {
  id: number | undefined;
  image: string;
  title: string;
  follow_count: number;
}

interface Group {
  groupTitle: string;
  slides: Slide[];
}

interface MainCarouselProps {
  slides: Group[];
  circle: Boolean;
}

export default function MultiCarouselAlt({
  slides,
  circle,
}: MainCarouselProps) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 4, // optional, default to 1.
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
  };

  return (
    <div className="flex flex-col mb-4 px-4 py-4 bg-white overflow-x-hidden last-of-type:mb-16">
      <h3 className="text-lg text-gray-800 font-bold mb-4 pb-2 capitalize border border-solid border-gray-300 border-t-0 border-l-0 border-r-0">
        {slides[0].groupTitle}
      </h3>
      {circle ? (
        <Carousel
          // swipeable={true}
          responsive={responsive}
          infinite={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          itemClass="px-3"
          partialVisible={true}
          // Uncomment Extra Features
          //  draggable={true}
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
            <CardCircle slide={slide} key={index} />
          ))}
        </Carousel>
      ) : (
        <Carousel
          // swipeable={true}
          responsive={responsive}
          infinite={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          itemClass="px-1"
          partialVisible={true}
          // Uncomment Extra Features
          //  draggable={true}
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
            <CardOne slide={slide} key={index} />
          ))}
        </Carousel>
      )}
    </div>
  );
}
