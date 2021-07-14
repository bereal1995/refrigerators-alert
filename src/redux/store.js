import { configureStore } from '@reduxjs/toolkit';
import appReducer from "./app/appSlice.js";
import ReduxThunk from 'redux-thunk';

export default configureStore({
  reducer: {
    app: appReducer
  },
  middleware: [
    ReduxThunk,
  ]
});