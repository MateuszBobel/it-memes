import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    userMemes: [],
    userMemesLoading: false,
    userMemesError: null,
  },
  reducers: {
    setUserMemes(state, action) {
      state.userMemes = action.payload;
    },
    userMemesLoading(state, action) {
      state.userMemesLoading = action.payload;
    },
    userMemesError(state, action) {
      state.userMemesError = action.payload;
    },
  },
});

export const { setUserMemes, userMemesLoading, userMemesError } =
  contentSlice.actions;
export default contentSlice.reducer;
