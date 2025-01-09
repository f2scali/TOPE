import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
const rutasSlice = createSlice({
  name: 'rutas',
  initialState,
  reducers: {
    clearRoutes(state) {
      state.rutas = [];
    },
  },
  extraReducers,
});

export const { clearRoutes } = rutasSlice.actions;

export default rutasSlice.reducer;
