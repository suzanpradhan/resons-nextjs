import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { GenresDetailType } from './genresType';

const genresApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Genres'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get Genres
            getGenres: builder.query<GenresDetailType[], void>({
                query: () => `${apiPaths.getGenresUrl}`,
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data as GenresDetailType[];
                },
            }),
        }),
        overrideExisting: true,
    });
export default genresApi;
