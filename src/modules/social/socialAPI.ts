import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';

const socialApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get Social
            getSocialUrl: builder.query({
                query: () => `${apiPaths.socialUrl}?provider=google`,
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    console.log(response);
                    return response?.data as any;
                },
            }),
        }),
        overrideExisting: true,
    });

export default socialApi;
