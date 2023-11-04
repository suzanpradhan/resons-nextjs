'use client';

import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { createContext, useContext } from 'react';
import { PostDetailType } from './postType';

const PreloadPostContext = createContext<
  PaginatedResponseType<PostDetailType> | undefined
>(undefined);

export const usePreloadPostContext = () => {
  const posts = useContext(PreloadPostContext);
  return posts;
};

const PreloadPostProvider = ({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: PaginatedResponseType<PostDetailType>;
}) => {
  return (
    <PreloadPostContext.Provider value={posts}>
      {children}
    </PreloadPostContext.Provider>
  );
};

export default PreloadPostProvider;
