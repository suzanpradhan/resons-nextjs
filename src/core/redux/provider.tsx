'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
// import PageWithTransition from '../ui/components/PageWithTransition';
import { store } from './store';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <PageWithTransition>
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
    // </PageWithTransition>
  );
}
