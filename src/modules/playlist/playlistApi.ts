import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { toast } from 'react-toastify';
import { AudioDetailType } from '../audio/audioType';
import { AddPlaylistFormType, PlaylistDetailType, RemovePlaylistFormType } from './playlistTypes';

const playlistApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Playlists', 'PlaylistAudios'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // Get List of My Playlists
      getMyPlaylistList: builder.query<PlaylistDetailType[], void>({
        query: () => `${apiPaths.myPlaylistsUrl}`,
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
          return response?.data?.playlist as PlaylistDetailType[];
        },
      }),

      // Get List of Playlist Audio
      getPlaylistAudioList: builder.query<AudioDetailType[], number>({
        query: (id) => `${apiPaths.playlistAudioUrl}/${id}`,
        providesTags: (result) =>
          result
            ? [
              ...result.map(({ id }) => ({ type: 'Playlists', id } as const)),
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
          return response?.data?.audio as AudioDetailType[];
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

      // Add Audio on Playlist
      addAudioOnPlaylist: builder.mutation<any, AddPlaylistFormType>({
        query: ({ ...payload }) => {
          return {
            url: `${apiPaths.addAudioToPlaylistUrl}`,
            method: 'POST',
            body: payload,
          };
        },
        invalidatesTags: ['Playlists'],
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
