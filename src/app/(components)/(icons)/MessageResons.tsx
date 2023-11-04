const MessageResons = ({
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
          x1="5.451"
          y1="52.631"
          x2="82.577"
          y2="50.163"
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
          d="M68.8 94.1l-1.1-7.7c-.4-3-1.7-12.3-22.1-14-6.7-.6-12.3-2.1-16.9-4.6-4.8-2.6-8.6-6.3-11.5-11.1l-.5-.7c-.8-1.5-1.5-3-2.2-4.6-1.8-4.3-3.1-9.3-4.3-15.9-.2-.5-.2-1-.3-1.5-1-7 .6-13 4.7-17.5C19.9 11 29 8.1 40.9 8.1h1.7c3 .1 6.2.3 9.5.8 3.2.4 6.5 1 9.9 1.7 8.3 1.9 15.1 5.1 20 9.5.9.8 1.6 1.5 2.4 2.5C90.1 29 95.1 40.9 87.7 61c-3 8.3-8 17.3-14.7 26.9l-4.2 6.2zM22.3 53.9c2.3 3.8 5.3 6.6 9 8.7 4 2.2 8.7 3.4 14.6 4 10.4.9 18.1 3.8 22.6 8.7 1.4 1.4 2.3 2.8 3 4.2 4.6-7.3 8.2-14.1 10.6-20.5 5.3-14 4.5-25-2.1-32.5-.6-.7-1.3-1.4-1.9-2-4.1-3.8-10-6.5-17.4-8.2-3.2-.7-6.4-1.3-9.4-1.6-3.1-.4-6-.6-8.9-.7h-1.6c-10.2 0-17.9 2.4-21.9 6.7-2.9 3.1-4 7.3-3.1 12.5.1.4.2.9.3 1.3 1 6.1 2.3 10.8 3.9 14.7.7 1.6 1.5 3.2 2.2 4.6l.1.1z"
          fill={`${gradient ? 'url(#A)' : 'gray'}`}
        />
        <linearGradient
          id="B"
          gradientUnits="userSpaceOnUse"
          x1="5.349"
          y1="49.461"
          x2="82.476"
          y2="46.993"
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
          d="M69.3 73.7L66.7 69c-2.6-4.6-8.9-7.5-18.6-8.3-14.5-1.2-20.2-7.7-23.2-26.2-.8-4.8.9-6.9 1.5-7.6 3.7-4.3 12.1-5 16.9-5 5 0 10.6.7 16.5 2 9.4 2.1 15.3 6.2 17.7 12.2 2.9 7.6.6 21.1-5.7 32.8l-2.5 4.8zm-26-45.9c-6.8 0-11.1 1.5-12.4 2.9-.5.6-.4 1.9-.3 2.8 2.8 17 7.1 20.4 17.9 21.3 9 .8 15.8 3.2 20 7.2 4.4-10 5.1-19.4 3.4-23.8-1.5-4-6-7-13.3-8.6-5.6-1.2-10.8-1.8-15.3-1.8z"
          fill={`${gradient ? 'url(#B)' : 'gray'}`}
        />
        <linearGradient
          id="C"
          gradientUnits="userSpaceOnUse"
          x1="5.196"
          y1="44.68"
          x2="82.323"
          y2="42.212"
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
          d="M58.7 42.6c-.2 1.5 1.1 2.7 2.6 2.6 1.1-.1 2-1 2.1-2.1.2-1.5-1.1-2.7-2.6-2.6-1.1.2-2.1 1-2.1 2.1z"
          fill={`${gradient ? 'url(#C)' : 'gray'}`}
        />
        <linearGradient
          id="D"
          gradientUnits="userSpaceOnUse"
          x1="5.187"
          y1="44.383"
          x2="82.313"
          y2="41.915"
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
          d="M49.4 42.6c-.2 1.5 1.1 2.7 2.6 2.6 1.1-.1 2-1 2.1-2.1.2-1.5-1.1-2.7-2.6-2.6-1.1.2-2 1-2.1 2.1z"
          fill={`${gradient ? 'url(#D)' : 'gray'}`}
        />
        <linearGradient
          id="E"
          gradientUnits="userSpaceOnUse"
          x1="5.177"
          y1="44.089"
          x2="82.304"
          y2="41.621"
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
          d="M40.2 42.6c-.2 1.5 1.1 2.7 2.6 2.6 1.1-.1 2-1 2.1-2.1.2-1.5-1.1-2.7-2.6-2.6-1.2.2-2.1 1-2.1 2.1z"
          fill={`${gradient ? 'url(#E)' : 'gray'}`}
        />
      </svg>
    </>
  );
};

export default MessageResons;
