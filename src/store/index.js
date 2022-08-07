import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice/auth.slice';
import profileSlice from './profileSlice/profile.slice';
import contentSlice from './contentSlice/content.slice';

export default configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    content: contentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
