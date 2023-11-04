const HomeResons = ({
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
      id="gradient"
      gradientUnits="userSpaceOnUse"
      x1="0.4262"
      y1="50.1612"
      x2="99.5738"
      y2="50.1612"
    >
      <stop offset="0" stopColor="#FFDA51" />
      <stop offset="7.107592e-02" stopColor="#FCC963" />
      <stop offset="0.2215" stopColor="#F69E7A" />
      <stop offset="0.4376" stopColor="#EF4F85" />
      <stop offset="0.4839" stopColor="#EE3284" />
      <stop offset="0.5767" stopColor="#DB3D89" />
      <stop offset="0.773" stopColor="#AE4E95" />
      <stop offset="1" stopColor="#725AA6" />
    </linearGradient>
    <polygon
      fill={`${gradient ? 'url(#gradient)' : 'gray'}`}
      points="50,0.3 31.7,14.7 31.7,14.7 10,31.8 0.4,39.3 0.4,100 9.1,100 9.1,43.5 30.4,26.8 30.4,26.8 50,11.4 90.9,43.5 90.9,91.3 36.1,91.3 36.1,60.3 60.1,60.3 60.1,72.7 68.8,81.4 68.8,51.6 27.4,51.6 27.4,100 99.6,100 99.6,39.3"
    />
  </svg>
);

export default HomeResons;
