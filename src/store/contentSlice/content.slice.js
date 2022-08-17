import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    userInfo: {
      name: '',
      jobPosition: '',
      city: '',
      avatar: '',
    },
    userInfoLoading: false,
    userInfoError: null,

    userMemes: [],
    userMemesLoading: false,
    userMemesError: null,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    userInfoLoading(state, action) {
      state.userInfoLoading = action.payload;
    },
    userInfoError(state, action) {
      state.userInfoError = action.payload;
    },

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

export const {
  setUserInfo,
  userInfoLoading,
  userInfoError,
  setUserMemes,
  userMemesLoading,
  userMemesError,
} = contentSlice.actions;
export default contentSlice.reducer;
