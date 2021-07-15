import {createSlice} from '@reduxjs/toolkit';

export const itemListSlice = createSlice({
  name: 'itemList',
  initialState: {
    list: [],
  },
  reducers: {
    listenItemList: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const stateItemList = state => state.itemList;
export const actionsItemList = itemListSlice.actions;

export default itemListSlice.reducer;