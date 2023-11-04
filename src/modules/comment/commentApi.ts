import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { toast } from 'react-toastify';
import { CommentDetailType, CommentFormType } from './commentType';

const commentApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Comments', 'Posts', 'CommentsAudio'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // Upload Ticket Attachments
      addComment: builder.mutation<any, CommentFormType>({
        query: ({ ...payload }) => {
          var formData = new FormData();
          formData.append('audio_file', payload.file);
          formData.append('comment', payload.comment);
          formData.append('post_id', payload.post_id.toString());
          if (payload.wave_data)
            formData.append('wave_data', payload.wave_data);
          if (payload.file_duration)
            formData.append('file_duration', payload.file_duration.toString());

          return {
            url: `${apiPaths.commentUrl}`,
            method: 'POST',
            body: formData,
            formData: true,
          };
        },
        invalidatesTags: ['Posts'],
        async onQueryStarted(payload, { queryFulfilled }) {
          try {
            await queryFulfilled;
            toast.success('Comment Uploaded.');
          } catch (err) {
            console.log(err);
            toast.error('Failed uploading comment.');
          }
        },
        transformResponse: (response) => {
          console.log(response);
          return response as any;
        },
      }),

      // Get list of Comments of Post
      getAllComments: builder.query<
        PaginatedResponseType<CommentDetailType>,
        { postId: number; page: number }
      >({
        query: ({ ...params }) =>
          `${apiPaths.postAllCommentsUrl}/${params.postId}?per_page=${params.page}`,
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(
                  ({ id }) => ({ type: 'Comments', id } as const)
                ),
                { type: 'Comments', id: 'LIST' },
              ]
            : [{ type: 'Comments', id: 'LIST' }],
        serializeQueryArgs: ({ queryArgs, endpointName }) => {
          return endpointName + '-' + queryArgs.postId;
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
          console.log(response);
          return response.data as PaginatedResponseType<CommentDetailType>;
        },
      }),

      // Get list of Comments of Post
      getAllCommentsForAudio: builder.query<
        CommentDetailType[],
        { postId: number; page: number }
      >({
        query: ({ ...params }) =>
          `${apiPaths.postAllCommentsUrl}/${params.postId}?per_page=${params.page}`,
        providesTags: (result) =>
          result
            ? [
                ...result.map(
                  ({ id }) => ({ type: 'CommentsAudio', id } as const)
                ),
                { type: 'CommentsAudio', id: 'LIST' },
              ]
            : [{ type: 'CommentsAudio', id: 'LIST' }],
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
          console.log(response);
          return response.data.data as CommentDetailType[];
        },
      }),
    }),
    overrideExisting: true,
  });

export default commentApi;
