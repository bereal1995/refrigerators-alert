import { configureStore } from '@reduxjs/toolkit';
import appReducer from "./app/appSlice.js";
import addListReducer from "./addList/addListSlice";
import itemListReducer from "./itemList/itemListSlice";
import ReduxThunk from 'redux-thunk';

export default configureStore({
  reducer: {
    app: appReducer,
    addList: addListReducer,
    itemList: itemListReducer
  },
  middleware: [
    ReduxThunk,
  ]
});