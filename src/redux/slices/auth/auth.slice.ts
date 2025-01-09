import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers,
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
