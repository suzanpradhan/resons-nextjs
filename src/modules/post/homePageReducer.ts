import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface HomePageState {
  currentPage: number;
  homePagePostId?: number;
}

const initialState: HomePageState = {
  currentPage: 1,
};

export const homePageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    updateHomePage: (
      state,
      action: PayloadAction<{ page: number; id?: number }>
    ) => {
      state.currentPage = action.payload.page;
      if (action.payload.id) {
        state.homePagePostId = action.payload.id;
      }
    },
  },
});

export const { updateHomePage } = homePageSlice.actions;

export default homePageSlice.reducer;
