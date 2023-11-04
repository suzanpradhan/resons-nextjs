const PlayListResons = ({
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
          x1="15.425"
          y1="50.172"
          x2="94.557"
          y2="51.032"
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
          d="M60.9 52L42.2 62.4v7.8l22.1-12.3a8.44 8.44 0 0 0 0-14.6L43 31c-.3-.1-.5-.3-.8-.3v7.8l18.7 10.8c.7.4.8 1 .8 1.4 0 .2-.1.9-.8 1.3z"
          fill={`${gradient ? 'url(#A)' : 'gray'}`}
        />
        <linearGradient
          id="B"
          gradientUnits="userSpaceOnUse"
          x1="15.152"
          y1="75.808"
          x2="94.284"
          y2="76.668"
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
          d="M8 81.5v7.9l29.8-16.7 4.3-2.4v-7.8l-4.3 2.4z"
          fill={`${gradient ? 'url(#B)' : 'gray'}`}
        />
        <linearGradient
          id="C"
          gradientUnits="userSpaceOnUse"
          x1="15.417"
          y1="51.401"
          x2="94.55"
          y2="52.261"
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
          d="M34 38.7v25.8l6.3-3.6V38.7z"
          fill={`${gradient ? 'url(#C)' : 'gray'}`}
        />
        <linearGradient
          id="D"
          gradientUnits="userSpaceOnUse"
          x1="15.454"
          y1="48.009"
          x2="94.587"
          y2="48.869"
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
          d="M85.7 39.7L40.3 13.5 34 9.9v24.9h6.3V21.4l42 24.2c1.8 1 2.9 2.9 2.9 5s-1.1 3.9-2.9 5L42.2 78.8v7.9c.1 0 .2-.1.2-.1l43.3-25c3.9-2.3 6.3-6.4 6.3-10.9 0-4.6-2.3-8.7-6.3-11z"
          fill={`${gradient ? 'url(#D)' : 'gray'}`}
        />
        <linearGradient
          id="E"
          gradientUnits="userSpaceOnUse"
          x1="15.43"
          y1="50.23"
          x2="94.562"
          y2="51.091"
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
          d="M20.4 47.3h32.8v6.3H20.4z"
          fill={`${gradient ? 'url(#E)' : 'gray'}`}
        />
      </svg>
    </>
  );
};

export default PlayListResons;
