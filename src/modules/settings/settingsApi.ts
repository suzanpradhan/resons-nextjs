import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { SettingsDetailType } from './settingsType';

const SettingsApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Genres'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get user Genres
            getGenres: builder.query<SettingsDetailType[], void>({
                query: () => `${apiPaths.getGenresUrl}`,
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data as SettingsDetailType[];
                },
            }),
        }),
        overrideExisting: true,
    });
export default SettingsApi;
