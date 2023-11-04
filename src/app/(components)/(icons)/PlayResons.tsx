const PlayResons = ({
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
          x1="-3.391"
          y1="53.967"
          x2="79.747"
          y2="49.099"
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
          d="M38 45.2v12.4c0 1.6 1.7 2.5 3.1 1.8l10.7-6.2a1.98 1.98 0 0 0 0-3.5l-10.7-6.2c-1.4-.8-3.1.2-3.1 1.7z"
          fill={`${gradient ? 'url(#A)' : 'gray'}`}
        />
        <linearGradient
          id="B"
          gradientUnits="userSpaceOnUse"
          x1="-3.392"
          y1="53.961"
          x2="79.747"
          y2="49.093"
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
          d="M61.7 52.8L42.5 63.5v8l22.6-12.6c2.7-1.6 4.3-4.4 4.3-7.5s-1.6-5.9-4.3-7.5L43.3 31.3c-.3-.1-.6-.3-.8-.3v8l19.1 11c.7.4.8 1.1.8 1.4.1.4-.1 1-.7 1.4z"
          fill={`${gradient ? 'url(#B)' : 'gray'}`}
        />
        <linearGradient
          id="C"
          gradientUnits="userSpaceOnUse"
          x1="-1.929"
          y1="78.944"
          x2="81.21"
          y2="74.076"
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
          d="M7.4 83.1v8.1L38 74.1l4.4-2.5v-8L38 66z"
          fill={`${gradient ? 'url(#C)' : 'gray'}`}
        />
        <linearGradient
          id="D"
          gradientUnits="userSpaceOnUse"
          x1="-3.538"
          y1="51.46"
          x2="79.601"
          y2="46.592"
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
          d="M87.1 40.2L40.5 13.4 34 9.7v8.1 17.4l6.5 3.3v-17l43.1 24.8c1.8 1.1 3 3 3 5.1s-1.1 4-3 5.1L42.5 80.3v8.1c.1 0 .2-.1.2-.1l44.4-25.6c4-2.3 6.5-6.5 6.5-11.2s-2.4-8.9-6.5-11.3z"
          fill={`${gradient ? 'url(#D)' : 'gray'}`}
        />
      </svg>
    </>
  );
};

export default PlayResons;
