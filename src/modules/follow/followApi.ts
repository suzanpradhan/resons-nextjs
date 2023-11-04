import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { FollowDetailType, UnfollowFormType, followFormType } from './followType';

const followApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['follow'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get user Follow
            getFollow: builder.query<FollowDetailType[], number>({
                query: (id) => `${apiPaths.userFollowing}/${id}`,
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data?.following as FollowDetailType[];
                },
            }),

            // Remove user
            unfollow: builder.mutation<any, UnfollowFormType>({
                query: ({ ...payload }) => {
                    return {
                        url: `${apiPaths.unFollowUrl}`,
                        method: 'POST',
                        body: payload,
                    };
                },
                transformResponse: (response: any) => {
                    return (response as any)?.data as any;
                },
            }),

            // Follow user
            follow: builder.mutation<any, followFormType>({
                query: ({ ...payload }) => {
                    return {
                        url: `${apiPaths.followUrl}`,
                        method: 'POST',
                        body: payload,
                    };
                },
                transformResponse: (response: any) => {
                    return (response as any)?.data as any;
                },
            }),
        }),
        overrideExisting: true,
    });
export default followApi;
