import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { toast } from 'react-toastify';
import { GenrePlaylistItemType } from '../genres/genresType';
import { AddPlaylistFormType, PlaylistDetailType, RemovePlaylistFormType } from './playlistTypes';

const playlistApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Playlists', 'PlaylistAudios'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPlaylistFromId: builder.query<PlaylistDetailType, number>({
        query: (id) => `${apiPaths.getPlaylistDetail}/${id}`,
        providesTags: (result, error, id) => [{ type: 'Playlists', id }],
        async onQueryStarted(payload, { queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (err) {
            console.log(err);
            toast.error(JSON.stringify(err));
          }
        },
        transformResponse: (response: any) => {
          return response?.data as PlaylistDetailType;
        },
      }),

      // Get List of Popular Playlists
      getPopularPlaylistList: builder.query<PaginatedResponseType<PlaylistDetailType>, void>({
        query: () => `${apiPaths.popularPlaylistsUrl}`,
        providesTags: (result) =>
          result
            ? [
              ...result.data.map(({ id }) => ({ type: 'Playlists', id } as const)),
              { type: 'Playlists', id: 'LIST' },
            ]
            : [{ type: 'Playlists', id: 'LIST' }],
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          return response?.data as PaginatedResponseType<PlaylistDetailType>;
        },
      }),

      // Get List of New Releases Playlists
      getNewReleasesPlaylistList: builder.query<PaginatedResponseType<PlaylistDetailType>, void>({
        query: () => `${apiPaths.newReleasesPlaylistsUrl}`,
        providesTags: (result) =>
          result
            ? [
              ...result.data.map(({ id }) => ({ type: 'Playlists', id } as const)),
              { type: 'Playlists', id: 'LIST' },
            ]
            : [{ type: 'Playlists', id: 'LIST' }],
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          return response?.data as PaginatedResponseType<PlaylistDetailType>;
        },
      }),

      // Get List of My Playlists
      getMyPlaylistList: builder.query<PaginatedResponseType<PlaylistDetailType>, void>({
        query: () => `${apiPaths.myPlaylistsUrl}`,
        providesTags: (result) =>
          result
            ? [
              ...result.data.map(({ id }) => ({ type: 'Playlists', id } as const)),
              { type: 'Playlists', id: 'LIST' },
            ]
            : [{ type: 'Playlists', id: 'LIST' }],
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          return response?.data as PaginatedResponseType<PlaylistDetailType>;
        },
      }),

      // Get List of Playlist Audio
      getPlaylistAudioList: builder.query<PaginatedResponseType<GenrePlaylistItemType>, number>({
        query: (id) => `${apiPaths.playlistAudioUrl}/${id}`,
        providesTags: (result) =>
          result
            ? [
              ...result.data.map(({ id }) => ({ type: 'PlaylistAudios', id } as const)),
              { type: 'PlaylistAudios', id: 'LIST' },
            ]
            : [{ type: 'PlaylistAudios', id: 'LIST' }],
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          return response?.data as PaginatedResponseType<GenrePlaylistItemType>;
        },
      }),

      // Get Playlist List Min
      getPlaylistListMin: builder.query<PlaylistDetailType[], void>({
        query: () => `${apiPaths.playlistMinUrl}`,
        providesTags: (result) =>
          result
            ? [
              ...result.map(({ id }) => ({ type: 'Playlists', id } as const)),
              { type: 'Playlists', id: 'LIST' },
            ]
            : [{ type: 'Playlists', id: 'LIST' }],
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          console.log(response.data);
          return response?.data as PlaylistDetailType[];
        },
      }),

      // Add Post on Playlist
      addPostOnPlaylist: builder.mutation<any, AddPlaylistFormType>({
        query: ({ ...payload }) => {
          return {
            url: `${apiPaths.addAudioToPlaylistUrl}`,
            method: 'POST',
            body: payload,
          };
        },
        invalidatesTags: ['Playlists', 'PlaylistAudios'],
        async onQueryStarted(payload, { queryFulfilled }) {
          try {
            await queryFulfilled;
            toast.success('Added to playlist.');
          } catch (err) {
            console.log(err);
            toast.error('Failed adding audio to playlist.');
          }
        },
        transformResponse: (response) => {
          console.log(response);
          return response as any;
        },
      }),

      // Add Playlist
      addPlaylist: builder.mutation<any, PlaylistDetailType>({
        query: ({ ...payload }) => {
          return {
            url: `${apiPaths.addPlaylistUrl}`,
            method: 'POST',
            body: payload,
          };
        },
        invalidatesTags: ['Playlists'],
        async onQueryStarted(payload, { queryFulfilled }) {
          try {
            await queryFulfilled;
            toast.success('Playlist added.');
          } catch (err) {
            console.log(err);
            toast.error('Failed adding playlist.');
          }
        },
        transformResponse: (response) => {
          console.log(response);
          return response as any;
        },
      }),

      // Remove Audio from Playlist
      removeAudioFromPlaylist: builder.mutation<any, RemovePlaylistFormType>({
        query: ({ ...payload }) => {
          return {
            url: `${apiPaths.removeAudioToPlaylistUrl}`,
            method: 'POST',
            body: payload,
          };
        },
        invalidatesTags: ['Playlists'],
        async onQueryStarted(payload, { queryFulfilled }) {
          try {
            await queryFulfilled;
            toast.success('Removed from playlist.');
          } catch (err) {
            console.log(err);
            toast.error('Failed removing audio from playlist.');
          }
        },
        transformResponse: (response) => {
          console.log(response);
          return response as any;
        },
      }),

    }),

    overrideExisting: true,
  });

export default playlistApi;
