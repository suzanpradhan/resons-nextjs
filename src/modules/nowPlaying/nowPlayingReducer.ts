import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  NowPlayingAudioItem,
  NowPlayingAudioType,
} from './nowPlayingAudioType';

export interface NowPlayingState {
  isPlaying: boolean;
  audioData?: NowPlayingAudioType;
  currentTime: number;
  currentPlaylistIndex: number;
  playlistId?: string;
  playlist: NowPlayingAudioItem[];
  flag: boolean;
  totalDuration?: number;
  prevDuration?: number;
  manualCurrentTimeUpdateFlag: boolean;
  audioPlayBackRate: number;
}

const initialState: NowPlayingState = {
  isPlaying: false,
  currentTime: 0,
  currentPlaylistIndex: 0,
  playlistId: undefined,
  playlist: [],
  flag: false,
  totalDuration: undefined,
  prevDuration: undefined,
  manualCurrentTimeUpdateFlag: false,
  audioPlayBackRate: 1,
};

export const nowPlayingSlice = createSlice({
  name: 'nowPlaying',
  initialState,
  reducers: {
    updateCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    manualUpdateCurrentTime: (
      state,
      action: PayloadAction<{ currentTime: number; url: string }>
    ) => {
      if (
        action.payload.url == state.playlist[state.currentPlaylistIndex]?.url
      ) {
        state.currentTime = action.payload.currentTime;
        state.manualCurrentTimeUpdateFlag = true;
      }
    },
    updateAudioData: (state, action: PayloadAction<NowPlayingAudioType>) => {
      state.audioData = action.payload;
    },
    updateIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    playSong: (state, action: PayloadAction<NowPlayingAudioItem>) => {
      state.currentTime = 0;
      state.playlistId = undefined;
      state.playlist = [action.payload];
      state.currentPlaylistIndex = 0;
      state.flag = true;
      state.isPlaying = true;
      state.totalDuration = undefined;
      state.prevDuration = undefined;
    },
    playNext: (
      state,
      action: PayloadAction<{
        playlistIndex: number;
        prevDuration?: number;
      }>
    ) => {
      state.prevDuration =
        (state.prevDuration ?? 0) +
        state.playlist[state.currentPlaylistIndex].duration;
      state.currentTime = 0;
      state.currentPlaylistIndex = action.payload.playlistIndex;
      state.flag = true;
      state.isPlaying = true;
    },
    addToPlaylist: (state, action: PayloadAction<NowPlayingAudioItem>) => {
      state.playlist = [action.payload];
    },
    addNewPlaylist: (
      state,
      action: PayloadAction<{
        id?: string;
        playlist: NowPlayingAudioItem[];
        totalDuration?: number;
      }>
    ) => {
      state.currentTime = 0;
      state.playlist = action.payload.playlist;
      state.playlistId = action.payload.id;
      state.currentPlaylistIndex = 0;
      state.flag = true;
      state.isPlaying = true;
      state.totalDuration = action.payload.totalDuration;
    },
    clearPlaylist: (state) => {
      state.currentTime = 0;
      state.playlistId = undefined;
      state.playlist = [];
      state.currentPlaylistIndex = 0;
      state.flag = true;
      state.isPlaying = true;
    },
    updateFlag: (state, action: PayloadAction<boolean>) => {
      state.flag = action.payload;
    },
    updateCurrentTimeFlag: (state, action: PayloadAction<boolean>) => {
      state.manualCurrentTimeUpdateFlag = action.payload;
    },
    updatePlaybackRate: (state, action: PayloadAction<number>) => {
      state.audioPlayBackRate = action.payload;
    },
  },
});

export const {
  updateCurrentTime,
  updatePlaybackRate,
  manualUpdateCurrentTime,
  updateCurrentTimeFlag,
  updateAudioData,
  updateIsPlaying,
  playSong,
  playNext,
  addNewPlaylist,
  updateFlag,
  clearPlaylist,
} = nowPlayingSlice.actions;

export default nowPlayingSlice.reducer;
