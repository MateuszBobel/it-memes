import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice/auth.slice';

export default configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
