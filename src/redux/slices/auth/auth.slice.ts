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
      state.rolId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('rolId');
    },
  },
  extraReducers,
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
