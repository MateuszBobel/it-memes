import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileInfo: {
      name: '',
      jobPosition: '',
      city: '',
    },
    profileInfoLoading: false,
    profileInfoError: null,
  },
  reducers: {
    setProfileInfo(state, action) {
      state.profileInfo = action.payload;
    },
    profileInfoLoading(state, action) {
      state.profileInfoLoading = action.payload;
    },
    profileInfoError(state, action) {
      state.profileInfoError = action.payload;
    },
  },
});

export const { setProfileInfo, profileInfoLoading, profileInfoError } =
  profileSlice.actions;
export default profileSlice.reducer;
