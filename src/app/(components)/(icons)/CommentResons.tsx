const CommentResons = ({
  width,
  height,
  gradient,
}: {
  width: string;
  height: string;
  gradient: boolean;
}) => (
  <svg width={width} height={height} viewBox="0 0 100 100">
    <linearGradient
      id="A"
      gradientUnits="userSpaceOnUse"
      x1="11.288"
      y1="50.347"
      x2="94.981"
      y2="40.903"
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
      d="M91.7 26.2c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4h.1c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4h-.1zm-6.6 0c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4h.1c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4h-.1zm-7.1 0c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4h.2c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4H78zM46.2 59.8c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4h-1.8l-11.2 11c-.9.9-2.5.9-3.4 0a2.34 2.34 0 0 1-.7-1.7l-.1-9.2H18.4c-3.6 0-6.9-1.5-9.3-3.9s-3.9-5.7-3.9-9.3V34.6c0-3.6 1.5-6.9 3.9-9.3s5.7-3.9 9.3-3.9h52.2c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4H18.4c-2.3 0-4.4.9-5.9 2.5-1.5 1.5-2.5 3.6-2.5 5.9v16.8c0 2.3.9 4.4 2.5 5.9 1.5 1.5 3.6 2.5 5.9 2.5h13 0c1.3 0 2.4 1 2.4 2.3l.1 6.1 7.8-7.6c.4-.5 1.1-.8 1.8-.8h2.7zm6.2 0c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4h0c-1.3 0-2.4-1.1-2.4-2.4-.1-1.4 1-2.4 2.4-2.4h0z"
      fillRule="evenodd"
      fill={`${gradient ? 'url(#A)' : 'gray'}`}
    />
    <linearGradient
      id="B"
      gradientUnits="userSpaceOnUse"
      x1="12.207"
      y1="58.495"
      x2="95.9"
      y2="49.051"
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
      d="M39.8 66.8c.7 0 1.4.3 1.8.8l7.8 7.6.1-6.1c0-1.3 1.1-2.3 2.4-2.3h0 13c2.3 0 4.4-.9 5.9-2.5 1.5-1.5 2.5-3.6 2.5-5.9V41.6c0-2.3-.9-4.4-2.5-5.9-1.5-1.5-3.6-2.5-5.9-2.5H20c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4h44.9c3.6 0 6.9 1.5 9.3 3.9s3.9 5.7 3.9 9.3v16.8c0 3.6-1.5 6.9-3.9 9.3s-5.7 3.9-9.3 3.9H54.2l-.2 9.2c0 .6-.2 1.3-.7 1.7-.9.9-2.4 1-3.4 0l-11.2-11H37c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4h2.8z"
      fillRule="evenodd"
      fill={`${gradient ? 'url(#B)' : 'gray'}`}
    />
    <linearGradient
      id="C"
      gradientUnits="userSpaceOnUse"
      x1="13.642"
      y1="71.204"
      x2="97.334"
      y2="61.76"
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
      d="M31.7 66.8c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4h0c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4h0z"
      fillRule="evenodd"
      fill={`${gradient ? 'url(#C)' : 'gray'}`}
    />
  </svg>
);

export default CommentResons;
