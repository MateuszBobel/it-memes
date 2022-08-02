import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice/auth.slice';
import profileSlice from './profileSlice/profile.slice';

export default configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
