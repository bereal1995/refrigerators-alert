import {createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    addList: [],
    itemList: [],
  },
  reducers: {
    listenProduct: (state, action) => {
      state.addList = action.payload?.addList ? action.payload.addList : [];
      state.itemList = action.payload?.itemList ? action.payload.itemList : [];
    },
  }
});

export const stateProduct = state => state.product;
export const actionsProduct = productSlice.actions;

export default productSlice.reducer;