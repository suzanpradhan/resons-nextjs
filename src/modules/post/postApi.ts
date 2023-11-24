import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { toast } from 'react-toastify';
import {
  PostDetailType,
  PostEachDetailType,
  PostFormType,
  SearchDetailType,
} from './postType';

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get List of Posts
    getPostList: builder.query<PaginatedResponseType<PostDetailType>, number>({
      query: (page) => `${apiPaths.postUrl}?page=${page}&paginate=10`,
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({ type: 'Posts', id } as const)),
            { type: 'Posts', id: 'LIST' },
          ]
          : [{ type: 'Posts', id: 'LIST' }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.pagination = newItems.pagination;
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response: any) => {
        console.log(response.data);
        return response?.data as PaginatedResponseType<PostDetailType>;
      },
    }),

    // Get List of Posts
    getMyPostList: builder.query<PostDetailType[], void>({
      query: () => `${apiPaths.myPostUrl}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
            { type: 'Posts', id: 'LIST' },
          ]
          : [{ type: 'Posts', id: 'LIST' }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response: any) => {
        console.log(response?.data?.posts.data);
        return response?.data?.posts as PostDetailType[];
      },
    }),

    // Get List of Posts
    getUserPostList: builder.query<PostDetailType[], number>({
      query: (id) => `${apiPaths.userPostUrl}/${id}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
            { type: 'Posts', id: 'LIST' },
          ]
          : [{ type: 'Posts', id: 'LIST' }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response: any) => {
        console.log(response?.data?.posts.data);
        return response?.data?.posts as PostDetailType[];
      },
    }),

    // Get Post
    getPost: builder.query<PostEachDetailType, number>({
      query: (id) => `${apiPaths.postSingleUrl}/${id}`,
      providesTags: ['Posts'],
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          toast.error(JSON.stringify(err));
        }
      },
      transformResponse: (response: any) => {
        return response?.data?.data as PostEachDetailType;
      },
    }),

    // Get Paginated Comments for a Post
    // getPaginatedComments: builder.query<PaginatedResponseType<CommentDetailType>, { postId: number, page: number, perPage: number }>({
    //   query: ({ postId, page, perPage }) => `${apiPaths.commentsUrl}?postId=${postId}&page=${page}&perPage=${perPage}`,
    //   providesTags: ['Comments'],
    //   async onQueryStarted(payload, { queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       console.log(err);
    //       toast.error(JSON.stringify(err));
    //     }
    //   },
    //   transformResponse: (response: any) => {
    //     console.log(response?.data);
    //     return response?.data as PaginatedResponseType<CommentDetailType>;
    //   },
    // }),

    // Search List of Posts
    searchPosts: builder.query<
      SearchDetailType,
      { searchValue: string; searchType: string }
    >({
      query: ({ searchValue = '', searchType = '' }) =>
        `${apiPaths.search_q}${searchValue}&entity=${searchType}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response: any) => {
        // console.log(response.data);
        return response?.data as SearchDetailType;
      },
    }),

    //   {
    //     "title": "upload title",
    //     "audio_file": "asdfj",
    //     "file_duration": 10,
    //     "wave_data":  "wave data",
    //     "privacy_code": 0,
    //     "expiration_type": "Never",
    //     "language": "string",
    //     "cover_image": "string",
    //     "remember_my_language": 0,
    //     "color_code": "string",
    //     "tags": "any",
    //     "is_ai_generated": 0
    // }
    // Add Post
    addPost: builder.mutation<any, PostFormType>({
      query: ({ ...payload }) => {
        var formData = new FormData();
        formData.append('title', payload.title);
        if (payload.wave_data) {
          formData.append('wave_data', JSON.stringify(payload.wave_data));
        }
        if (payload.file_duration != undefined) {
          formData.append('file_duration', payload.file_duration.toString());
        }
        formData.append('privacy_code', payload.privacy_code);
        formData.append('audio_file', payload.audio_file);
        formData.append('is_ai_generated', payload?.is_ai_generated);
        formData.append('expiration_type', payload.expiration_type);
        formData.append('language', payload.language);
        // if (payload.cover_image) {
        //   console.log(["here", payload.cover_image])
        if (payload.cover_image) {
          formData.append('cover_image', payload.cover_image);
        }
        // }
        // formData.append('cover_image_id', payload.cover_image_id);
        formData.append('remember_my_language', payload.remember_my_language);
        formData.append('color_code', payload.color_code);
        formData.append('tags', payload.tags as any);

        return {
          url: `${apiPaths.postCreateUrl}`,
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Posts'],
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Post created.');
        } catch (err) {
          console.log(err);
          toast.error('Failed creating post.');
        }
      },
      transformResponse: (response) => {
        console.log(response);
        return response as any;
      },
    }),
  }),
  overrideExisting: true,
});

export default postApi;
