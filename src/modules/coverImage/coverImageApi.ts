import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { CoverImageDataType } from './coverImageType';

const coverImageApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['CoverImage'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get CoverImage
            getCoverImage: builder.query<CoverImageDataType[], void>({
                query: () => `${apiPaths.getCoverImageUrl}`,
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data as CoverImageDataType[];
                },
            }),
        }),
        overrideExisting: true,
    });
export default coverImageApi;
