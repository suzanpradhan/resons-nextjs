import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
interface CardOneProps {
  slide: {
    img_url: string;
    title: string;
    follow_count: number;
  };
}

export default function CardCircle({ slide }: CardOneProps) {
  return (
    <>
      <Link
        href="/library/1"
        className="flex flex-col items-center last-of-type:mr-0"
      >
        <div className="w-full rounded-full overflow-hidden drop-shadow-xl">
          <img
            src={slide.img_url}
            alt={slide.title}
            className="w-full h-auto aspect-square object-cover"
          />
        </div>
        <h4 className="text-base w-full text-center text-gray-800 font-bold py-0 mt-3 capitalize truncate">
          {slide.title}
        </h4>
        <p className="text-sm text-gray-500 font-normal">
          {slide.follow_count} Followers
        </p>
        <button className="border border-gray-300 bg-transparent py-1 px-3 mt-1 text-xs font-medium text-gray-700 cursor-pointer hover:shadow-sm hover:bg-slate-50 hover:text-gray-900">
          Follow
        </button>
      </Link>
    </>
  );
}
