import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
  },
  reducers: {
    appLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const stateApp = state => state.app;
export const actionsApp = appSlice.actions;

export default appSlice.reducer;