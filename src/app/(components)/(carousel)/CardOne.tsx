import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
interface CardOneProps {
  slide: {
    id?: number;
    img_url: string;
    title: string;
  };
}

export default function CardOne({ slide }: CardOneProps) {
  return (
    <>
      <Link
        href={`/genres/${slide.id}`}
        className="flex flex-col items-center last-of-type:mr-0"
      >
        <div className="w-full h-28 sm:h-36 rounded-md overflow-hidden drop-shadow-xl">
          <img
            src={slide.img_url}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-base w-full text-center text-gray-800 font-bold py-0 mt-3 capitalize truncate">
          {slide.title}
        </h4>
      </Link>
    </>
  );
}
