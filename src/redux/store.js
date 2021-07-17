import {configureStore} from '@reduxjs/toolkit';
import appReducer from "./app/appSlice.js";
import productListReducer from "./product/productSlice";
import ReduxThunk from 'redux-thunk';

export default configureStore({
  reducer: {
    app: appReducer,
    product: productListReducer,
  },
  middleware: [
    ReduxThunk,
  ]
});