import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { FollowerDetailType } from './followerType';

const followerApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['follower'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get user Follow
            getFollower: builder.query<FollowerDetailType[], number>({
                query: (id) => `${apiPaths.userFollower}/${id}`,
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    console.log(response?.data)
                    return response?.data?.follower as FollowerDetailType[];
                },
            }),
        }),
        overrideExisting: true,
    });
export default followerApi;
