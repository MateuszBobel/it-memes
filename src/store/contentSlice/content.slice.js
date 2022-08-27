import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    viewedUser: {
      name: '',
      jobPosition: '',
      city: '',
      avatar: '',
    },
    viewedUserLoading: false,
    viewedUserError: null,

    dashboardMemes: [],
    dashboardMemeLastKey: null,
    dashboardMemesLoading: false,
    dashboardMemesError: null,

    viewedUserMemes: [],
    viewedUserMemeLastKey: null,
    viewedUserMemesLoading: false,
    viewedUserMemesError: null,

    viewedMeme: null,
    viewedMemeLoading: false,
    viewedMemeError: null,

    uploadMemeLoading: false,
    uploadMemeError: false,
  },

  reducers: {
    setViewedUser(state, action) {
      state.viewedUser = action.payload;
      state.viewedUserError = null;
      state.viewedUserMemes = [];
      state.viewedUserMemeLastKey = null;
      state.viewedUserMemesError = null;
    },
    viewedUserLoading(state, action) {
      state.viewedUserLoading = action.payload;
    },
    viewedUserError(state, action) {
      state.viewedUserError = action.payload;
    },
    setViewedUserMemes(state, action) {
      state.viewedUserMemes = action.payload.memes;
      state.viewedUserMemeLastKey = action.payload.lastKey;
      state.viewedUserMemesError = null;
    },
    viewedUserMemesLoading(state, action) {
      state.viewedUserMemesLoading = action.payload;
    },
    viewedUserMemesError(state, action) {
      state.viewedUserMemesError = action.payload;
    },
    setDashboardMemes(state, action) {
      state.dashboardMemes = action.payload.memes;
      state.dashboardMemeLastKey = action.payload.lastKey;
      state.dashboardMemesError = null;
    },
    dashboardMemesLoading(state, action) {
      state.dashboardMemesLoading = action.payload;
    },
    dashboardMemesError(state, action) {
      state.dashboardMemesError = action.payload;
    },
    setViewedMeme(state, action) {
      state.viewedMeme = action.payload;
      state.viewedMemeError = null;
    },
    setViewedMemeLoading(state, action) {
      state.viewedMemeLoading = action.payload;
    },
    setViewedMemeError(state, action) {
      state.viewedMemeError = action.payload;
    },
    uploadMemeLoading(state, action) {
      state.uploadMemeLoading = action.payload;
    },
    uploadMemeError(state, action) {
      state.uploadMemeError = action.payload;
    },
  },
});

export const {
  setViewedUser,
  viewedUserLoading,
  viewedUserError,
  setViewedUserMemes,
  viewedUserMemesLoading,
  viewedUserMemesError,
  setDashboardMemes,
  dashboardMemesLoading,
  dashboardMemesError,
  setViewedMeme,
  setViewedMemeLoading,
  setViewedMemeError,
  uploadMemeLoading,
  uploadMemeError,
} = contentSlice.actions;
export default contentSlice.reducer;
