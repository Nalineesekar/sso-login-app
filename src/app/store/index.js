import { configureStore } from '@reduxjs/toolkit';
import ssoReducer from './features/sso/ssoSlice';

export const store = configureStore({
  reducer: {
    sso: ssoReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});
