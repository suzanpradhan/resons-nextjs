import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PlayerTimerState {
  currentTime: number;
}

const initialState: PlayerTimerState = {
  currentTime: 0,
};

export const playerTimerSlice = createSlice({
  name: 'playerTime',
  initialState,
  reducers: {
    updateCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});

export const { updateCurrentTime } = playerTimerSlice.actions;

export default playerTimerSlice.reducer;
