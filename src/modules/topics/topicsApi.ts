import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { TopicsDataType } from './topicsType';

const topicsApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Topics'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get Topics
            getTopics: builder.query<TopicsDataType[], void>({
                query: () => `${apiPaths.getTopicsListUrl}`,
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data as TopicsDataType[];
                },
            }),
        }),

        overrideExisting: true,
    });
export default topicsApi;
