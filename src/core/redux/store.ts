import { baseApi } from '@/core/api/apiQuery';
import nowPlayingReducer from '@/modules/nowPlaying/nowPlayingReducer';
import playerTimerReducer from '@/modules/nowPlaying/playerTimerReducer';
import homePageReducer from '@/modules/post/homePageReducer';
import postListingReducer from '@/modules/post/postListingReducer';
import { configureStore } from '@reduxjs/toolkit';
import { rtkQueryErrorLogger } from '../api/apiMiddleware';

export const store = configureStore({
  reducer: {
    postListing: postListingReducer,
    baseApi: baseApi.reducer,
    nowPlaying: nowPlayingReducer,
    playerTimer: playerTimerReducer,
    homepage: homePageReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(rtkQueryErrorLogger);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
