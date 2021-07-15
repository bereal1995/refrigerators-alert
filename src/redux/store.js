import { configureStore } from '@reduxjs/toolkit';
import appReducer from "./app/appSlice.js";
import addListReducer from "./addList/addListSlice";
import ReduxThunk from 'redux-thunk';

export default configureStore({
  reducer: {
    app: appReducer,
    addList: addListReducer
  },
  middleware: [
    ReduxThunk,
  ]
});