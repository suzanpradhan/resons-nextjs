import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
}

export default function MultiCarousel({ slides }: MainCarouselProps) {
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
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 10,
    },
  };

  return (
    <div className="flex flex-col mb-4 py-4 bg-white overflow-x-hidden last-of-type:mb-16">
      <h3 className="text-base font-medium text-gray-800 mb-4 pb-2 capitalize border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 mx-4">
        {slides[0].groupTitle}
      </h3>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={false}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        itemClass="pl-4"
        partialVisible={true}
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
          />
        ))}
      </Carousel>
    </div>
  );
}
