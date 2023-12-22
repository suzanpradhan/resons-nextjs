import { PlaylistDetailType } from '@/modules/playlist/playlistTypes';
import 'react-multi-carousel/lib/styles.css';
import PlaylistCard from './PlaylistCard';

interface MainCarouselProps {
  playlists: PlaylistDetailType[];
}

export default function MyPlaylistListing(props: MainCarouselProps) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2.7,
      slidesToSlide: 3, // optional, default to 1.
    },
  };

  return (
    <>
      {/* <div className="flex flex-col mb-4 px-4 py-4 mx-4 bg-white rounded-sm overflow-x-hidden"> */}
      {/* <div className="border-0 border-solid border-gray-300 border-b mb-4 flex items-center justify-between pb-2">
        <h3 className="text-lg text-gray-800 font-bold capitalize">
          My Playlist
        </h3>
        <Link
          href={`/library/playlist`}
          className="border border-gray-200 text-xs py-1 px-3 text-gray-500 hover:shadow-sm hover:text-gray-600"
        >
          View all
        </Link>
      </div> */}
      <div className="w-screen overflow-x-scroll">
        <div className="inline-flex">
          {props.playlists.map((playlist, index) => (
            <PlaylistCard playlist={playlist} key={index} />
          ))}
        </div>
      </div>

      {/* <Carousel
        swipeable={true}
        responsive={responsive}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        itemClass="pl-4 border"
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
        {props.playlists.map((playlist, index) => (
          <PlaylistCard playlist={playlist} key={index} />
        ))}
        {props.playlists.map((playlist, index) => (
          <PlaylistCard playlist={playlist} key={index} />
        ))}
        {props.playlists.map((playlist, index) => (
          <PlaylistCard playlist={playlist} key={index} />
        ))}
        {props.playlists.map((playlist, index) => (
          <PlaylistCard playlist={playlist} key={index} />
        ))}
      </Carousel> */}
      {/* </div> */}
    </>
  );
}
