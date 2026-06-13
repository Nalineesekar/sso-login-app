import { createSlice } from '@reduxjs/toolkit';
import { validateSSO } from './ssoThunk';

const initialState = {
  loading: false,
  user: null,
  error: null
};

const ssoSlice = createSlice({
  name: 'sso',
  initialState,
  reducers: {
    clearSSO: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateSSO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateSSO.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(validateSSO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSSO } = ssoSlice.actions;
export default ssoSlice.reducer;
