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
        state.rolId = action.payload.rolId;
        state.loading = false;

        localStorage.setItem('token', action.payload.access_token);
        localStorage.setItem('rolId', action.payload.rolId);
      }
    )
    .addCase(
      thunks.login.rejected,
      (state: AuthState, action: PayloadAction<string>) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(thunks.logout.pending, (state: AuthState) => {
        state.loading = true;
      })
      .addCase(thunks.logout.fulfilled, (state: AuthState) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('rolId');
      })
      .addCase(thunks.logout.rejected, (state: AuthState, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      });
};

export default extraReducers;
