'use client';

import HomePage from '@/app/(home)/(feed)/page';

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useParams, usePathname } from 'next/navigation';

interface PageWithTransitionProps {
  children?: React.ReactNode;
}

const PageWithTransition = (props: PageWithTransitionProps) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
  
    {
      path: '/',
      exact: true,
      component: <HomePage />,
    },
  ];

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathName]);

  const variants = {
    initial: {
      opacity: 0,
      // scale: 1,
      x: '100%',
      transition: {
        duration: 0.5,
        // ease: 'easeIn',
      },
    },
    animate: {
      opacity: 1,
      // scale: 1,
      x: 0,
      transition: {
        opacity: { duration: 0 },
        // scale: { duration: 0.4, ease: 'easeIn' },
        x: { delay: 0, duration: 0.4, ease: 'easeInOut' },
      },
    },
    exit: {
      opacity: 0.88,
      x: '-100%',
      transition: {
        ease: 'easeInOut',
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} mode={'popLayout'}>
          {routes.map((route) => {
            if (route.exact) {
              if (route.path === pathName) {
                return (
                  <m.div
                    key={pathName}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                    variants={variants}
                  >
                    {route.component}
                  </m.div>
                );
              }
            } else {
              if (pathName.includes(route.path)) {
                return (
                  <m.div
                    key={pathName}
                    initial="initial"
                    animate={'animate'}
                    exit={'exit'}
                    variants={variants}
                  >
                    {route.component}
                  </m.div>
                );
              }
            }
          })}
          {/* {!routes.find((route) => {
          if (route.exact) {
            console.log('exact other');

            return route.path === pathName;
          } else {
            console.log('not exact other');

            return pathName.startsWith(route.path);
          }
        }) && props.children} */}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
};

export default PageWithTransition;
