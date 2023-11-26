'use client';

import { useEffect, useState } from 'react';

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('');

  useEffect(() => {
    const scrollableDiv = document.getElementById('feed-listing');
    if (!scrollableDiv) {
      return;
    }
    let lastScrollY = scrollableDiv!.scrollTop;

    // function to run on scroll
    const updateScrollDirection = () => {
      const scrollY = scrollableDiv!.scrollTop;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    if (!scrollableDiv) return;
    let isScrolling: any;
    scrollableDiv.addEventListener('scroll', () => {
      updateScrollDirection();
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        setScrollDirection('');
      }, 500);
    }); // add event listener
    return () => {
      scrollableDiv.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]); // run when scroll direction changes

  return scrollDirection;
}

export default useScrollDirection;
