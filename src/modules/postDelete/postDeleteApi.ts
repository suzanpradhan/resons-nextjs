import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PostDeleteFormType } from './postDeleteType';

const postDeleteApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['postDelete'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Upload Post
            postDelete: builder.mutation<any, PostDeleteFormType>({
                query: ({ ...payload }) => {
                    return {
                        url: `${apiPaths.postDeleteUrl}/${payload.post_id}`,
                        method: 'DELETE',
                        body: payload,
                    };
                },
                transformResponse: (response) => {
                    return (response as any)?.data as PostDeleteFormType;
                },
            }),

            // Delete All Post
            allPostDelete: builder.mutation<any, void>({
                query: () => {
                    return {
                        url: `${apiPaths.allPostDeleteUrl}`,
                        method: 'GET',
                    };
                },
                transformResponse: (response) => {
                    return (response as any)?.data;
                },
            }),
        }),
        overrideExisting: true,
    });

export default postDeleteApi;
