import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { toast } from 'react-toastify';
import { MyStoryDetailType, StoryDetailType, StoryFormType } from './storyType';

const storyApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Stories'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // Add Story
      addStory: builder.mutation<any, StoryFormType>({
        query: ({ ...payload }) => {
          var formData = new FormData();
          formData.append('title', payload.title);
          formData.append('privacy_code', payload.privacy_code);
          formData.append('audio_file', payload.audio_file);
          formData.append('description', payload.description);
          formData.append('is_ai_generated', payload.is_ai_generated);
          if (payload.wave_data)
            formData.append('wave_data', JSON.stringify(payload.wave_data));
          if (payload.file_duration)
            formData.append('file_duration', payload.file_duration.toString());
          formData.append('privacy_code', payload.privacy_code);
          formData.append('is_ai_generated', payload?.is_ai_generated);
       
          return {
            url: `${apiPaths.storyCreateUrl}`,
            method: 'POST',
            body: formData,
            formData: true,
          };
        },
        invalidatesTags: ['Stories'],
        async onQueryStarted(payload, { queryFulfilled }) {
          try {
            await queryFulfilled;
            toast.success('Story created.');
          } catch (err) {
            console.log(err);
            toast.error('Failed creating story.');
          }
        },
        transformResponse: (response) => {
          // console.log(response);
          return response as any;
        },
      }),

      // Get List of Stories
      getUserStoryList: builder.query<
        { [key: number]: StoryDetailType[] },
        void
      >({
        query: () => `${apiPaths.storyListUrl}`,
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          // console.log(response?.data);
          return response?.data as { [key: number]: StoryDetailType[] };
        },
      }),

      // Get List of my Stories
      getMyStoryList: builder.query<MyStoryDetailType[], void>({
        query: () => `${apiPaths.myStoryListUrl}`,
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          return response?.data as MyStoryDetailType[];
        },
      }),
    }),
    overrideExisting: true,
  });

export default storyApi;
