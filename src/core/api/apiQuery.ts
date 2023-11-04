import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { apiPaths, setHeaders } from './apiConstants';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiPaths.baseUrl}`,
    prepareHeaders: async (headers) => await setHeaders(headers),
  }),
  tagTypes: ['Countries', 'Posts', 'CommentLikes', 'PostLikes', 'Signup'],
  endpoints: () => ({}),
});
