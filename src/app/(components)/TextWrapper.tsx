'use client';
import { uiConstants } from '@/core/constants/appConstants';
import { useEffect, useRef, useState } from 'react';

interface TextProps {
  text: string;
  ellipsis?: boolean;
  className: string;
}

const TextWrapper = ({ ellipsis = false, ...props }: TextProps) => {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef<any>(null);
  const [overflowActive, setOverflowActive] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (textRef.current) {
      // console.log(textRef.current.offsetHeight);
      // console.log('-' + uiConstants.overFlowOffsetHeight);

      // console.log(textRef.current.scrollHeight);
      setOverflowActive(
        uiConstants.overFlowOffsetHeight < textRef.current.scrollHeight
      );
    }
  }, [textRef]);

  return (
    <>
      <div
        ref={textRef}
        onClick={toggleExpand}
        className={`${props.className} ${
          overflowActive && !expanded ? (ellipsis ? 'line-clamp-3 ' : '') : ''
        }`}
      >
        {props.text}
      </div>
    </>
  );
};

export default TextWrapper;
