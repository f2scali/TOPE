import { PayloadAction } from '@reduxjs/toolkit';

import { thunks } from './thunks';
import { AuthState } from '@/types/auth';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.login.pending, (state: AuthState) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      thunks.login.fulfilled,
      (state: AuthState, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.loading = false;

        localStorage.setItem('token', action.payload.access_token);
      }
    )
    .addCase(
      thunks.login.rejected,
      (state: AuthState, action: PayloadAction<string>) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      }
    )
    .addCase(thunks.logout.fulfilled, (state: AuthState) => {
      state.isAuthenticated = false;
      state.token = null;
    });
};

export default extraReducers;
