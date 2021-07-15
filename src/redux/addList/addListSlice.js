import {createSlice} from '@reduxjs/toolkit';

export const addListSlice = createSlice({
  name: 'addList',
  initialState: {
    list: [],
  },
  reducers: {
    listenAddList: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const stateAddList = state => state.addList;
export const actionsAddList = addListSlice.actions;

export default addListSlice.reducer;