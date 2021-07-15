import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
  },
  reducers: {
    appLogin: (state, action) => {
      state.user = action.payload;
    },
    appLogout: (state, action) => {
      state.user = null;
    },
  }
});

export const stateApp = state => state.app;
export const actionsApp = appSlice.actions;

export default appSlice.reducer;