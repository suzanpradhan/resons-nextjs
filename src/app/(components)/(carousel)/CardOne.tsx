import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
interface CardOneProps {
  slide: {
    id?: number;
    image: string;
    title: string;
  };
  classnames?: string;
  routeName?: string;
}

export default function CardOne({
  slide,
  classnames,
  routeName,
}: CardOneProps) {
  return (
    <>
      <Link
        href={`/${routeName}/${slide.title}`}
        className={'flex flex-col items-center last-of-type:mr-0 ' + classnames}
      >
        <div className="w-full h-32 sm:h-40 overflow-hidden drop-shadow-md">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full aspect-auto object-cover"
          />
        </div>
        <h4 className="text-sm w-full text-center text-gray-900 font-medium py-2 capitalize truncate">
          {slide.title}
        </h4>
      </Link>
    </>
  );
}
