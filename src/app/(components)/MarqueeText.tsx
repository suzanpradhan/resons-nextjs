import { useState } from 'react';
import Marquee from 'react-fast-marquee';

const MarqueeText = (props: { text: string; className: string }) => {
  const [startMarquee, setStartMarquee] = useState(false);

  return (
    <Marquee
      delay={3}
      autoFill={false}
      play={startMarquee}
      pauseOnClick={false}
      pauseOnHover={false}
      onFinish={() => {
        setStartMarquee(false);
        setTimeout(function () {
          setStartMarquee(true);
        }, 1);
      }}
    >
      <div className={props.className + ' mr-4'}>
        {props.text ?? ''}
      </div>
    </Marquee>
  );
};

export default MarqueeText;
