import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PostListingState {
  currentPage: number;
  isLoading: boolean;
}

const initialState: PostListingState = {
  currentPage: 1,
  isLoading: true,
};

export const postListingSlice = createSlice({
  name: 'postListing',
  initialState,
  reducers: {
    updatedCurrentPage: (state, action: PayloadAction<number>) => {
      console.log(state.currentPage);

      state.currentPage = action.payload;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updatedCurrentPage, updateLoading } = postListingSlice.actions;

export default postListingSlice.reducer;
