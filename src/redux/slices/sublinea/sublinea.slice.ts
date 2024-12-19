import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import subLineasReducers from './reducers';
const subLineaSlice = createSlice({
  name: 'sublinea',
  initialState,
  reducers: subLineasReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = subLineaSlice.actions;

export default subLineaSlice.reducer;
