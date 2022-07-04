import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoaded: false,
    user: null,
    isLogin: false,
    fetchUserError: null,
    fetchUserLoading: false,

    loginUserLoading: false,
    loginUserError: null,

    registerUserLoading: false,
    registerUserError: null,

    resetPasswordLoading: false,
    resetPasswordError: null,

    logoutUserLoading: false,
    logoutUserError: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoaded = true;
      state.isLogin = !!action.payload;
    },
    fetchUserLoading(state, action) {
      state.fetchUserLoading = action.payload;
    },
    fetchUserError(state, action) {
      state.fetchUserError = action.payload;
    },
    loginUserLoading(state, action) {
      state.loginUserLoading = action.payload;
    },
    loginUserError(state, action) {
      state.loginUserError = action.payload;
    },
    registerUserLoading(state, action) {
      state.registerUserLoading = action.payload;
    },
    registerUserError(state, action) {
      state.registerUserError = action.payload;
    },
    resetPasswordLoading(state, action) {
      state.resetPasswordLoading = action.payload;
    },
    resetPasswordError(state, action) {
      state.resetPasswordError = action.payload;
    },
    logoutUserLoading(state, action) {
      state.resetPasswordLoading = action.payload;
    },
    logoutUserError(state, action) {
      state.resetPasswordError = action.payload;
    },
  },
});

export const {
  setUser,
  fetchUserLoading,
  fetchUserError,
  loginUserLoading,
  loginUserError,
  registerUserLoading,
  registerUserError,
  resetPasswordLoading,
  resetPasswordError,
  logoutUserLoading,
  logoutUserError,
} = authSlice.actions;
export default authSlice.reducer;
