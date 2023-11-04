const SearchResons = ({
  width,
  height,
  gradient,
}: {
  width: string;
  height: string;
  gradient: boolean;
}) => {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 100 100">
        <linearGradient
          id="A"
          gradientUnits="userSpaceOnUse"
          x1="17.725"
          y1="56.211"
          x2="89.028"
          y2="30.232"
        >
          <stop offset="0" stopColor="#ffd951" />
          <stop offset=".085" stopColor="#fcc158" />
          <stop offset=".266" stopColor="#f6836b" />
          <stop offset=".484" stopColor="#ed3183" />
          <stop offset=".603" stopColor="#d5398a" />
          <stop offset=".854" stopColor="#984d9a" />
          <stop offset="1" stopColor="#715aa5" />
        </linearGradient>
        <path
          d="M91.3 36.3v-.7h-8c-.8-5.6-3.4-10.7-7.6-14.6-4.4-4-10.1-6.3-16.1-6.3S47.9 16.9 43.4 21l-1.5-1.5c4.8-4.5 11.1-7 17.7-7a26.05 26.05 0 0 1 23.9 15.7l.3.8.7-.4 3.8-2.1.6-.3-.3-.6c-5.1-11.4-16.5-18.8-29-18.8-8.4 0-16.3 3.3-22.3 9.2-1.1 1-2.1 2.2-3 3.4-4.3 5.6-6.5 12.3-6.5 19.3 0 8.6 3.5 16.6 9.2 22.3L9 89l4.9 4.9 28.6-28.6c4.4 2.8 9.5 4.6 14.9 5 .8.1 1.5.1 2.2.1s1.5 0 2.2-.1c15.7-1.1 28.4-13.8 29.5-29.5.1-.8.1-1.5.1-2.2s0-1.5-.1-2.3zm-55.6 2.3c0 7 3.1 13.6 8.4 18.2l.5.4 4.2-4.2-.6-.5c-4.2-3.4-6.6-8.5-6.6-14 0-3.4 1-6.7 2.8-9.6.8-1.2 1.6-2.3 2.7-3.3a18.03 18.03 0 0 1 12.6-5.1c9.1 0 16.8 6.8 17.9 15.9.1.7.1 1.4.1 2.1s0 1.4-.1 2.1c-1 8.2-7.6 14.8-15.8 15.8-1.4.2-2.8.2-4.2 0l-.8-.1v8c-13-1.5-23.1-12.7-23.1-25.8 0-5.3 1.6-10.3 4.5-14.6l1.5 1.5c-2.6 4-4 8.5-4 13.2zm49.7 2.9c-1.3 11.9-11 21.6-22.9 22.9v-2.2c10.8-1.3 19.4-9.9 20.8-20.8h2.1z"
          fill={`${gradient ? 'url(#A)' : 'gray'}`}
        />
        <linearGradient
          id="B"
          gradientUnits="userSpaceOnUse"
          x1="18.503"
          y1="58.344"
          x2="89.805"
          y2="32.366"
        >
          <stop offset="0" stopColor="#ffd951" />
          <stop offset=".085" stopColor="#fcc158" />
          <stop offset=".266" stopColor="#f6836b" />
          <stop offset=".484" stopColor="#ed3183" />
          <stop offset=".603" stopColor="#d5398a" />
          <stop offset=".854" stopColor="#984d9a" />
          <stop offset="1" stopColor="#715aa5" />
        </linearGradient>
        <path
          d="M65.5 46.8a5.59 5.59 0 1 0 0-11.2 5.59 5.59 0 1 0 0 11.2z"
          fill={`${gradient ? 'url(#B)' : 'gray'}`}
        />
      </svg>
    </>
  );
};

export default SearchResons;
