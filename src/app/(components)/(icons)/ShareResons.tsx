const ShareResons = ({
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
          x1="17.5"
          y1="50.679"
          x2="86.803"
          y2="50.679"
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
          d="M86.3 10.3c-.2-.3-.4-.4-1.8-.6l-.1-.1-.2.1c-4-.4-16.7-.6-59.4-1.3a3.68 3.68 0 0 0-3.4 2.4c-.5 1.5 0 3.1 1.2 4l8.8 6.7c-13.3 14.8-21.1 41.6-4.7 71l.3.4c.2.2.4.1.5-.1.1-4.6 1.6-31.3 20.1-45.6L49.7 63c.2 1.5 1.4 2.7 3 3.1h.6c1.3 0 2.5-.7 3.1-1.8l30.2-52.5.2-.8-.5-.7zM77.9 13L47.5 29 24.8 12l53.1 1zM53.3 62.4l-4-30.1L80.2 16 53.3 62.4z"
          fill={`${gradient ? 'url(#A)' : 'gray'}`}
        />
      </svg>
    </>
  );
};

export default ShareResons;
