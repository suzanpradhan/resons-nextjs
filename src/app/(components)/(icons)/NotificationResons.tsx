const NotificationResons = ({
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
          x1="17.494"
          y1="57.248"
          x2="101.39"
          y2="45.541"
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
          d="M42.7 84.6l8.3 4.8c-.1-.8-.3-1.6-.6-2.4l-7.7-20-.2-.6h.7c5.2.2 9.6 1.1 13.8 3 4.5 2 9.2 5.1 16.2 10.7h0 0C75.3 82 77.7 83 80 83c2.9 0 5.6-1.6 7.4-4.4 4-6.1 6.4-18.1 6.2-31.2-.1-13.5-2.8-25-7.1-31-2.3-3.2-4.4-4.7-6.6-4.7-2.3 0-4.6 1.6-7.6 4.1-6.8 5.7-11.4 8.9-15.9 11-7.1 3.4-15.7 3.6-23.8 3.6h-2.7-2.6-2.1c-5.1 0-9.7 2-13.2 5.5-3.4 3.6-5.2 8.1-5.1 12.9C7 52.9 8.4 56.9 11 60c2.6 3.2 6.2 5.4 10.2 6.2h.2l.1.2 6.7 17.4 8.9 5.4L28.5 67l-.2-.6h.6l6.5-.1h.3l.1.3m30.3-37.2c-3.1 11.3-3.2 25.8-.3 36.9l.3 1-.9-.6c-2-1.2-3.9-2.2-5.8-3-7.2-3.2-15-3.6-21.7-3.6l-7.4.1c-1.8 0-3.6.1-5.3.1h-.1c-6.4 0-11.7-5.2-11.8-11.6 0-3.2 1-6.1 3.1-8.2 2.3-2.4 5.8-3.7 9.6-3.7h2.4H30h1.8c10 0 18.9-.3 27.1-4.2 2.1-1 4.2-2.2 6.4-3.6l1-.6-.2 1zm16 45.8c-.7 1-1.4 1.5-2.3 1.5-3.1 0-6-6.6-6.1-6.9-1.7-3.9-2.8-9.1-3.3-15.6l-.1-.8.7.4.1.1c1.1.6 2.3.9 3.5.9 2.6 0 5.1-1.4 6.3-3.7.9-1.7 1.2-3.7.7-5.5-.5-1.9-1.7-3.4-3.4-4.4-1.1-.6-2.3-.9-3.5-.9-1.3 0-2.6.3-3.7 1l-.8.4.1-.9c.4-3.6 2.2-15.8 7.3-21.3.5-.5 1-.8 1.6-.8.7 0 1.4.5 2.1 1.4 3.5 4.7 5.7 15.3 5.8 27.5s-1.8 22.7-5 27.6z"
          fill={`${gradient ? 'url(#A)' : 'gray'}`}
        />
        <linearGradient
          id="B"
          gradientUnits="userSpaceOnUse"
          x1="15.692"
          y1="44.33"
          x2="99.588"
          y2="32.623"
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
          d="M29.7 41.7c-.1-.2-.3-.3-.5-.5-.2-.1-.4-.2-.7-.2h-.4 0-.2c-.5-.1-1-.1-1.5-.2h-.2c-.3 0-.7.1-.9.3-.1.1-.2.1-.2.2 0 0 0 .1-.1.1-.1.1-.1.1-.1.2-.2.3-.3.6-.4.9v.4.1c0 .1 0 .2.1.3a1.59 1.59 0 0 0 .8 1c.1 0 .2.1.3.1h.1c.1 0 .2.1.3.1.2 0 .5.1.7.1.5.1 1 .1 1.5.2h.2.3c.5-.1 1-.5 1.3-.9.1-.2.2-.4.2-.6-.1-.7-.3-1.2-.6-1.6z"
          fill={`${gradient ? 'url(#B)' : 'gray'}`}
        />
        <linearGradient
          id="C"
          gradientUnits="userSpaceOnUse"
          x1="16.049"
          y1="46.888"
          x2="99.945"
          y2="35.182"
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
          d="M36.4 45.2h3l6.1-.2c2.9-.2 5.8-.6 8.9-1.1.6-.1 1.1-.5 1.3-1 0-.1 0-.1.1-.2.1-.2.1-.3.1-.5v-.4c-.2-.9-.9-1.5-1.8-1.5h-.3l-8.5 1.1-5.9.2h-2.8-.1c-.5 0-.9.2-1.3.5-.3.3-.5.7-.5 1.2-.1 1.1.7 1.9 1.7 1.9z"
          fill={`${gradient ? 'url(#C)' : 'gray'}`}
        />
      </svg>
    </>
  );
};

export default NotificationResons;
