import { createAsyncThunk } from '@reduxjs/toolkit';

export const validateSSO = createAsyncThunk(
  'sso/validate',
  async ({ token }, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/sso/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.user;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);
