const LibraryResons = ({
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
          x1="13.956"
          y1="71.942"
          x2="88.934"
          y2="62.438"
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
          d="M46.9 67.6v.2h.1s0-.1-.1-.2z"
          fill={`${gradient ? 'url(#A)' : 'gray'}`}
        />
        <linearGradient
          id="B"
          gradientUnits="userSpaceOnUse"
          x1="14"
          y1="72.295"
          x2="88.979"
          y2="62.791"
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
          d="M50 67.9c0-.1 0-.2-.1-.3.1.1.1.2.1.3h0z"
          fill={`${gradient ? 'url(#B)' : 'gray'}`}
        />
        <linearGradient
          id="C"
          gradientUnits="userSpaceOnUse"
          x1="11.923"
          y1="55.908"
          x2="86.901"
          y2="46.404"
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
          d="M82.8 34.7l-.7 6.5c-2 .2-4.2.4-6.6 1-9 2-19.9 7.3-24.6 21h-2.1c0-.1 0-.2-.1-.3.4-2.3.9-4.4 1.6-6.3C55.3 43.3 67.7 38 75.7 36c4.1-1.1 7.1-1.3 7.1-1.3z"
          fill={`${gradient ? 'url(#C)' : 'gray'}`}
        />
        <linearGradient
          id="D"
          gradientUnits="userSpaceOnUse"
          x1="12.636"
          y1="61.53"
          x2="87.614"
          y2="52.026"
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
          d="M51 65.5h2.5C59 55.9 67.3 51.8 75 50.4c2.1-.4 4.1-.6 6-.7 2.4-.1 4.7 0 6.6.2l1.8-6.3s-3-.3-7.3 0c-2 .2-4.2.4-6.6 1-8.9 1.9-19.8 7.2-24.5 20.9z"
          fill={`${gradient ? 'url(#D)' : 'gray'}`}
        />
        <linearGradient
          id="E"
          gradientUnits="userSpaceOnUse"
          x1="13.318"
          y1="66.911"
          x2="88.296"
          y2="57.407"
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
          d="M87.6 52.2A46.55 46.55 0 0 0 81 52c-1.9.1-4 .3-6 .7-7.7 1.5-16 5.5-21.5 15.2h3c5.2-5.9 11.4-8.6 17.3-9.7 1.9-.3 3.8-.5 5.6-.5 2.1 0 4.2.1 6.1.4 2.4.3 4.6.8 6.5 1.3 1-1.8 1.9-3.8 2.9-5.9-.1 0-2.9-.8-7.3-1.3z"
          fill={`${gradient ? 'url(#E)' : 'gray'}`}
        />
        <linearGradient
          id="F"
          gradientUnits="userSpaceOnUse"
          x1="11.406"
          y1="51.833"
          x2="86.385"
          y2="42.328"
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
          d="M17.2 34.7l.7 6.5c2 .2 4.2.4 6.6 1 9 2 19.9 7.3 24.6 21h2.1c0-.1 0-.2.1-.3-.4-2.3-.9-4.4-1.6-6.3C44.7 43.3 32.3 38 24.3 36c-4.1-1.1-7.1-1.3-7.1-1.3z"
          fill={`${gradient ? 'url(#F)' : 'gray'}`}
        />
        <linearGradient
          id="G"
          gradientUnits="userSpaceOnUse"
          x1="12.037"
          y1="56.805"
          x2="87.015"
          y2="47.301"
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
          d="M49 65.5h-2.5C41 55.9 32.7 51.8 25 50.4c-2.1-.4-4.1-.6-6-.7-2.4-.1-4.7 0-6.6.2l-1.8-6.3s3-.3 7.3 0c2 .2 4.2.4 6.6 1 8.9 1.9 19.8 7.2 24.5 20.9z"
          fill={`${gradient ? 'url(#G)' : 'gray'}`}
        />
        <linearGradient
          id="H"
          gradientUnits="userSpaceOnUse"
          x1="12.717"
          y1="62.169"
          x2="87.695"
          y2="52.665"
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
          d="M12.4 52.2A46.55 46.55 0 0 1 19 52c1.9.1 4 .3 6 .7 7.7 1.5 16 5.5 21.5 15.2h-3c-5.2-5.9-11.4-8.6-17.3-9.7-1.9-.3-3.8-.5-5.6-.5-2.1 0-4.2.1-6.1.4-2.4.3-4.6.8-6.5 1.3-1-1.8-1.9-3.8-2.9-5.9.1 0 2.9-.8 7.3-1.3z"
          fill={`${gradient ? 'url(#H)' : 'gray'}`}
        />
        <linearGradient
          id="I"
          gradientUnits="userSpaceOnUse"
          x1="14.022"
          y1="72.464"
          x2="89"
          y2="62.96"
        >
          <stop offset="0" stopColor="#ffd951" />
          <stop offset=".085" stopColor="#fcc158" />
          <stop offset=".266" stopColor="#f6836b" />
          <stop offset=".484" stopColor="#ed3183" />
          <stop offset=".603" stopColor="#d5398a" />
          <stop offset=".854" stopColor="#984d9a" />
          <stop offset="1" stopColor="#715aa5" />
        </linearGradient>
        <path d="M50 67.9h0z" fill={`${gradient ? 'url(#I)' : 'gray'}`} />
        <linearGradient
          id="J"
          gradientUnits="userSpaceOnUse"
          x1="14.228"
          y1="74.091"
          x2="89.206"
          y2="64.587"
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
          d="M42.4 68.8h15.2v1.5H42.4z"
          fill={`${gradient ? 'url(#J)' : 'gray'}`}
        />
      </svg>
    </>
  );
};

export default LibraryResons;
