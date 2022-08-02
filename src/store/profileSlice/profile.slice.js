import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileInfo: {
      name: '',
      jobPosition: '',
      city: '',
      avatar: '',
    },
    profileInfoLoading: false,
    profileInfoError: null,

    profileAvatarLoading: false,
    profileAvatarError: null,
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
    setProfileAvatar(state, action) {
      state.profileInfo.avatar = action.payload;
    },
    profileAvatarLoading(state, action) {
      state.profileAvatarLoading = action.payload;
    },
    profileAvatarError(state, action) {
      state.profileAvatarError = action.payload;
    },
  },
});

export const {
  setProfileInfo,
  profileInfoLoading,
  profileInfoError,
  setProfileAvatar,
  profileAvatarLoading,
  profileAvatarError,
} = profileSlice.actions;
export default profileSlice.reducer;
