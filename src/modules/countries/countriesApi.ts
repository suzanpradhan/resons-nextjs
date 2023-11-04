import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { CountriesDetailType } from './countriesType';

const countriesApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get user Countries
            getCountriesList: builder.query<CountriesDetailType[], void>({
                query: () => `${apiPaths.countriesListUrl}`,
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data as CountriesDetailType[];
                },
            }),
        }),
        overrideExisting: true,
    });
export default countriesApi;
