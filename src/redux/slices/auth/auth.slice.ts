import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers,
});

export const {} = authSlice.actions;

export default authSlice.reducer;
