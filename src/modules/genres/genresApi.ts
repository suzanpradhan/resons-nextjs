import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { GenrePlaylist, GenresDetailType, NowPlayingType } from './genresType';

const genresApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Genres', 'GenreItems'] })
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
            requestGenrePlaylist: builder.query<GenrePlaylist, string>({
                query: (name) => {
                    return {
                        url: `${apiPaths.getGenrePlaylist}`,
                        method: 'POST',
                        body: {
                            genre_name: name
                        },
                    };
                },
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data as GenrePlaylist;
                },
            }),
            getCurrentItem: builder.query<NowPlayingType, number>({
                query: (id) => `${apiPaths.getGenreCurrentItem}/${id}?isPostAudio=YES`,
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data as NowPlayingType;
                },
            }),
            searchGenres: builder.mutation<any, string>({
                query: (query) => {
                    var formData = new FormData();
                    formData.append('title', query);
                    return {
                        url: `${apiPaths.searchGenresUrl}`,
                        method: 'POST',
                        body: formData,
                        formData: true,
                    };
                },
                transformResponse: (response: any) => {
                    return response?.data as any;
                },
            }),
        }),
        overrideExisting: true,
    });
export default genresApi;
